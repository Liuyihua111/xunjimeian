<template>
  <section class="page-hero">
    <p class="eyebrow">{{ t("contextEyebrow") }}</p>
    <h1>{{ t("contextTitle") }}</h1>
    <p>{{ t("contextLede") }}</p>
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

  <section class="section">
    <article class="info-panel accent">
      <h2>{{ t("contextXieTitle") }}</h2>
      <p>{{ t("contextXieText") }}</p>
    </article>
  </section>
</template>

<script setup>
import { useI18n } from "../i18n.js";

const { t } = useI18n();
</script>
