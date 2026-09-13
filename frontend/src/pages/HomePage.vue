<template>
  <div class="home-layered-scroll">
    <section ref="heroSection" id="home-hero" class="home-official-hero" aria-label="寻迹梅庵首页主视觉">
      <picture class="home-official-hero-picture">
        <source media="(max-width: 700px)" srcset="/assets/images/home-archive-background-dongda-meian-mobile-gate-calligraphy-20260910.png">
        <img
          class="home-official-hero-image"
          src="/assets/images/home-archive-background-dongda-meian-gate-calligraphy-20260910.png"
          alt="东大梅庵，数字化体验平台"
        >
      </picture>
      <div class="home-hero-atmosphere" aria-hidden="true">
        <span v-for="index in 8" :key="`petal-${index}`" class="home-hero-petal"></span>
        <span v-for="index in 7" :key="`fiber-${index}`" class="home-hero-fiber"></span>
      </div>
    </section>

    <div class="home-foreground-sheet">
      <div class="home-meian-page-turn" aria-hidden="true">
        <picture class="home-meian-paper-cut">
          <source media="(max-width: 700px)" srcset="/assets/images/meian-paper-cut-hero-texture-mobile-20260913.svg">
          <img src="/assets/images/meian-paper-cut-hero-texture-20260913.svg" alt="">
        </picture>
      </div>

      <div class="home-foreground-body">
        <div class="home-chapter-preview-band">
        <nav class="home-chapter-preview" :aria-label="homeCopy.chapterPreviewLabel">
          <button v-for="chapter in chapters" :key="chapter.id" type="button" @click="scrollToSection(chapter.id)">
            <span>{{ chapter.number }}</span>
            <strong>{{ chapter.title }}</strong>
          </button>
        </nav>
      </div>

      <section ref="xieSection" id="home-xie-avatar" class="section home-feature-section home-xie-section">
    <span class="home-chapter-watermark" aria-hidden="true">01</span>
    <div v-reveal class="section-heading home-section-heading">
      <p class="eyebrow">{{ homeCopy.xieEyebrow }}</p>
      <h2>{{ homeCopy.xieTitle }}</h2>
    </div>
    <XieExhibition />
      </section>

      <div v-reveal class="home-section-divider" aria-hidden="true">
    <svg class="home-divider-path home-divider-path-desktop" viewBox="0 0 1200 150" preserveAspectRatio="xMidYMid meet">
      <g class="home-divider-source-nodes">
        <path pathLength="1" d="M58 84 L108 58 L150 94" />
        <circle cx="58" cy="84" r="4" />
        <circle cx="108" cy="58" r="5" />
        <circle cx="150" cy="94" r="3.5" />
      </g>
      <path class="home-divider-branch" pathLength="1" d="M58 84 C196 92 290 49 418 67 C536 84 631 103 753 78 C824 64 874 63 931 72" />
      <g class="home-divider-twigs">
        <path pathLength="1" d="M344 60 C377 44 394 33 408 16" />
        <path pathLength="1" d="M388 57 C417 42 439 37 463 39" />
        <path pathLength="1" d="M497 77 C525 59 539 44 548 25" />
        <path pathLength="1" d="M688 88 C716 106 733 112 760 114" />
      </g>
      <g class="home-divider-blossom" transform="translate(578 65)">
        <circle class="home-divider-petal" cx="0" cy="-10" r="7" />
        <circle class="home-divider-petal" cx="9.5" cy="-3" r="7" />
        <circle class="home-divider-petal" cx="5.5" cy="8" r="7" />
        <circle class="home-divider-petal" cx="-5.5" cy="8" r="7" />
        <circle class="home-divider-petal" cx="-9.5" cy="-3" r="7" />
        <circle class="home-divider-heart" cx="0" cy="0" r="3.5" />
      </g>
      <g class="home-divider-building">
        <path pathLength="1" d="M900 67 L900 58 L922 58 L922 48 L1125 48 L1125 58 L1147 58 L1147 67" />
        <path pathLength="1" d="M918 67 L918 121 L1127 121 L1127 67" />
        <path pathLength="1" d="M907 67 L1147 67" />
        <path pathLength="1" d="M941 121 L941 81 L968 81 L968 121 M986 121 L986 81 L1013 81 L1013 121" />
        <path pathLength="1" d="M1035 121 L1035 76 L1073 76 L1073 121 M1091 121 L1091 82 L1113 82 L1113 121" />
        <path pathLength="1" d="M1046 88 L1054 80 L1062 88 L1062 100 L1054 108 L1046 100 Z" />
        <path pathLength="1" d="M1021 121 L1021 128 L1087 128 L1087 121" />
      </g>
    </svg>

    <svg class="home-divider-path home-divider-path-mobile" viewBox="0 0 390 104" preserveAspectRatio="xMidYMid meet">
      <g class="home-divider-source-nodes">
        <path pathLength="1" d="M18 61 L46 44 L72 66" />
        <circle cx="18" cy="61" r="3" />
        <circle cx="46" cy="44" r="4" />
        <circle cx="72" cy="66" r="3" />
      </g>
      <path class="home-divider-branch" pathLength="1" d="M18 61 C86 72 121 36 181 51 C224 62 255 68 286 57" />
      <g class="home-divider-twigs">
        <path pathLength="1" d="M118 46 C135 35 145 25 151 13" />
        <path pathLength="1" d="M145 43 C162 34 174 32 186 33" />
      </g>
      <g class="home-divider-blossom" transform="translate(198 54)">
        <circle class="home-divider-petal" cx="0" cy="-8" r="5.5" />
        <circle class="home-divider-petal" cx="7.5" cy="-2" r="5.5" />
        <circle class="home-divider-petal" cx="4.5" cy="6.5" r="5.5" />
        <circle class="home-divider-petal" cx="-4.5" cy="6.5" r="5.5" />
        <circle class="home-divider-petal" cx="-7.5" cy="-2" r="5.5" />
        <circle class="home-divider-heart" cx="0" cy="0" r="2.8" />
      </g>
      <g class="home-divider-building">
        <path pathLength="1" d="M276 56 L276 50 L285 50 L285 43 L366 43 L366 50 L375 50 L375 56" />
        <path pathLength="1" d="M283 56 L283 84 L368 84 L368 56" />
        <path pathLength="1" d="M279 56 L375 56" />
        <path pathLength="1" d="M292 84 L292 65 L305 65 L305 84 M314 84 L314 65 L327 65 L327 84" />
        <path pathLength="1" d="M337 84 L337 62 L354 62 L354 84" />
      </g>
    </svg>
      </div>

      <section ref="gallerySection" id="home-digital-meian" class="section home-feature-section home-meian-gallery-section">
    <span class="home-chapter-watermark" aria-hidden="true">02</span>
    <div v-reveal class="section-heading home-section-heading">
      <p class="eyebrow">{{ homeCopy.galleryEyebrow }}</p>
      <h2>{{ homeCopy.galleryTitle }}</h2>
    </div>

    <div v-reveal="100" class="home-gallery-frame">
      <div class="home-gallery-toolbar">
        <div>
          <strong>{{ homeCopy.galleryCardTitle }}</strong>
          <span>{{ homeCopy.galleryCardMeta }}</span>
        </div>
        <button type="button" class="button secondary" @click="openGallery">{{ homeCopy.enlarge }}</button>
      </div>
      <div class="home-gallery-embed">
        <iframe
          :src="digitalMeianUrl"
          title="数字梅庵展馆"
          loading="lazy"
          allow="autoplay 'none'; xr-spatial-tracking"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="home-gallery-fallback">
        <img src="/assets/projects/2023/article/11.webp" alt="数字梅庵展馆预览">
        <a class="button secondary" :href="digitalMeianUrl" target="_blank" rel="noreferrer">{{ homeCopy.openExternal }}</a>
      </div>
    </div>
        </section>

        <HomeMediaDivider v-reveal variant="gallery-documentary" />

        <section ref="documentarySection" id="home-congress-documentary" class="section home-feature-section home-documentary-section">
          <span class="home-chapter-watermark" aria-hidden="true">03</span>
          <div v-reveal class="section-heading home-section-heading">
            <p class="eyebrow">{{ homeCopy.documentaryEyebrow }}</p>
            <h2>{{ homeCopy.documentaryTitle }}</h2>
          </div>
          <HomeDocumentaryArchive v-reveal="100" />
        </section>

        <HomeMediaDivider v-reveal variant="documentary-song" />

        <section ref="songSection" id="home-meian-song" class="section home-feature-section home-song-section">
          <span class="home-chapter-watermark" aria-hidden="true">04</span>
          <div v-reveal class="section-heading home-section-heading">
            <p class="eyebrow">{{ homeCopy.songEyebrow }}</p>
            <h2>{{ homeCopy.songTitle }}</h2>
          </div>
          <div v-reveal="100" class="home-media-stage home-song-stage">
            <HomeSongArchive :tracks="songTracks" :labels="homeCopy.songPlayer" />
          </div>
        </section>
      </div>
    </div>
  </div>

  <nav :class="['home-quick-nav', { 'is-visible': activeChapter }]" :aria-label="homeCopy.quickNavLabel">
    <button
      v-for="chapter in chapters"
      :key="chapter.id"
      type="button"
      :class="{ 'is-active': activeChapter === chapter.id }"
      :aria-current="activeChapter === chapter.id ? 'location' : undefined"
      @click="scrollToSection(chapter.id)"
    >
      <span class="home-quick-index">{{ chapter.number }}</span>
      <span class="home-quick-label">{{ chapter.shortTitle }}</span>
    </button>
  </nav>

  <dialog ref="galleryDialog" class="home-gallery-dialog" @click="handleGalleryBackdrop">
    <div class="home-gallery-dialog-shell">
      <header class="home-gallery-dialog-header">
        <div>
          <p class="eyebrow">{{ homeCopy.galleryEyebrow }}</p>
          <h2>{{ homeCopy.galleryTitle }}</h2>
        </div>
        <button type="button" class="home-gallery-close" @click="closeGallery" aria-label="关闭数字梅庵展馆">×</button>
      </header>
      <iframe
        :src="digitalMeianUrl"
        title="放大查看数字梅庵展馆"
        loading="lazy"
        allow="autoplay 'none'; xr-spatial-tracking"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <a class="button secondary" :href="digitalMeianUrl" target="_blank" rel="noreferrer">{{ homeCopy.openExternal }}</a>
    </div>
  </dialog>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import HomeMediaDivider from "../components/HomeMediaDivider.vue";
