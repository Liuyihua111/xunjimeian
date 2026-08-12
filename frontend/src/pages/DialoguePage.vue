<template>
  <section class="page-hero dialogue-hero">
    <p class="eyebrow">{{ t("dialogueEyebrow") }}</p>
    <h1>{{ t("dialogueTitle") }}</h1>
    <p>{{ t("dialogueLede") }}</p>
  </section>

  <section class="section dialogue-workspace">
    <div class="avatar-panel">
      <div class="avatar-stage" aria-label="谢远定数字人 3D 模型占位">
        <div class="avatar-grid"></div>
        <div class="avatar-figure">
          <span class="avatar-head"></span>
          <span class="avatar-coat"></span>
          <span class="avatar-stand"></span>
        </div>
        <span class="model-badge">{{ t("modelBadge") }}</span>
      </div>
      <div class="model-notes">
        <h2>{{ t("modelTitle") }}</h2>
        <p>{{ t("modelText") }}</p>
      </div>
    </div>
    <ChatPanel />
  </section>
</template>

<script setup>
import ChatPanel from "../components/ChatPanel.vue";
import { useI18n } from "../i18n.js";

const { t } = useI18n();
</script>
