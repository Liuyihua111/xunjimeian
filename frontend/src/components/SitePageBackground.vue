<template>
  <div
    v-if="variant"
    :class="['site-page-background', `site-page-background-${variant}`]"
    :style="{ '--page-background-shift': `${offset}px` }"
    aria-hidden="true"
  ></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

defineProps({
  variant: {
    type: String,
    default: ""
  }
});

const offset = ref(0);
let frameId = 0;
let motionQuery;

function updateOffset() {
  frameId = 0;
  offset.value = Math.min(window.scrollY * 0.018, 24);
}

function handleScroll() {
  if (!frameId) {
    frameId = window.requestAnimationFrame(updateOffset);
  }
}

function syncMotionPreference() {
  window.removeEventListener("scroll", handleScroll);

  if (motionQuery.matches) {
    updateOffset();
    window.addEventListener("scroll", handleScroll, { passive: true });
  } else {
    offset.value = 0;
  }
}

onMounted(() => {
  motionQuery = window.matchMedia("(min-width: 821px) and (prefers-reduced-motion: no-preference)");
  syncMotionPreference();
  motionQuery.addEventListener?.("change", syncMotionPreference);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  motionQuery?.removeEventListener?.("change", syncMotionPreference);
  if (frameId) {
    window.cancelAnimationFrame(frameId);
  }
});
</script>
