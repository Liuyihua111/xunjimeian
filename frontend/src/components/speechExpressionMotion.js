export const SPEECH_EXPRESSION_TIMING = Object.freeze({
  mouthMin: 0.18,
  mouthMax: 0.52,
  mouthIntervalMin: 90,
  mouthIntervalMax: 180,
  blinkDelayMin: 2200,
  blinkDelayMax: 5000,
  blinkClose: 75,
  blinkHold: 35,
  blinkOpen: 120,
  doubleBlinkChance: 0.15,
  doubleBlinkDelayMin: 120,
  doubleBlinkDelayMax: 180,
});

function randomBetween(random, min, max) {
  return min + (max - min) * random();
}

export function sampleMouthTarget(random = Math.random) {
  return randomBetween(random, SPEECH_EXPRESSION_TIMING.mouthMin, SPEECH_EXPRESSION_TIMING.mouthMax);
}

export function sampleBlinkDelay(random = Math.random) {
  return randomBetween(random, SPEECH_EXPRESSION_TIMING.blinkDelayMin, SPEECH_EXPRESSION_TIMING.blinkDelayMax);
}

function smoothstep(value) {
  const progress = Math.max(0, Math.min(1, value));
  return progress * progress * (3 - 2 * progress);
}

export function blinkWeightAt(elapsed) {
  const { blinkClose, blinkHold, blinkOpen } = SPEECH_EXPRESSION_TIMING;
  if (elapsed <= 0) return 0;
  if (elapsed < blinkClose) return smoothstep(elapsed / blinkClose);
  if (elapsed < blinkClose + blinkHold) return 1;
  if (elapsed < blinkClose + blinkHold + blinkOpen) {
    return 1 - smoothstep((elapsed - blinkClose - blinkHold) / blinkOpen);
  }
  return 0;
}

export function createSpeechExpressionController({
  setMouth,
  setBlink,
  render = () => {},
  random = Math.random,
  now = () => performance.now(),
  requestFrame = (callback) => requestAnimationFrame(callback),
  cancelFrame = (id) => cancelAnimationFrame(id),
  setDelay = (callback, delay) => setTimeout(callback, delay),
  clearDelay = (id) => clearTimeout(id),
}) {
  let running = false;
  let frameId = 0;
  let blinkTimer = 0;
  let doubleBlinkTimer = 0;
  let blinkStartedAt = null;
  let mouthCurrent = 0;
  let mouthTarget = 0;
  let nextMouthAt = 0;
  let previousFrameAt = 0;

  function scheduleFrame() {
    frameId = requestFrame(update);
  }

  function beginBlink() {
    if (!running) return;
    blinkStartedAt = now();

    if (random() < SPEECH_EXPRESSION_TIMING.doubleBlinkChance) {
      const blinkDuration = SPEECH_EXPRESSION_TIMING.blinkClose
        + SPEECH_EXPRESSION_TIMING.blinkHold
        + SPEECH_EXPRESSION_TIMING.blinkOpen;
      const delay = blinkDuration + randomBetween(
        random,
        SPEECH_EXPRESSION_TIMING.doubleBlinkDelayMin,
        SPEECH_EXPRESSION_TIMING.doubleBlinkDelayMax,
      );
      doubleBlinkTimer = setDelay(() => {
        doubleBlinkTimer = 0;
        if (running) blinkStartedAt = now();
      }, delay);
    }

    scheduleBlink();
  }

  function scheduleBlink() {
    if (!running) return;
    if (blinkTimer) clearDelay(blinkTimer);
    blinkTimer = setDelay(() => {
      blinkTimer = 0;
      beginBlink();
    }, sampleBlinkDelay(random));
  }

  function update(timestamp) {
    frameId = 0;
    if (!running) return;

    const currentTime = Number.isFinite(timestamp) ? timestamp : now();
    const elapsed = previousFrameAt ? Math.min(80, Math.max(0, currentTime - previousFrameAt)) : 16;
    previousFrameAt = currentTime;

    if (currentTime >= nextMouthAt) {
      mouthTarget = sampleMouthTarget(random);
      nextMouthAt = currentTime + randomBetween(
        random,
        SPEECH_EXPRESSION_TIMING.mouthIntervalMin,
        SPEECH_EXPRESSION_TIMING.mouthIntervalMax,
      );
    }

    const easing = 1 - Math.exp(-elapsed / 58);
    mouthCurrent += (mouthTarget - mouthCurrent) * easing;
    setMouth(mouthCurrent);

    if (blinkStartedAt !== null) {
      const blinkElapsed = currentTime - blinkStartedAt;
      setBlink(blinkWeightAt(blinkElapsed));
      const blinkDuration = SPEECH_EXPRESSION_TIMING.blinkClose
        + SPEECH_EXPRESSION_TIMING.blinkHold
        + SPEECH_EXPRESSION_TIMING.blinkOpen;
      if (blinkElapsed >= blinkDuration) {
        blinkStartedAt = null;
        setBlink(0);
      }
    }

    render();
    scheduleFrame();
  }

  function start() {
    if (running) return;
    running = true;
    const startedAt = now();
    mouthCurrent = sampleMouthTarget(random);
    mouthTarget = sampleMouthTarget(random);
    nextMouthAt = startedAt + randomBetween(
      random,
      SPEECH_EXPRESSION_TIMING.mouthIntervalMin,
      SPEECH_EXPRESSION_TIMING.mouthIntervalMax,
    );
    previousFrameAt = startedAt;
    setMouth(mouthCurrent);
    setBlink(0);
    render();
    scheduleBlink();
    scheduleFrame();
  }

  function stop() {
    running = false;
    if (frameId) cancelFrame(frameId);
    if (blinkTimer) clearDelay(blinkTimer);
    if (doubleBlinkTimer) clearDelay(doubleBlinkTimer);
    frameId = blinkTimer = doubleBlinkTimer = 0;
    blinkStartedAt = null;
    mouthCurrent = mouthTarget = 0;
    previousFrameAt = nextMouthAt = 0;
    setMouth(0);
    setBlink(0);
    render();
  }

  return { start, stop, isRunning: () => running };
}
