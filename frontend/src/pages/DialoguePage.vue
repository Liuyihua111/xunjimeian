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
        <img class="dialogue-portrait" src="/assets/projects/2026/xie-yuanding-portrait.jpg" :alt="t('avatarAlt')">
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
import PageMotif from "../components/PageMotif.vue";
import { useI18n } from "../i18n.js";

const { t } = useI18n();
</script>