import HomeSongArchive from "../components/HomeSongArchive.vue";
import HomeDocumentaryArchive from "../components/HomeDocumentaryArchive.vue";
import { useI18n } from "../i18n.js";

import XieExhibition from "../components/XieExhibition.vue";
import { useXieExhibitionCopy } from "../components/xieExhibitionCopy.js";

const { isEnglish } = useI18n();
const xieCopy = useXieExhibitionCopy();
const digitalMeianUrl = "https://www.720yun.com/vr/658jOzey5w8";
const galleryDialog = ref(null);
const heroSection = ref(null);
const xieSection = ref(null);
const gallerySection = ref(null);
const documentarySection = ref(null);
const songSection = ref(null);
const activeChapter = ref("");
let chapterObserver;
let chapterFrame = 0;
const homeCopy = computed(() => {
  if (isEnglish.value) {
    return {
      ...xieCopy.value,

      galleryEyebrow: "Digital Mei'an",
      galleryTitle: "Digital Mei'an Exhibition Hall",
      galleryCardTitle: "2023 Digital Mei'an",
      galleryCardMeta: "3D modeling · VR exhibition",
      documentaryEyebrow: "Moving-image archive",
      documentaryTitle: "Second CYL Congress Documentary",
      songEyebrow: "Sound archive",
      songTitle: "Song of Mei'an",
      songPlayer: {
        currentTrack: "Current track",
        collection: "Mei'an audio collection",
        coverAlt: "Watercolor cover of the Mei'an audio collection",
        catalogue: "Track catalogue",
        trackCount: "10 tracks",
        play: "Play current track",
        pause: "Pause current track",
        progress: "Playback progress",
        pending: "Pending"
      },
      contentPending: "Content coming soon",
      enlarge: "Enlarge",
      openExternal: "Open in new window",
      chapterPreviewLabel: "Explore the four digital exhibition chapters",
      quickNavLabel: "Home chapter navigation",
      quickXie: "Xie Yuanding Avatar",
      quickGallery: "Digital Mei'an",
      quickDocumentary: "CYL Congress Documentary",
      quickSong: "Song of Mei'an"
    };
  }

  return {
    ...xieCopy.value,

    galleryEyebrow: "数字梅庵",
    galleryTitle: "数字梅庵展馆",
    galleryCardTitle: "2023 数字梅庵展馆",
    galleryCardMeta: "三维建模 · VR 全景展陈",
    documentaryEyebrow: "影像档案",
    documentaryTitle: "团二大纪录片",
    songEyebrow: "声音档案",
    songTitle: "梅庵歌曲",
    songPlayer: {
      currentTrack: "当前曲目",
      collection: "梅庵声音馆藏",
      coverAlt: "梅庵声音馆藏水彩封面",
      catalogue: "馆藏曲目",
      trackCount: "共10首",
      play: "播放当前曲目",
      pause: "暂停当前曲目",
      progress: "播放进度",
      pending: "待提供"
    },
    contentPending: "内容待接入",
    enlarge: "放大查看",
    openExternal: "新窗口打开",
    chapterPreviewLabel: "浏览首页四项数字展陈",
    quickNavLabel: "首页章节定位",
    quickXie: "谢远定数字人",
    quickGallery: "数字梅庵展馆",
    quickDocumentary: "团二大纪录片",
    quickSong: "梅庵歌曲"
  };
});

