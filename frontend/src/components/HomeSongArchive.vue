<template>
  <div class="home-song-archive">
    <section class="home-song-now" :aria-label="labels.currentTrack">
      <div class="home-song-artwork">
        <img
          class="home-song-artwork-image"
          src="/assets/images/meian-audio-collection-cover-20260912.webp"
          :alt="labels.coverAlt"
        >
      </div>

      <div class="home-song-now-copy">
        <p class="eyebrow">{{ labels.collection }}</p>
        <p class="home-song-counter">{{ currentTrack.id }} / {{ paddedTrackCount }}</p>
        <h3>{{ currentTrack.title }}</h3>
        <p>{{ currentTrack.artist }}</p>
      </div>

      <div class="home-song-controls" :class="{ 'is-disabled': !hasSource }">
        <button type="button" :disabled="!hasSource" :aria-label="playing ? labels.pause : labels.play" @click="togglePlayback">
          <span :class="['home-song-play-symbol', { 'is-playing': playing }]" aria-hidden="true"></span>
        </button>
        <input
          type="range"
          min="0"
          :max="duration || 0"
          :value="currentTime"
          :disabled="!hasSource"
          :aria-label="labels.progress"
          @input="seek"
        >
        <span>{{ formatTime(currentTime) }} / {{ currentTrack.duration || "--:--" }}</span>
      </div>

      <audio
        ref="audioElement"
        :src="currentTrack.src || undefined"
        preload="metadata"
        @loadedmetadata="handleMetadata"
        @timeupdate="handleTimeUpdate"
        @play="playing = true"
        @pause="playing = false"
        @ended="handleEnded"
      ></audio>
    </section>

    <section class="home-song-catalogue" :aria-label="labels.catalogue">
      <header>
        <p class="eyebrow">{{ labels.catalogue }}</p>
        <span>{{ labels.trackCount }}</span>
      </header>
      <ol>
        <li v-for="(track, index) in tracks" :key="track.id">
          <button
            type="button"
            :class="{ 'is-current': index === currentIndex }"
            :disabled="!track.src"
            @click="selectTrack(index)"
          >
            <span class="home-song-track-index">{{ track.id }}</span>
            <span class="home-song-track-copy">
              <strong>{{ track.title }}</strong>
              <small>{{ track.artist }}</small>
            </span>
            <span class="home-song-track-status">{{ track.src ? track.duration : labels.pending }}</span>
          </button>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";

const props = defineProps({
  tracks: {
    type: Array,
    required: true
  },
  labels: {
    type: Object,
    required: true
  }
});

const audioElement = ref(null);
const currentIndex = ref(0);
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const fallbackTrack = { id: "01", title: "", artist: "", duration: "--:--", src: "" };
const currentTrack = computed(() => props.tracks[currentIndex.value] || fallbackTrack);
const hasSource = computed(() => Boolean(currentTrack.value.src));
const paddedTrackCount = computed(() => String(props.tracks.length).padStart(2, "0"));

async function selectTrack(index) {
  if (!props.tracks[index]?.src) return;
  audioElement.value?.pause();
  currentIndex.value = index;
  currentTime.value = 0;
  duration.value = 0;
  await nextTick();
  audioElement.value?.load();
  audioElement.value?.play().catch(() => {
    playing.value = false;
  });
}

function togglePlayback() {
  if (!hasSource.value || !audioElement.value) return;
  if (audioElement.value.paused) {
    audioElement.value.play().catch(() => {
      playing.value = false;
    });
  } else {
    audioElement.value.pause();
  }
}

function handleMetadata(event) {
  duration.value = Number.isFinite(event.target.duration) ? event.target.duration : 0;
}

function handleTimeUpdate(event) {
  currentTime.value = event.target.currentTime || 0;
}

function handleEnded() {
  playing.value = false;
  currentTime.value = 0;
}

function seek(event) {
  if (!audioElement.value) return;
  const nextTime = Number(event.target.value);
  audioElement.value.currentTime = nextTime;
  currentTime.value = nextTime;
}

function formatTime(value) {
  if (!Number.isFinite(value) || value <= 0) return "00:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

onBeforeUnmount(() => {
  audioElement.value?.pause();
});
</script>
