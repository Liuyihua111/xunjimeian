import { Source } from "three";

const skinMaterials = new Set([
  "MID_MI_Face_Skin_Baked_LOD0_VT_0_0",
  "MI_Body_Baked_VT_StaticMesh5"
]);

export function isSkinMaterial(name) {
  return skinMaterials.has(name);
}

export function brightenSkinPixels(pixels, amount = 0.15) {
  const strength = Math.max(0, Math.min(1, amount));
  for (let index = 0; index < pixels.length; index += 4) {
    for (let channel = 0; channel < 3; channel++) {
      const value = pixels[index + channel];
      pixels[index + channel] = Math.round(value + (255 - value) * strength);
    }
  }
  return pixels;
}

export function applySkinTextureDisplay(root) {
  const derived = new Map();
  const visited = new Set();
  root.traverse((node) => {
    for (const material of [node.material].flat().filter(Boolean)) {
      if (visited.has(material)) continue;
      visited.add(material);
      if (!isSkinMaterial(material.name) || !material.map) continue;
      const original = material.map;
      if (derived.has(original)) {
        material.map = derived.get(original);
        continue;
      }
      // Clone the map rather than the material: UVs, color space and shading stay intact.
      try {
        const image = original.image;
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0);
        const data = context.getImageData(0, 0, canvas.width, canvas.height);
        brightenSkinPixels(data.data);
        context.putImageData(data, 0, 0);
        const texture = original.clone();
        texture.source = new Source(canvas);
        texture.needsUpdate = true;
        derived.set(original, texture);
        material.map = texture;
        material.needsUpdate = true;
      } catch (error) {
        console.warn("Skin display texture unavailable; using original", error);
      }
    }
  });
  return () => derived.forEach((texture, original) => original.dispose());
}
