export function createSpeechPortraitPlayback(video, onBlocked = () => {}) {
  let active = false;
  let disposed = false;
  let revision = 0;

  function reset() {
    video.pause();
    if (video.readyState >= 1) video.currentTime = 0;
  }

  async function setActive(value) {
    active = Boolean(value) && !disposed;
    const attempt = ++revision;
    if (!active) return reset();
    video.muted = true;
    try {
      await video.play();
      if (disposed || !active) reset();
    } catch (error) {
      if (attempt === revision && active && !disposed) {
        reset();
        onBlocked(error);
      }
    }
  }

  return {
    setActive,
    ready: () => active ? setActive(true) : reset(),
    dispose() {
      disposed = true;
      active = false;
      revision++;
      reset();
    }
  };
}
