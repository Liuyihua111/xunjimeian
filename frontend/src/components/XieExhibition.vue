<template>
    <div class="home-xie-grid">
      <div v-reveal="80" class="home-model-column">
        <SpeechPortraitVideo
          :speech-active="speechActive"
          src="/assets/video/xie-yuanding-speaking-hq-20260913.mp4"
          poster="/assets/video/xie-yuanding-idle-20260913.webp"
          :label="homeCopy.xieTitle"
          :error-label="homeCopy.videoError"
        />
        <div class="home-avatar-actions">
          <button ref="profileTrigger" class="home-profile-trigger" type="button" @click="openProfile">
            <span>{{ homeCopy.xieLink }}</span>
            <span class="home-profile-arrow" aria-hidden="true">→</span>
          </button>
          <button ref="modelTrigger" class="home-profile-trigger is-model" type="button" @click="openModel">
            <span>{{ homeCopy.modelLink }}</span>
            <span class="home-profile-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <ChatPanel :show-status="false" @speech-active-change="handleSpeechActivity" />
    </div>
    <figure v-reveal="140" class="home-xie-feature-film">
      <div class="home-xie-feature-film-frame">
        <video
          ref="xieFeatureVideo"
          controls
          playsinline
          preload="metadata"
          src="/assets/video/xie-yuanding-feature-20260912.mp4"
          @error="xieVideoFailed = true"
        ></video>
        <p v-if="xieVideoFailed" role="status">{{ homeCopy.videoError }}</p>
      </div>
      <figcaption>
        <strong>{{ homeCopy.videoTitle }}</strong>
        <span>{{ homeCopy.videoMeta }}</span>
      </figcaption>
    </figure>

  <dialog ref="profileDialog" class="home-profile-dialog" @click="handleProfileBackdrop" @close="restoreProfileFocus">
    <article class="home-profile-dialog-shell">
      <header class="home-profile-dialog-header">
        <div>
          <p class="eyebrow">{{ homeCopy.profileEyebrow }}</p>
          <h2>{{ homeCopy.profileTitle }}</h2>
          <p>{{ homeCopy.profileIntro }}</p>
        </div>
        <button ref="profileCloseButton" type="button" class="home-gallery-close" @click="closeProfile" :aria-label="homeCopy.profileClose">×</button>
      </header>

      <div class="home-profile-dialog-body">
        <ol class="home-profile-timeline">
          <li v-for="period in homeCopy.profilePeriods" :key="period.title">
            <span aria-hidden="true"></span>
            <div>
              <h3>{{ period.title }}</h3>
              <p>{{ period.text }}</p>
            </div>
          </li>
        </ol>

        <aside class="home-profile-aside">
          <section>
            <p class="eyebrow">{{ homeCopy.abilityEyebrow }}</p>
            <h3>{{ homeCopy.abilityTitle }}</h3>
            <ul>
              <li v-for="ability in homeCopy.abilities" :key="ability">{{ ability }}</li>
            </ul>
          </section>
          <section class="home-profile-sources">
            <p class="eyebrow">{{ homeCopy.sourcesTitle }}</p>
            <a href="https://history.seu.edu.cn/2018/0326/c18671a210750/page.htm" target="_blank" rel="noreferrer">{{ homeCopy.sourceHistory }}</a>
            <a href="https://seuaa.seu.edu.cn/2008/0114/c1670a26729/page.htm" target="_blank" rel="noreferrer">{{ homeCopy.sourceAlumni }}</a>
            <a href="https://dsb.nanjing.gov.cn/xxcb/201306/t20130617_2084703.html" target="_blank" rel="noreferrer">{{ homeCopy.sourceNanjing }}</a>
          </section>
        </aside>
      </div>
    </article>
  </dialog>

  <dialog ref="modelDialog" class="home-model-dialog" @click="handleModelBackdrop" @close="handleModelClosed">
    <div class="home-model-dialog-shell">
      <header class="home-gallery-dialog-header">
        <div>
          <p class="eyebrow">{{ homeCopy.modelEyebrow }}</p>
          <h2>{{ homeCopy.modelTitle }}</h2>
        </div>
        <button ref="modelCloseButton" type="button" class="home-gallery-close" @click="closeModel" :aria-label="homeCopy.modelClose">×</button>
      </header>
      <div class="home-model-dialog-stage">
        <ModelViewer v-if="modelMounted" :info="modelInfo" :speech-active="speechActive" />
      </div>
    </div>
  </dialog>

</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import ChatPanel from "./ChatPanel.vue";
import SpeechPortraitVideo from "./SpeechPortraitVideo.vue";
import ModelViewer from "./ModelViewer.vue";
import { fetchModelInfo } from "../api.js";
import { useXieExhibitionCopy } from "./xieExhibitionCopy.js";

const homeCopy = useXieExhibitionCopy();
const profileDialog = ref(null);
const modelDialog = ref(null);
const profileTrigger = ref(null);
const profileCloseButton = ref(null);
const modelTrigger = ref(null);
const modelCloseButton = ref(null);
const speechActive = ref(false);
const modelMounted = ref(false);
const xieVideoFailed = ref(false);
const xieFeatureVideo = ref(null);
let featureVideoObserver;
const modelInfo = ref({
  name: "谢远定数字分身模型",
  model_url: "",
  preview_url: "/assets/models/xieyuanding/preview.png",
  status: "building",
  description: "谢远定静态人物模型正在制作中，当前展示为占位版本。"
});

onMounted(() => {
  featureVideoObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => !entry.isIntersecting || entry.intersectionRatio < 0.25)) {
      xieFeatureVideo.value?.pause();
    }
  }, { threshold: [0, 0.25] });
  if (xieFeatureVideo.value) featureVideoObserver.observe(xieFeatureVideo.value);
});

onBeforeUnmount(() => {
  featureVideoObserver?.disconnect();
  xieFeatureVideo.value?.pause();
  profileDialog.value?.close();
  modelDialog.value?.close();
  unlockModalScroll();
});

function handleSpeechActivity(active) {
  speechActive.value = active;
}

function openProfile() {
  if (profileDialog.value && !profileDialog.value.open) {
    profileDialog.value.showModal();
    lockModalScroll();
    requestAnimationFrame(() => {
      profileCloseButton.value?.focus({ preventScroll: true });
    });
  }
}

async function openModel() {
  if (!modelDialog.value || modelDialog.value.open) return;

  modelMounted.value = true;
  await nextTick();
  modelDialog.value.showModal();
  lockModalScroll();
  requestAnimationFrame(() => {
    modelCloseButton.value?.focus({ preventScroll: true });
  });
  modelInfo.value = await fetchModelInfo();
}

function closeModel() {
  modelDialog.value?.close();
}

function handleModelBackdrop(event) {
  if (event.target === event.currentTarget) closeModel();
}

function handleModelClosed() {
  modelMounted.value = false;
  unlockModalScroll();
  modelTrigger.value?.focus({ preventScroll: true });
}

function closeProfile() {
  profileDialog.value?.close();
}

function handleProfileBackdrop(event) {
  if (event.target === event.currentTarget) closeProfile();
}

function restoreProfileFocus() {
  unlockModalScroll();
  profileTrigger.value?.focus({ preventScroll: true });
}

function lockModalScroll() {
  document.documentElement.classList.add("profile-modal-open");
  document.body.classList.add("profile-modal-open");
}

function unlockModalScroll() {
  document.documentElement.classList.remove("profile-modal-open");
  document.body.classList.remove("profile-modal-open");
}

</script>
