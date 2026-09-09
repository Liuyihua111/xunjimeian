<template>
  <section v-reveal class="page-hero dialogue-hero">
    <PageMotif variant="dialogue" />
    <p class="eyebrow">{{ t("dialogueEyebrow") }}</p>
    <h1>{{ t("dialogueTitle") }}</h1>
    <p>{{ t("dialogueLede") }}</p>
  </section>

  <section class="section dialogue-workspace">
    <div v-reveal="80" class="avatar-panel">
      <div class="avatar-stage" :aria-label="t('avatarAlt')">
        <ModelViewer :info="modelInfo" :speech-active="speechActive" />
        <span class="model-badge">{{ t("modelBadge") }}</span>
      </div>
      <div class="model-notes">
        <h2>{{ t("modelTitle") }}</h2>
        <p>{{ t("modelText") }}</p>
      </div>
    </div>
    <ChatPanel @speech-active-change="handleSpeechActivity" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import ChatPanel from "../components/ChatPanel.vue";
import ModelViewer from "../components/ModelViewer.vue";
import PageMotif from "../components/PageMotif.vue";
import { useI18n } from "../i18n.js";

const { t } = useI18n();
const speechActive = ref(false);
const modelInfo = {
  name: "谢远定数字分身模型",
  model_url: "/assets/models/xieyuanding/xieyuanding_full.glb",
  preview_url: "/assets/models/xieyuanding/preview.png",
  status: "ready",
  description: "谢远定数字分身交互模型"
};

function handleSpeechActivity(active) {
  speechActive.value = active;
}
</script>
