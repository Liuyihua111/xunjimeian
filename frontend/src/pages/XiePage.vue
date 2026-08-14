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
          <ol class="profile-timeline">
            <li v-for="item in profileTimeline" :key="item.period">
              <strong>{{ item.period }}</strong>
              <span>{{ item.text }}</span>
            </li>
          </ol>
          <div class="profile-sources">
            <strong>{{ t("xieSourcesTitle") }}</strong>
            <a href="https://history.seu.edu.cn/2018/0326/c18671a210750/page.htm" target="_blank" rel="noreferrer">{{ t("xieSourceSeuhistory") }}</a>
            <a href="https://seuaa.seu.edu.cn/2008/0114/c1670a26729/page.htm" target="_blank" rel="noreferrer">{{ t("xieSourceSeuaa") }}</a>
            <a href="https://dsb.nanjing.gov.cn/xxcb/201306/t20130617_2084703.html" target="_blank" rel="noreferrer">{{ t("xieSourceNanjing") }}</a>
          </div>
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
import { computed, onMounted, ref } from "vue";
import ModelViewer from "../components/ModelViewer.vue";
import { fetchModelInfo } from "../api.js";
import { useI18n } from "../i18n.js";

const { t } = useI18n();
const profileTimeline = computed(() => [
  { period: t("xieProfilePeriod1"), text: t("xieProfilePoint1") },
  { period: t("xieProfilePeriod2"), text: t("xieProfilePoint2") },
  { period: t("xieProfilePeriod3"), text: t("xieProfilePoint3") },
  { period: t("xieProfilePeriod4"), text: t("xieProfilePoint4") },
  { period: t("xieProfilePeriod5"), text: t("xieProfilePoint5") }
]);
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
