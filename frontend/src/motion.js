const observedElements = new Map();
let observer;

const CARD_SELECTOR = ".archive-overview-card, .intro-block, .avatar-panel, .chat-panel, .home-gallery-frame, .annual-result-entry";
const MEDIA_SELECTOR = "figure, .annual-article-figure, .annual-article-image-group, .archive-detail-media";

function motionOptions(value) {
  if (value && typeof value === "object") return value;
  return { delay: Number(value) || 0 };
}

function addVariantClass(element, variant) {
  if (variant === "card" || (!variant && element.matches(CARD_SELECTOR))) {
    element.classList.add("motion-reveal-card");
  }

  if (variant === "media" || (!variant && element.matches(MEDIA_SELECTOR))) {
    element.classList.add("motion-reveal-media");
  }
}

function configureGroup(element, options) {
  if (!options.group) return;

  const stagger = Math.min(Math.max(Number(options.stagger) || 80, 0), 90);
  const children = Array.from(element.children);
  element.classList.add("motion-reveal-group");

  children.forEach((child, index) => {
    child.classList.add("motion-reveal-item");
    child.style.setProperty("--reveal-item-delay", `${Math.min(index * stagger, 360)}ms`);

    if (child.matches(MEDIA_SELECTOR) || child.querySelector("img")) {
      child.classList.add("motion-reveal-item-media");
    }
  });
}

function reveal(element) {
  element.classList.remove("is-reveal-pending");
  element.classList.add("is-reveal-visible");
}

function resetReveal(element) {
  element.classList.remove("is-reveal-visible");
  element.classList.add("is-reveal-pending");
}

function reducedMotionEnabled() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function getObserver() {
  if (observer || !("IntersectionObserver" in window)) return observer;

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        resetReveal(entry.target);
        return;
      }

      if (entry.intersectionRatio >= 0.12) {
        reveal(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -6% 0px",
    threshold: [0, 0.12]
  });

  return observer;
}

export const revealDirective = {
  mounted(element, binding) {
    const options = motionOptions(binding.value);
    const delay = Number(options.delay);
    if (Number.isFinite(delay) && delay > 0) {
      element.style.setProperty("--reveal-delay", `${Math.min(delay, 360)}ms`);
    }

    addVariantClass(element, options.variant);
    configureGroup(element, options);

    if (reducedMotionEnabled() || !("IntersectionObserver" in window)) {
      reveal(element);
      return;
    }

    element.classList.add("motion-reveal", "is-reveal-pending");
    observedElements.set(element, true);
    getObserver()?.observe(element);
  },
  beforeUnmount(element) {
    observer?.unobserve(element);
    observedElements.delete(element);

    if (!observedElements.size) {
      observer?.disconnect();
      observer = undefined;
    }
  }
};
