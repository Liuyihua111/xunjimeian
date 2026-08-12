<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" :aria-label="t('brandTitle')">
      <img class="brand-icon" src="/assets/images/meian-site-icon.png" alt="" width="42" height="42">
      <span>
        <span class="brand-title">{{ t("brandTitle") }}</span>
        <span class="brand-subtitle">{{ t("brandSubtitle") }}</span>
      </span>
    </RouterLink>
    <nav class="site-nav" aria-label="主导航">
      <RouterLink to="/" exact-active-class="current-page">{{ t("navHome") }}</RouterLink>
      <RouterLink to="/overview" active-class="current-page">{{ t("navOverview") }}</RouterLink>
      <RouterLink to="/context" active-class="current-page">{{ t("navContext") }}</RouterLink>
      <RouterLink to="/xie-yuanding" :class="{ 'current-page': isXieSection }">{{ t("navXie") }}</RouterLink>
      <div :class="['nav-dropdown', { 'current-page': isArchiveSection }]">
        <RouterLink class="nav-dropdown-trigger" to="/archive" active-class="current-page">
          {{ t("navArchive") }}
          <span class="nav-caret" aria-hidden="true">⌄</span>
        </RouterLink>
        <div class="nav-dropdown-menu" aria-label="历年成果年份">
          <RouterLink v-for="year in archiveYears" :key="year" :to="`/archive/${year}`">{{ year }}</RouterLink>
        </div>
      </div>
    </nav>
    <button class="lang-toggle" type="button" :aria-label="t('langLabel')" @click="toggleLang">{{ t("langButton") }}</button>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "../i18n.js";

const { t, toggleLang } = useI18n();
const route = useRoute();
const archiveYears = [2022, 2023, 2024, 2025, 2026];

const isXieSection = computed(() => route.name === "xie" || route.name === "dialogue");
const isArchiveSection = computed(() => route.name === "archive" || route.name === "archive-detail");
</script>
