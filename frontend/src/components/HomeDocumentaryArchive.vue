<template>
  <div class="home-documentary-archive">
    <figure class="home-documentary-player">
      <div class="home-documentary-screen">
        <video ref="player" :key="current.id" controls playsinline preload="metadata"
          :src="current.src" :poster="current.poster" :aria-label="title(current)"
          @error="failed = true"></video>
        <p v-if="failed" role="status">{{ isEnglish ? 'This film is temporarily unavailable.' : '影片暂时无法加载，请稍后重试' }}</p>
      </div>
      <figcaption><strong>{{ title(current) }}</strong><span>{{ current.duration }}</span></figcaption>
    </figure>
    <nav class="home-documentary-catalogue" :aria-label="isEnglish ? 'Film catalogue' : '纪录片目录'">
      <p class="eyebrow">{{ isEnglish ? 'Film collection / 03' : '馆藏影像 / 03' }}</p>
      <button v-for="(film, index) in documentaryLibrary" :key="film.id" type="button"
        :class="{ 'is-current': film.id === current.id }" :aria-pressed="film.id === current.id"
        @click="selectFilm(film)">
        <span class="home-documentary-number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="home-documentary-name">{{ title(film) }}</span>
        <span class="home-documentary-duration">{{ film.duration }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import { useI18n } from "../i18n.js";
import { documentaryLibrary } from "./documentaryLibrary.js";

const { isEnglish } = useI18n();
const current = ref(documentaryLibrary[0]);
const player = ref(null);
const failed = ref(false);
const title = (film) => isEnglish.value ? film.titleEn : film.title;

function unload() {
  player.value?.pause();
  player.value?.removeAttribute("src");
  player.value?.load();
}
function selectFilm(film) {
  if (film.id === current.value.id) return;
  unload();
  failed.value = false;
  current.value = film;
}
onBeforeUnmount(unload);
</script>
