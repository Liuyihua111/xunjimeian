export function createSpeechPortraitPlayback(video, options = {}) {
  const {
    muted = true,
    onBlocked = () => {},
    onEnded = () => {}
  } = options;
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
    video.muted = muted;
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
    ended() {
      if (disposed || !active) return;
      active = false;
      revision++;
      reset();
      onEnded();
    },
    dispose() {
      disposed = true;
      active = false;
      revision++;
      reset();
    }
  };
}
