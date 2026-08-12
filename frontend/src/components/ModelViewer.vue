<template>
  <div class="model-placeholder model-viewer-shell">
    <model-viewer
      v-if="isReady"
      class="xie-model-viewer"
      :src="info.model_url"
      :poster="info.preview_url"
      camera-controls
      auto-rotate
      shadow-intensity="0.7"
      exposure="0.9"
      alt="谢远定数字分身模型"
    />
    <div v-else class="model-fallback">
      <img :src="info.preview_url || '/assets/images/placeholder-media.svg'" alt="谢远定数字分身模型占位图">
      <span class="model-badge">模型制作中</span>
    </div>
    <p>{{ info.description }}</p>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
});

const isReady = computed(() => props.info.status === "ready" && props.info.model_url);

watch(isReady, async (ready) => {
  if (ready && !customElements.get("model-viewer")) {
    await import("@google/model-viewer");
  }
}, { immediate: true });
</script>
