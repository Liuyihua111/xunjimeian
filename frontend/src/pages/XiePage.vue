<template>
  <section class="page-hero">
    <p class="eyebrow">{{ t("xieEyebrow") }}</p>
    <h1>{{ t("xieTitle") }}</h1>
    <div class="page-actions">
      <RouterLink class="button primary" to="/xie-dialogue">{{ t("xieTalk") }}</RouterLink>
    </div>
  </section>

  <section class="section split model-layout">
    <ModelViewer :info="modelInfo" />
    <div class="xie-accordion-stack">
      <p class="accordion-hint">{{ t("xieMoreHint") }}</p>
      <details class="xie-accordion">
        <summary>
          <span>
            <small>{{ t("xieProfileKicker") }}</small>
            <strong>{{ t("xieProfileTitle") }}</strong>
            <em>{{ t("xieProfileSummary") }}</em>
          </span>
          <span class="accordion-action">{{ t("viewMore") }}</span>
        </summary>
        <div class="accordion-content">
          <p>{{ t("xieProfileText") }}</p>
          <ul>
            <li>{{ t("xieProfilePoint1") }}</li>
            <li>{{ t("xieProfilePoint2") }}</li>
            <li>{{ t("xieProfilePoint3") }}</li>
          </ul>
        </div>
      </details>
      <details class="xie-accordion">
        <summary>
          <span>
            <small>{{ t("xieAbilityKicker") }}</small>
            <strong>{{ t("xieAbilityTitle") }}</strong>
            <em>{{ t("xieAbilitySummary") }}</em>
          </span>
          <span class="accordion-action">{{ t("viewMore") }}</span>
        </summary>
        <div class="accordion-content">
          <p>{{ t("xieAbilityText") }}</p>
          <ul>
            <li>{{ t("xieAbilityPoint1") }}</li>
            <li>{{ t("xieAbilityPoint2") }}</li>
            <li>{{ t("xieAbilityPoint3") }}</li>
          </ul>
        </div>
      </details>
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
