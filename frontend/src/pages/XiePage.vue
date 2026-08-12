<template>
  <section class="page-hero">
    <p class="eyebrow">{{ t("xieEyebrow") }}</p>
    <h1>{{ t("xieTitle") }}</h1>
    <p>{{ t("xieLede") }}</p>
    <div class="page-actions">
      <RouterLink class="button primary" to="/xie-dialogue">{{ t("xieTalk") }}</RouterLink>
    </div>
  </section>

  <section class="section split model-layout">
    <ModelViewer :info="modelInfo" />
    <div class="info-stack">
      <figure class="xie-asset-card">
        <img src="/assets/projects/2026/xie-yuanding-fullbody.jpg" alt="谢远定数字分身人物素材">
        <figcaption>谢远定数字分身人物素材位</figcaption>
      </figure>
      <article class="compact-card">
        <h2>{{ t("xieProfileTitle") }}</h2>
        <p>{{ t("xieProfileText") }}</p>
      </article>
      <article class="compact-card">
        <h2>{{ t("xieAbilityTitle") }}</h2>
        <p>{{ t("xieAbilityText") }}</p>
      </article>
      <article class="compact-card">
        <h2>{{ t("xieProgressTitle") }}</h2>
        <p>{{ t("xieProgressText") }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ModelViewer from "../components/ModelViewer.vue";
import { fetchModelInfo } from "../api.js";
import { useI18n } from "../i18n.js";

const { t } = useI18n();
const modelInfo = ref({
  name: "谢远定数字分身模型",
  model_url: "",
  preview_url: "/assets/models/xieyuanding/preview.png",
  status: "building",
  description: "谢远定静态人物模型正在制作中，当前展示为占位版本。"
});

onMounted(async () => {
  modelInfo.value = await fetchModelInfo();
});
</script>
