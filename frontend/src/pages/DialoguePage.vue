<template>
  <section v-reveal class="page-hero dialogue-hero">
    <PageMotif variant="dialogue" />
    <p class="eyebrow">{{ copy.xieEyebrow }}</p>
    <h1>{{ copy.xieTitle }}</h1>
  </section>

  <section class="section home-feature-section xie-dialogue-section">
    <XieExhibition />
  </section>
</template>

<script setup>
import XieExhibition from "../components/XieExhibition.vue";
import { useXieExhibitionCopy } from "../components/xieExhibitionCopy.js";
import PageMotif from "../components/PageMotif.vue";
const copy = useXieExhibitionCopy();
</script>