const chapters = computed(() => [
  { id: "home-xie-avatar", number: "01", title: homeCopy.value.xieTitle, shortTitle: homeCopy.value.quickXie },
  { id: "home-digital-meian", number: "02", title: homeCopy.value.galleryTitle, shortTitle: homeCopy.value.quickGallery },
  { id: "home-congress-documentary", number: "03", title: homeCopy.value.documentaryTitle, shortTitle: homeCopy.value.quickDocumentary },
  { id: "home-meian-song", number: "04", title: homeCopy.value.songTitle, shortTitle: homeCopy.value.quickSong }
]);

const songTrackLibrary = [
  { id: "01", title: "序 月影梅庵", titleEn: "Prologue: Moonlit Mei'an", duration: "06:19", src: "/assets/audio/meian/01-prologue-moonlit-meian.mp3" },
  { id: "02", title: "蝶恋花", titleEn: "Butterflies in Love with Flowers", duration: "03:50", src: "/assets/audio/meian/02-die-lian-hua.mp3" },
  { id: "03", title: "咏梅", titleEn: "Ode to Plum Blossoms", duration: "05:37", src: "/assets/audio/meian/03-yong-mei.mp3" },
  { id: "04", title: "松烟", titleEn: "Pine Soot", duration: "05:14", src: "/assets/audio/meian/04-song-yan.mp3" },
  { id: "05", title: "秋风词", titleEn: "Song of the Autumn Wind", duration: "04:45", src: "/assets/audio/meian/05-qiu-feng-ci.mp3" },
  { id: "06", title: "关山月", titleEn: "Moon over the Mountain Pass", duration: "03:43", src: "/assets/audio/meian/06-guan-shan-yue.mp3" },
  { id: "07", title: "青春", titleEn: "Youth", duration: "03:31", src: "/assets/audio/meian/07-qing-chun.mp3" },
  { id: "08", title: "时代的囚徒", titleEn: "Prisoner of the Times", duration: "03:24", src: "/assets/audio/meian/08-prisoner-of-the-times.mp3" },
  { id: "09", title: "初心照梅庵", titleEn: "Original Aspiration Illuminates Mei'an", duration: "02:40", src: "/assets/audio/meian/09-original-intent-shines-on-meian.mp3" },
  { id: "10", title: "尾声 大学之道", titleEn: "Epilogue: The Great Learning", duration: "04:02", src: "/assets/audio/meian/10-epilogue-the-great-learning.mp3" }
];

