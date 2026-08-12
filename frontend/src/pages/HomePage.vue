<template>
  <section class="hero home-hero five-year-hero">
    <div class="hero-copy">
      <p class="eyebrow">{{ t("homeEyebrow") }}</p>
      <h1>{{ t("homeTitle") }}</h1>
      <p class="home-subtitle">{{ t("homeSubtitle") }}</p>
      <p class="hero-lede">{{ t("homeLede") }}</p>
      <div class="hero-actions">
        <RouterLink class="button primary" to="/archive/2026">{{ t("enter2026") }}</RouterLink>
        <RouterLink class="button secondary" to="/xie-dialogue">{{ t("startChat") }}</RouterLink>
      </div>
    </div>
    <div class="hero-visual five-year-visual" :aria-label="t('starMapLabel')">
      <div class="constellation-map constellation-map-compact">
        <span class="orbit orbit-one" aria-hidden="true"></span>
        <span class="orbit orbit-two" aria-hidden="true"></span>
        <span class="constellation-line line-2022" aria-hidden="true"></span>
        <span class="constellation-line line-2023" aria-hidden="true"></span>
        <span class="constellation-line line-2024" aria-hidden="true"></span>
        <span class="constellation-line line-2025" aria-hidden="true"></span>
        <RouterLink
          v-for="node in yearNodes"
          :key="node.year"
          :class="['constellation-node', `node-${node.year}`, { featured: node.year === 2026 }]"
          :to="`/archive/${node.year}`"
        >
          <img v-if="node.image" :src="node.image" alt="">
          <span class="node-year">{{ node.year }}</span>
          <span class="node-title">{{ node.title }}</span>
          <span class="node-summary">{{ node.summary }}</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="section intro-section">
    <div class="intro-grid">
      <article class="intro-block">
        <p class="eyebrow">{{ t("meianEyebrow") }}</p>
        <h2>{{ t("meianTitle") }}</h2>
        <p>{{ t("meianText") }}</p>
      </article>
      <article class="intro-block">
        <p class="eyebrow">{{ t("tuanEyebrow") }}</p>
        <h2>{{ t("tuanTitle") }}</h2>
        <p>{{ t("tuanText") }}</p>
      </article>
    </div>
  </section>

</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "../i18n.js";

const { isEnglish, t } = useI18n();

const yearNodes = computed(() => {
  if (isEnglish.value) {
    return [
      { year: 2022, title: "Project Origin", summary: "Field research and Xie Yuanding source clues" },
      { year: 2023, title: "Digital Mei'an", summary: "3D modeling and VR exhibition" },
      { year: 2024, title: "Mei'an Metaverse", summary: "UE5 scenes, VR, and voice guide" },
      { year: 2025, title: "AI Youth Narrative", summary: "Mei Xiao'an and knowledge-base Q&A" },
      { year: 2026, title: "Xie Yuanding Avatar", summary: "Digital avatar\nPractice showcase", image: "/assets/projects/2026/xie-yuanding-portrait.jpg" }
    ];
  }

  return [
    { year: 2022, title: "项目起点", summary: "红色寻访与谢远定人物线索" },
    { year: 2023, title: "数字梅庵展馆", summary: "三维建模与 VR 全景展陈" },
    { year: 2024, title: "梅庵元宇宙", summary: "UE5 场景、VR 体验与语音导览" },
    { year: 2025, title: "AI 青年叙事", summary: "梅小安虚拟形象与知识库问答" },
    { year: 2026, title: "谢远定数字分身", summary: "数字人物\n沉浸式实践展示", image: "/assets/projects/2026/xie-yuanding-portrait.jpg" }
  ];
});
</script>
