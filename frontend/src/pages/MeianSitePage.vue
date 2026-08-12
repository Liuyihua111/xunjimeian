<template>
  <section class="page-hero">
    <p class="eyebrow">{{ t("siteEyebrow") }}</p>
    <h1>{{ t("siteTitle") }}</h1>
    <p>{{ t("siteLede") }}</p>
  </section>

  <section class="section">
    <div class="site-placeholder">
      <div class="building-sketch" aria-label="梅庵旧址建筑示意">
        <span class="roof"></span>
        <span class="wall"></span>
        <span class="door"></span>
        <span class="window left"></span>
        <span class="window right"></span>
      </div>
      <div>
        <p class="eyebrow">{{ t("sitePlaceholder") }}</p>
        <h2>{{ t("siteAssetTitle") }}</h2>
        <p>{{ t("siteAssetText") }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="feature-grid two">
      <article class="compact-card">
        <h2>{{ t("siteGuideTitle") }}</h2>
        <p>{{ t("siteGuideText") }}</p>
      </article>
      <article class="compact-card">
        <h2>{{ t("siteDigitalTitle") }}</h2>
        <p>{{ t("siteDigitalText") }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "../i18n.js";

const { t } = useI18n();
</script>
