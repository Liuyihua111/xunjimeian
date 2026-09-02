const observedElements = new Map();
let observer;

function reveal(element) {
  element.classList.remove("is-reveal-pending");
  element.classList.add("is-reveal-visible");
}

function reducedMotionEnabled() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function getObserver() {
  if (observer || !("IntersectionObserver" in window)) return observer;

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
      observedElements.delete(entry.target);
    });

    if (!observedElements.size) {
      observer.disconnect();
      observer = undefined;
    }
  }, {
    rootMargin: "0px 0px -6% 0px",
    threshold: 0.12
  });

  return observer;
}

export const revealDirective = {
  mounted(element, binding) {
    const delay = Number(binding.value);
    if (Number.isFinite(delay) && delay > 0) {
      element.style.setProperty("--reveal-delay", `${Math.min(delay, 480)}ms`);
    }

    if (reducedMotionEnabled() || !("IntersectionObserver" in window)) {
      reveal(element);
      return;
    }

    element.classList.add("motion-reveal", "is-reveal-pending");
    if (element.matches(".archive-overview-card, .intro-block, .avatar-panel, .chat-panel, .home-gallery-frame, .annual-result-entry, .annual-article-figure, .annual-article-image-group")) {
      element.classList.add("motion-reveal-card");
    }
    observedElements.set(element, true);
    getObserver()?.observe(element);
  },
  beforeUnmount(element) {
    observer?.unobserve(element);
    observedElements.delete(element);
  }
};
