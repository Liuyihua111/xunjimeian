<template>
  <section class="page-hero context-hero">
    <PageMotif variant="context" />
    <p class="eyebrow">{{ t("contextEyebrow") }}</p>
    <h1>{{ t("contextTitle") }}</h1>
    <p>{{ t("contextLede") }}</p>
  </section>

  <section class="section context-stories">
    <article class="context-story context-story-meian">
      <figure class="context-media">
        <img src="/assets/images/meian-exterior-official.jpg" :alt="t('meianImageAlt')">
        <figcaption>{{ t("meianPhotoNote") }}</figcaption>
      </figure>
      <div class="context-copy">
        <p class="context-label">{{ t("meianEyebrow") }}</p>
        <h2>{{ t("meianTitle") }}</h2>
        <p>{{ t("meianText") }}</p>
        <p>{{ t("meianTextMore") }}</p>
        <a class="text-link" href="https://history.seu.edu.cn/2023/0822/c18650a456949/page.htm" target="_blank" rel="noreferrer">{{ t("officialSource") }}</a>
      </div>
    </article>

    <article class="context-story context-story-congress">
      <div class="context-copy">
        <p class="context-label">{{ t("tuanEyebrow") }}</p>
        <h2>{{ t("tuanTitle") }}</h2>
        <p>{{ t("tuanText") }}</p>
        <p>{{ t("tuanTextMore") }}</p>
        <a class="text-link" href="https://www.seu.edu.cn/2021/0701/c124a376375/page.htm" target="_blank" rel="noreferrer">{{ t("officialSource") }}</a>
      </div>
      <figure class="context-media context-media-mark">
        <img src="/assets/images/meian-historical-official.png" :alt="t('tuanImageAlt')">
        <figcaption>{{ t("tuanPhotoNote") }}</figcaption>
      </figure>
    </article>
  </section>
</template>

<script setup>
import PageMotif from "../components/PageMotif.vue";
import { useI18n } from "../i18n.js";

const { t } = useI18n();
</script>
