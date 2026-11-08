<template>
  <div class="home-avatar-video-stage is-portrait" :aria-label="label">
    <img :src="poster" :alt="label" class="home-avatar-poster">
    <video
      v-show="!failed && playing"
      ref="portrait"
      :src="src"
      :poster="poster"
      playsinline
      preload="auto"
      :aria-label="label"
      @loadedmetadata="playback?.ready()"
      @playing="playing = speechActive"
      @pause="playing = false"
      @ended="handleEnded"
      @error="handleFailure"
    ></video>
    <p v-if="failed" class="home-avatar-video-notice" role="status">{{ errorLabel }}</p>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { createSpeechPortraitPlayback } from "./speechPortraitPlayback.js";

const props = defineProps({
  speechActive: Boolean,
  src: { type: String, required: true },
  poster: { type: String, required: true },
  label: { type: String, required: true },
  errorLabel: { type: String, required: true }
});
const emit = defineEmits(["media-ended", "playback-failed"]);
const portrait = ref(null);
const failed = ref(false);
const playing = ref(false);
let playback;

function handleFailure() {
  failed.value = true;
  playing.value = false;
  playback?.setActive(false);
  emit("playback-failed");
}

function handleEnded() {
  playback?.ended();
}

watch(() => props.speechActive, (active) => {
  if (!active) playing.value = false;
  if (!failed.value) playback?.setActive(active);
});
onMounted(() => {
  playback = createSpeechPortraitPlayback(portrait.value, {
    muted: false,
    onBlocked: handleFailure,
    onEnded: () => {
      playing.value = false;
      emit("media-ended");
    }
  });
  playback.setActive(props.speechActive);
});
onBeforeUnmount(() => {
  playback?.dispose();
  portrait.value?.removeAttribute("src");
  portrait.value?.load();
});
</script>
