<template>
  <dialog
    ref="dialogElement"
    class="annual-result-dialog"
    :aria-labelledby="titleId"
    @click="handleBackdropClick"
    @close="restoreFocus"
  >
    <div class="annual-result-dialog-shell">
      <header class="annual-result-dialog-header">
        <div>
          <p>{{ year }} · 年度数字成果</p>
          <h2 :id="titleId">{{ result.title }}</h2>
        </div>
        <button class="annual-result-close" type="button" aria-label="关闭成果详情" @click="close">
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <div class="annual-result-dialog-body">
        <div v-if="result.type === 'video' && result.media_url" class="annual-result-media-frame">
          <video :src="result.media_url" :poster="result.poster_url" controls preload="metadata">
            当前浏览器无法播放该视频
          </video>
        </div>

        <div v-else-if="result.type === 'iframe' && result.media_url" class="annual-result-media-frame annual-result-iframe-frame">
          <iframe
            :src="result.media_url"
            :title="result.title"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div v-else-if="result.type === 'model' && result.media_url" class="annual-result-media-frame">
          <model-viewer
            class="annual-result-model"
            :src="result.media_url"
            :poster="result.poster_url"
            camera-controls
            auto-rotate
            shadow-intensity="0.7"
            exposure="0.9"
            :alt="result.title"
          />
        </div>

        <div v-else-if="result.gallery?.length" class="annual-result-gallery">
          <figure v-for="item in result.gallery" :key="item.path">
            <img :src="item.path" :alt="item.alt || item.caption || result.title">
            <figcaption v-if="item.caption">{{ item.caption }}</figcaption>
          </figure>
        </div>

        <div v-else class="annual-result-pending">
          <img v-if="result.poster_url" :src="result.poster_url" :alt="result.title">
          <div>
            <strong>{{ statusLabel }}</strong>
            <p>{{ result.status_text || result.description }}</p>
          </div>
        </div>

        <div class="annual-result-copy">
          <p>{{ result.description }}</p>
          <a
            v-if="result.external_url"
            class="button secondary"
            :href="result.external_url"
            target="_blank"
            rel="noreferrer"
          >
            在新窗口打开成果
          </a>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  result: {
    type: Object,
    required: true
  },
  year: {
    type: [Number, String],
    required: true
  }
});

const dialogElement = ref(null);
const returnFocusElement = ref(null);
const titleId = computed(() => `annual-result-title-${props.year}`);
const statusLabel = computed(() => {
  if (props.result.status === "planned") return "成果形式待确定";
  if (props.result.status === "building") return "成果素材待接入";
  return "成果暂不可用";
});

watch(
  () => [props.result.type, props.result.media_url],
  async ([type, mediaUrl]) => {
    if (type === "model" && mediaUrl && !customElements.get("model-viewer")) {
      await import("@google/model-viewer");
    }
  },
  { immediate: true }
);

async function open() {
  returnFocusElement.value = document.activeElement;
  await nextTick();
  if (dialogElement.value && !dialogElement.value.open) {
    dialogElement.value.showModal();
  }
}

function close() {
  dialogElement.value?.close();
}

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) close();
}

function restoreFocus() {
  returnFocusElement.value?.focus?.();
  returnFocusElement.value = null;
}

onBeforeUnmount(() => {
  if (dialogElement.value?.open) dialogElement.value.close();
});

defineExpose({ open, close });
</script>
