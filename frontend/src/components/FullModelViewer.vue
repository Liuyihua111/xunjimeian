<template>
  <div class="split-model model-placeholder model-viewer-shell" :aria-busy="state === 'loading'">
    <div ref="stage" class="split-model-stage" :data-model-state="state">
      <div v-if="state === 'loading'" class="split-model-status" role="status">
        <span class="split-model-skeleton" aria-hidden="true"></span>
        <span>{{ copy.loading }}</span>
      </div>
      <div v-if="state === 'error'" class="split-model-status" role="alert">
        <span>{{ copy.error }}</span>
        <button type="button" @click="initialize">{{ copy.retry }}</button>
      </div>
    </div>
    <div class="split-model-toolbar" :aria-label="copy.controls">
      <label>{{ copy.blink }}<input v-model.number="blink" type="range" min="0" max="1" step="0.01" :disabled="state !== 'ready' || !available.blink" :aria-label="copy.blink"></label>
      <label>{{ copy.mouth }}<input v-model.number="mouth" type="range" min="0" max="1" step="0.01" :disabled="state !== 'ready' || !available.mouth" :aria-label="copy.mouth"></label>
      <button type="button" :disabled="state !== 'ready'" :aria-label="copy.zoomIn" :title="copy.zoomIn" @click="zoom(0.85)">+</button>
      <button type="button" :disabled="state !== 'ready'" :aria-label="copy.zoomOut" :title="copy.zoomOut" @click="zoom(1.18)">−</button>
      <button type="button" :disabled="state !== 'ready'" :aria-label="copy.reset" :title="copy.reset" @click="resetView">↺</button>
    </div>
    <p v-if="state === 'ready' && (!available.blink || !available.mouth)" class="split-model-note" role="status">{{ copy.unavailable }}</p>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { disposeModel, frameModelGroup, sampleFirstFrame } from "./modelScene.js";
import { collectExpressionTargets, setExpression } from "./modelMorphs.js";
import { useI18n } from "../i18n.js";

const { isEnglish } = useI18n();
const copy = computed(() => isEnglish.value ? {
  loading: "Loading model…", error: "The model could not be displayed. Please retry.", retry: "Retry",
  blink: "Blink", mouth: "Open mouth", controls: "Model controls", zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "Reset view",
  unavailable: "Some expressions are unavailable in this model", canvas: "Xie Yuanding full model",
} : {
  loading: "正在加载模型…", error: "模型暂时无法显示，请重试", retry: "重新加载",
  blink: "眨眼", mouth: "张嘴", controls: "模型显示控制", zoomIn: "放大", zoomOut: "缩小", reset: "重置视角",
  unavailable: "当前模型部分表情暂不可用", canvas: "谢远定完整模型",
});
const stage = ref(null), state = ref("loading");
const blink = ref(0), mouth = ref(0);
const available = ref({ blink: false, mouth: false });
let targets = { blink: [], mouth: [] };
let scene, camera, renderer, controls, group, resizeObserver;
let generation = 0, unmounted = false, drawRequest = 0;

