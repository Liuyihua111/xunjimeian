<template>
  <div v-if="enabled" :class="['site-cursor', { 'is-active': active, 'is-pressed': pressed }]" aria-hidden="true">
    <span ref="trail" class="site-cursor-trail"></span>
    <span ref="leader" class="site-cursor-leader"></span>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const enabled = ref(false);
const active = ref(false);
const pressed = ref(false);
const leader = ref(null);
const trail = ref(null);

const interactiveSelector = "a[href], button:not(:disabled), summary, [role='button'], [data-cursor-interactive]";
const neutralSelector = "input, textarea, select, option, [contenteditable='true'], iframe, video, model-viewer, .home-gallery-embed, .annual-result-media-frame, .meian-video-frame";
let targetX = 0;
let targetY = 0;
let trailX = 0;
let trailY = 0;
let hasPointerPosition = false;
let animationFrame;
let motionQuery;
let pointerQuery;

function setPosition(element, x, y) {
  element?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
}

function animateTrail() {
  trailX += (targetX - trailX) * 0.16;
  trailY += (targetY - trailY) * 0.16;
  setPosition(trail.value, trailX, trailY);

  if (Math.abs(targetX - trailX) > 0.15 || Math.abs(targetY - trailY) > 0.15) {
    animationFrame = window.requestAnimationFrame(animateTrail);
  } else {
    animationFrame = undefined;
  }
}

function queueTrail() {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(animateTrail);
}

function isNeutralTarget(target) {
  return target instanceof Element && Boolean(target.closest(neutralSelector));
}

function isInteractiveTarget(target) {
  return target instanceof Element && Boolean(target.closest(interactiveSelector));
}

function updateState(target) {
  active.value = !isNeutralTarget(target) && isInteractiveTarget(target);
}

function onPointerMove(event) {
  if (!enabled.value || (event.pointerType && event.pointerType !== "mouse")) return;

  targetX = event.clientX;
  targetY = event.clientY;
  if (!hasPointerPosition) {
    trailX = targetX;
    trailY = targetY;
    setPosition(trail.value, trailX, trailY);
    hasPointerPosition = true;
  }
  setPosition(leader.value, targetX, targetY);
  updateState(event.target);
  queueTrail();
}

function onPointerDown(event) {
  if (!enabled.value) return;
  updateState(event.target);
  pressed.value = active.value;
}

function clearPressed() {
  pressed.value = false;
}

function clearState() {
  active.value = false;
  pressed.value = false;
}

function onVisibilityChange() {
  if (document.hidden) clearState();
}

function canUseCursor() {
  return pointerQuery?.matches && !motionQuery?.matches;
}

function syncEnabledState() {
  enabled.value = canUseCursor();
  if (!enabled.value) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
    clearState();
  }
}

onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  syncEnabledState();

  pointerQuery.addEventListener("change", syncEnabledState);
  motionQuery.addEventListener("change", syncEnabledState);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointerup", clearPressed, { passive: true });
  window.addEventListener("pointercancel", clearPressed, { passive: true });
  window.addEventListener("blur", clearState);
  document.addEventListener("visibilitychange", onVisibilityChange);
});

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame);
  pointerQuery?.removeEventListener("change", syncEnabledState);
  motionQuery?.removeEventListener("change", syncEnabledState);
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerdown", onPointerDown);
  window.removeEventListener("pointerup", clearPressed);
  window.removeEventListener("pointercancel", clearPressed);
  window.removeEventListener("blur", clearState);
  document.removeEventListener("visibilitychange", onVisibilityChange);
});
</script>