const songTracks = computed(() => songTrackLibrary.map((track) => ({
  ...track,
  title: isEnglish.value ? track.titleEn : track.title,
  artist: "SEU室内合唱团",
  status: "ready"
})));

function updateActiveChapter() {
  const sections = [xieSection.value, gallerySection.value, documentarySection.value, songSection.value].filter(Boolean);
  if (!sections.length || sections[0].getBoundingClientRect().top > window.innerHeight * 0.8) {
    activeChapter.value = "";
    return;
  }
  const reached = sections.filter((section) => section.getBoundingClientRect().top <= window.innerHeight * 0.45);
  activeChapter.value = (reached.at(-1) || sections[0]).id;
}

function scheduleChapterUpdate() {
  if (chapterFrame) return;
  chapterFrame = requestAnimationFrame(() => {
    chapterFrame = 0;
    updateActiveChapter();
  });
}

onMounted(() => {
  chapterObserver = new IntersectionObserver(updateActiveChapter, {
    rootMargin: "-30% 0px -48% 0px",
    threshold: [0, 0.15, 0.4]
  });

  [xieSection.value, gallerySection.value, documentarySection.value, songSection.value].forEach((section) => {
    if (section) chapterObserver.observe(section);
  });
  window.addEventListener("scroll", scheduleChapterUpdate, { passive: true });
  window.addEventListener("resize", scheduleChapterUpdate);
  updateActiveChapter();
});

onBeforeUnmount(() => {
  chapterObserver?.disconnect();
  window.removeEventListener("scroll", scheduleChapterUpdate);
  window.removeEventListener("resize", scheduleChapterUpdate);
  cancelAnimationFrame(chapterFrame);
});

function scrollToSection(id) {
  activeChapter.value = id;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

function openGallery() {
  if (galleryDialog.value && !galleryDialog.value.open) {
    galleryDialog.value.showModal();
  }
}

function closeGallery() {
  galleryDialog.value?.close();
}

function handleGalleryBackdrop(event) {
  if (event.target === event.currentTarget) closeGallery();
}
</script>
