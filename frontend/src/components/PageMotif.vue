<template>
  <figure :class="['page-motif', `page-motif-${variant}`]" aria-hidden="true">
    <img :src="imageSrc" alt="" loading="lazy">
    <span class="motif-trace"></span>
    <span class="motif-node motif-node-one"></span>
    <span class="motif-node motif-node-two"></span>
  </figure>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    required: true
  }
});

const imageMap = {
  overview: "/assets/illustrations/overview-five-year-route.webp",
  context: "/assets/illustrations/context-meian-meeting.webp",
  xie: "/assets/illustrations/xie-point-cloud.webp",
  dialogue: "/assets/illustrations/dialogue-source-flow.webp",
  archive: "/assets/illustrations/archive-five-year-path.webp",
  "year-2022": "/assets/illustrations/year-2022-route.webp",
  "year-2023": "/assets/illustrations/year-2023-wireframe.webp",
  "year-2024": "/assets/illustrations/year-2024-vr.webp",
  "year-2025": "/assets/illustrations/year-2025-knowledge.webp",
  "year-2026": "/assets/illustrations/year-2026-convergence.webp"
};

const imageSrc = computed(() => imageMap[props.variant] || imageMap.overview);
</script>
