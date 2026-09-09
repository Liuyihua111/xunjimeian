import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { collectExpressionTargets, setExpression } from '../src/components/modelMorphs.js';

test('expressions resolve actual dictionary names on every mesh and clamp weights', () => {
  const meshes = [
    { isMesh: true, name: 'face', morphTargetDictionary: { mouth: 1, eye: 0 }, morphTargetInfluences: [0, 0] },
    { isMesh: true, name: 'eyelids', morphTargetDictionary: { eye: 2 }, morphTargetInfluences: [0, 0, 0] },
    { isMesh: true, morphTargetDictionary: { other: 0 }, morphTargetInfluences: [0] },
  ];
  const targets = collectExpressionTargets({ traverse: fn => meshes.forEach(fn) });
  assert.equal(targets.blink.length, 2);
  assert.equal(targets.mouth.length, 1);
  setExpression(targets.blink, 1.5);
  setExpression(targets.mouth, 0.6);
  assert.deepEqual(meshes[0].morphTargetInfluences, [1, 0.6]);
  assert.deepEqual(meshes[1].morphTargetInfluences, [0, 0, 1]);
  setExpression(targets.blink, -1);
  assert.equal(meshes[0].morphTargetInfluences[0], 0);
  assert.deepEqual(collectExpressionTargets({ traverse: fn => fn({ isMesh: true }) }), { blink: [], mouth: [] });
});

test('delivered model embeds textures and named eye/mouth morphs', () => {
  const b = readFileSync(new URL('../public/assets/models/xieyuanding/xieyuanding_full.glb', import.meta.url));
  assert.equal(b.toString('ascii', 0, 4), 'glTF');
  const gltf = JSON.parse(b.subarray(20, 20 + b.readUInt32LE(12)));
  assert.ok(gltf.meshes.some(m => m.extras?.targetNames?.includes('eye')));
  assert.ok(gltf.meshes.some(m => m.extras?.targetNames?.includes('mouth')));
  assert.ok(gltf.images.every(i => Number.isInteger(i.bufferView)));
  const component = readFileSync(new URL('../src/components/FullModelViewer.vue', import.meta.url), 'utf8');
  assert.doesNotMatch(component, /body\.glb|clothing\.glb|autoRotate|mixer\.update/);
  assert.match(component, /frameModelGroup\(group, false\)/);
});
