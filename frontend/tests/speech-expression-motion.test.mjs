import test from "node:test";
import assert from "node:assert/strict";
import {
  SPEECH_EXPRESSION_TIMING,
  blinkWeightAt,
  createSpeechExpressionController,
  sampleBlinkDelay,
  sampleMouthTarget,
} from "../src/components/speechExpressionMotion.js";

test("speech expression samples remain inside the natural motion ranges", () => {
  assert.equal(SPEECH_EXPRESSION_TIMING.mouthMin, 0.18);
  assert.equal(SPEECH_EXPRESSION_TIMING.mouthMax, 0.52);
  assert.equal(SPEECH_EXPRESSION_TIMING.blinkDelayMin, 2200);
  assert.equal(SPEECH_EXPRESSION_TIMING.blinkDelayMax, 5000);
  assert.equal(sampleMouthTarget(() => 0), SPEECH_EXPRESSION_TIMING.mouthMin);
  assert.equal(sampleMouthTarget(() => 1), SPEECH_EXPRESSION_TIMING.mouthMax);
  assert.equal(sampleBlinkDelay(() => 0), SPEECH_EXPRESSION_TIMING.blinkDelayMin);
  assert.equal(sampleBlinkDelay(() => 1), SPEECH_EXPRESSION_TIMING.blinkDelayMax);
});

test("blink closes, holds, and smoothly returns to open", () => {
  assert.equal(blinkWeightAt(0), 0);
  assert.ok(blinkWeightAt(40) > 0 && blinkWeightAt(40) < 1);
  assert.equal(blinkWeightAt(75), 1);
  assert.equal(blinkWeightAt(100), 1);
  assert.ok(blinkWeightAt(170) > 0 && blinkWeightAt(170) < 1);
  assert.equal(blinkWeightAt(230), 0);
});

test("stopping speech motion cancels work and restores a neutral face", () => {
  const mouths = [];
  const blinks = [];
  const cancelledFrames = [];
  const clearedDelays = [];
  let frameId = 0;
  let delayId = 100;
  const controller = createSpeechExpressionController({
    setMouth: (value) => mouths.push(value),
    setBlink: (value) => blinks.push(value),
    random: () => 0.5,
    now: () => 1000,
    requestFrame: () => ++frameId,
    cancelFrame: (id) => cancelledFrames.push(id),
    setDelay: () => ++delayId,
    clearDelay: (id) => clearedDelays.push(id),
  });

  controller.start();
  assert.equal(controller.isRunning(), true);
  assert.ok(mouths.at(-1) >= 0.12 && mouths.at(-1) <= 0.38);

  controller.stop();
  assert.equal(controller.isRunning(), false);
  assert.equal(mouths.at(-1), 0);
  assert.equal(blinks.at(-1), 0);
  assert.deepEqual(cancelledFrames, [1]);
  assert.deepEqual(clearedDelays, [101]);
});
