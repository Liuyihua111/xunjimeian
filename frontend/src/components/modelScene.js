import { AnimationMixer, Box3, Vector3 } from "three";

export function sampleFirstFrame(gltf) {
  // Sample once. Stopping an action here would restore the bind pose.
  if (gltf.animations.length) {
    const mixer = new AnimationMixer(gltf.scene);
    mixer.clipAction(gltf.animations[0]).play();
    mixer.setTime(0);
  }
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((node) => {
    if (node.isSkinnedMesh) {
      node.skeleton.update();
      node.computeBoundingBox();
    }
  });
  return gltf.scene;
}

export function frameModelGroup(group, zUp = true) {
  // UE exports are Z-up. Apply the same adaptation to both parts together.
  group.rotation.x = zUp ? -Math.PI / 2 : 0;
  group.updateMatrixWorld(true);
  const box = new Box3().setFromObject(group, true);
  const size = box.getSize(new Vector3());
  if (!Number.isFinite(size.length()) || size.length() === 0) throw new Error("Empty model");
  const center = box.getCenter(new Vector3());
  const scale = 2 / Math.max(size.x, size.y, size.z);
  group.scale.setScalar(scale);
  group.position.copy(center).multiplyScalar(-scale);
  group.updateMatrixWorld(true);
}

export function disposeModel(root) {
  const geometries = new Set(), materials = new Set(), textures = new Set(), skeletons = new Set();
  root.traverse((node) => {
    if (node.geometry) geometries.add(node.geometry);
    if (node.skeleton) skeletons.add(node.skeleton);
    for (const material of [node.material].flat().filter(Boolean)) {
      materials.add(material);
      Object.values(material).forEach((value) => { if (value?.isTexture) textures.add(value); });
    }
  });
  textures.forEach((item) => item.dispose());
  materials.forEach((item) => item.dispose());
  geometries.forEach((item) => item.dispose());
  skeletons.forEach((item) => item.dispose());
}
