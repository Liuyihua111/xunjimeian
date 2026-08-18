<template>
  <section class="home-official-hero" aria-label="寻迹梅庵首页主视觉">
    <img
      class="home-official-hero-image"
      src="/assets/images/home-archive-background-xunji-meian-20260817.png"
      alt="寻迹梅庵，让百年前的青年被看见"
    >
  </section>

  <section id="home-xie-avatar" class="section home-feature-section home-xie-section">
    <div class="section-heading home-section-heading">
      <p class="eyebrow">{{ homeCopy.xieEyebrow }}</p>
      <h2>{{ homeCopy.xieTitle }}</h2>
      <p>{{ homeCopy.xieText }}</p>
    </div>
    <div class="home-xie-grid">
      <div class="home-model-column">
        <ModelViewer :info="modelInfo" />
        <RouterLink class="text-link home-detail-link" to="/xie-yuanding">{{ homeCopy.xieLink }}</RouterLink>
      </div>
      <ChatPanel />
    </div>
  </section>

  <section id="home-digital-meian" class="section home-feature-section home-meian-gallery-section">
    <div class="section-heading home-section-heading">
      <p class="eyebrow">{{ homeCopy.galleryEyebrow }}</p>
      <h2>{{ homeCopy.galleryTitle }}</h2>
      <p>{{ homeCopy.galleryText }}</p>
    </div>

    <div class="home-gallery-frame">
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

  <nav class="home-quick-nav" aria-label="首页快速定位">
    <button type="button" @click="scrollToSection('home-xie-avatar')">{{ homeCopy.quickXie }}</button>
    <button type="button" @click="scrollToSection('home-digital-meian')">{{ homeCopy.quickGallery }}</button>
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
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <a class="button secondary" :href="digitalMeianUrl" target="_blank" rel="noreferrer">{{ homeCopy.openExternal }}</a>
    </div>
  </dialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ChatPanel from "../components/ChatPanel.vue";
import ModelViewer from "../components/ModelViewer.vue";
import { fetchModelInfo } from "../api.js";
import { useI18n } from "../i18n.js";

const { isEnglish } = useI18n();
const digitalMeianUrl = "https://www.720yun.com/vr/658jOzey5w8";
const galleryDialog = ref(null);
const modelInfo = ref({
  name: "谢远定数字分身模型",
  model_url: "",
  preview_url: "/assets/models/xieyuanding/preview.png",
  status: "building",
  description: "谢远定静态人物模型正在制作中，当前展示为占位版本。"
});

const homeCopy = computed(() => {
  if (isEnglish.value) {
    return {
      xieEyebrow: "Xie Yuanding Avatar",
      xieTitle: "Source-based digital avatar and Q&A",
      xieText: "Start from the digital image of Xie Yuanding and ask questions about his studies, youth movement work, and the Second CYL Congress. Each answer can be checked against retrieved sources.",
      xieLink: "View the avatar page",
      galleryEyebrow: "Digital Mei'an",
      galleryTitle: "Digital Mei'an Exhibition Hall",
      galleryText: "The 2023 digital exhibition is embedded here so visitors can enter the reconstructed Mei'an space directly from the homepage.",
      galleryCardTitle: "2023 Digital Mei'an",
      galleryCardMeta: "3D modeling · VR exhibition",
      enlarge: "Enlarge",
      openExternal: "Open in new window",
      quickXie: "Avatar",
      quickGallery: "Exhibition"
    };
  }

  return {
    xieEyebrow: "谢远定数字人",
    xieTitle: "基于史料的数字人问答",
    xieText: "从谢远定数字形象出发，围绕其求学经历、青年运动实践和团二大线索展开提问，并通过史料依据核验回答来源。",
    xieLink: "查看数字人页面",
    galleryEyebrow: "数字梅庵",
    galleryTitle: "数字梅庵展馆",
    galleryText: "将 2023 年数字梅庵展馆直接嵌入首页，让参观者在首页进入梅庵空间，浏览建筑外观与展陈内容。",
    galleryCardTitle: "2023 数字梅庵展馆",
    galleryCardMeta: "三维建模 · VR 全景展陈",
    enlarge: "放大查看",
    openExternal: "新窗口打开",
    quickXie: "谢远定数字人",
    quickGallery: "梅庵数字展馆"
  };
});

onMounted(async () => {
  modelInfo.value = await fetchModelInfo();
});

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
