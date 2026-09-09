// Names verified in the delivered GLB; never bind expressions by numeric index.
export function collectExpressionTargets(root) {
  const targets = { blink: [], mouth: [] };
  root.traverse((mesh) => {
    if (!mesh.isMesh || !mesh.morphTargetDictionary || !mesh.morphTargetInfluences) return;
    console.info("Xie Yuanding morphs", mesh.name, Object.keys(mesh.morphTargetDictionary));
    for (const [control, name] of [["blink", "eye"], ["mouth", "mouth"]]) {
      const index = mesh.morphTargetDictionary[name];
      if (Number.isInteger(index) && index >= 0 && index < mesh.morphTargetInfluences.length) {
        targets[control].push({ mesh, index });
      }
    }
  });
  return targets;
}

export function setExpression(targets, value) {
  const number = Number(value);
  const weight = Number.isFinite(number) ? Math.max(0, Math.min(1, number)) : 0;
  targets.forEach(({ mesh, index }) => { mesh.morphTargetInfluences[index] = weight; });
}
