<template>
  <section class="page-hero">
    <p class="eyebrow">{{ t("overviewEyebrow") }}</p>
    <h1>{{ t("overviewTitle") }}</h1>
    <p>{{ t("overviewLede") }}</p>
  </section>

  <section class="section split">
    <div>
      <p class="large-text">{{ t("overviewLarge") }}</p>
    </div>
    <div class="timeline">
      <article class="timeline-item">
        <span>01</span>
        <h2>{{ t("overviewStep1Title") }}</h2>
        <p>{{ t("overviewStep1Text") }}</p>
      </article>
      <article class="timeline-item">
        <span>02</span>
        <h2>{{ t("overviewStep2Title") }}</h2>
        <p>{{ t("overviewStep2Text") }}</p>
      </article>
      <article class="timeline-item">
        <span>03</span>
        <h2>{{ t("overviewStep3Title") }}</h2>
        <p>{{ t("overviewStep3Text") }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "../i18n.js";

const { t } = useI18n();
</script>