function render() {
  if (drawRequest || !renderer) return;
  drawRequest = requestAnimationFrame(() => {
    drawRequest = 0;
    if (renderer && camera && scene) renderer.render(scene, camera);
  });
}
function resize() {
  if (!renderer || !stage.value) return;
  const { width, height } = stage.value.getBoundingClientRect();
  if (!width || !height) return;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  if (state.value === "ready") resetView();
  else render();
}
function resetView() {
  if (!camera || !controls) return;
  const vertical = THREE.MathUtils.degToRad(camera.fov / 2);
  const horizontal = Math.atan(Math.tan(vertical) * camera.aspect);
  const distance = 1.2 / Math.sin(Math.min(vertical, horizontal));
  camera.position.set(0, 0.12, distance);
  controls.target.set(0, 0, 0);
  controls.update();
  render();
}
function zoom(factor) {
  if (!controls) return;
  const offset = camera.position.clone().sub(controls.target);
  offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance));
  camera.position.copy(controls.target).add(offset);
  controls.update();
  render();
}
function keyControl(event) {
  if (state.value !== "ready") return;
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
    const spherical = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    if (event.key === "ArrowLeft") spherical.theta -= 0.12;
    if (event.key === "ArrowRight") spherical.theta += 0.12;
    if (event.key === "ArrowUp") spherical.phi -= 0.12;
    if (event.key === "ArrowDown") spherical.phi += 0.12;
    spherical.makeSafe();
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
    controls.update(); render();
  } else if (["+", "=", "-", "Home"].includes(event.key)) {
    event.preventDefault();
    if (event.key === "Home") resetView(); else zoom(event.key === "-" ? 1.18 : 0.85);
  }
}
function contextLost(event) {
  event.preventDefault();
  state.value = "error";
}
function cleanup() {
  cancelAnimationFrame(drawRequest); drawRequest = 0;
  resizeObserver?.disconnect();
  controls?.dispose(); controls = null;
  if (scene) disposeModel(scene);
  if (renderer) {
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    renderer.domElement.removeEventListener("keydown", keyControl);
    renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
  }
  renderer = scene = camera = group = null;
  targets = { blink: [], mouth: [] };
  available.value = { blink: false, mouth: false };
}
async function initialize() {
  const attempt = ++generation;
  cleanup(); state.value = "loading";
  let loaded = [];
  try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute("aria-label", copy.value.canvas);
    renderer.domElement.addEventListener("keydown", keyControl);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    stage.value.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x88847b, 2));
    const key = new THREE.DirectionalLight(0xfff6e8, 2.5); key.position.set(3, 4, 5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xe6eff4, 1.5); fill.position.set(-3, 1, -3); scene.add(fill);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.minDistance = 1.7; controls.maxDistance = 12;
    controls.addEventListener("change", render);
    resizeObserver = new ResizeObserver(resize); resizeObserver.observe(stage.value); resize();
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync("/assets/models/xieyuanding/xieyuanding_full.glb");
    loaded = [gltf];
    if (unmounted || attempt !== generation) { loaded.forEach((gltf) => disposeModel(gltf.scene)); return; }
    group = new THREE.Group(); group.add(sampleFirstFrame(gltf));
    frameModelGroup(group, false); scene.add(group);
    targets = collectExpressionTargets(group);
    available.value = { blink: targets.blink.length > 0, mouth: targets.mouth.length > 0 };
    blink.value = mouth.value = 0;
    setExpression(targets.blink, 0); setExpression(targets.mouth, 0);
    state.value = "ready"; resetView();
  } catch (error) {
    loaded.forEach((gltf) => disposeModel(gltf.scene));
    if (!unmounted && attempt === generation) {
      console.error("Model preview failed", error);
      cleanup(); state.value = "error";
    }
  }
}
watch([blink, mouth], () => {
  setExpression(targets.blink, blink.value);
  setExpression(targets.mouth, mouth.value);
  render();
});
onMounted(initialize);
onBeforeUnmount(() => { unmounted = true; generation++; cleanup(); });
</script>

<style scoped>
.split-model.model-placeholder {
  display: flex; flex-direction: column; width: 100%; min-width: 0; padding: 0;
  background: transparent; overflow: hidden;
}
.split-model-stage { position: relative; width: 100%; height: 420px; min-height: 0; flex: 1 1 auto; }
.split-model-stage :deep(canvas) { display: block; width: 100%; height: 100%; touch-action: pan-y; }
.split-model-stage :deep(canvas:focus-visible) { outline: 2px solid #812f2c; outline-offset: -3px; }
.split-model-status { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center; padding: 24px; font-size: 14px; text-align: center; }
.split-model-skeleton { width: 35%; height: 60%; border-radius: 8px; background: #d7ddd980; }
.split-model-empty { position: absolute; inset: 45% 12% auto; text-align: center; font-size: 14px; pointer-events: none; }
.split-model-toolbar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; flex: 0 0 auto; padding: 12px 4px; border-top: 1px solid #455b5728; }
.split-model-toolbar label { display: inline-flex; gap: 6px; align-items: center; font-size: 14px; cursor: pointer; }
.split-model-toolbar input { width: 72px; height: 20px; padding: 0; accent-color: #812f2c; }
.split-model-toolbar button { width: 36px; height: 36px; padding: 0; border: 1px solid #455b5733; border-radius: 4px; background: #f6f4ef; color: #293635; font: 22px Arial, sans-serif; cursor: pointer; }
.split-model-toolbar button:first-of-type { margin-left: auto; }
.split-model-toolbar button:disabled { opacity: .4; cursor: default; }
.split-model-toolbar button:focus-visible { outline: 2px solid #812f2c; outline-offset: 2px; }
.split-model .split-model-note { flex: 0 0 auto; margin: 0 !important; font-size: 12px; color: #606e6c; }
@media (max-width: 720px) {
  .split-model-stage { height: 420px; flex: none; }
  .split-model-toolbar { display: grid; grid-template-columns: repeat(6, 1fr); }
  .split-model-toolbar label { grid-column: span 3; min-width: 0; white-space: nowrap; }
  .split-model-toolbar input { flex: 1 1 0; width: 0; min-width: 0; }
  .split-model-toolbar button:first-of-type { grid-column: 4; margin-left: 0; }
  .split-model-toolbar button { justify-self: end; }
}
</style>
