<template>
  <header :class="['site-header', { 'is-scrolled': isScrolled, 'menu-open': menuOpen }]">
    <RouterLink class="brand" to="/" :aria-label="t('brandTitle')">
      <img class="brand-icon" src="/assets/images/seu-emblem.png" alt="" width="58" height="58">
      <span>
        <span class="brand-title">{{ t("brandTitle") }}</span>
        <span class="brand-subtitle">{{ t("brandSubtitle") }}</span>
      </span>
    </RouterLink>
    <button
      class="nav-toggle"
      type="button"
      :aria-label="t('navMenu')"
      :aria-expanded="menuOpen"
      aria-controls="primary-navigation"
      @click="menuOpen = !menuOpen"
    >
      <span aria-hidden="true">{{ menuOpen ? "×" : "≡" }}</span>
      <span>{{ t("navMenu") }}</span>
    </button>
    <nav id="primary-navigation" :class="['site-nav', { open: menuOpen }]" aria-label="主导航" @click="menuOpen = false">
      <RouterLink to="/" exact-active-class="current-page">{{ t("navHome") }}</RouterLink>
      <RouterLink to="/meian" active-class="current-page">{{ t("navMeian") }}</RouterLink>
      <RouterLink to="/cyl-congress" active-class="current-page">{{ t("navCongress") }}</RouterLink>
      <div :class="['nav-dropdown', { 'current-page': isArchiveSection }]">
        <RouterLink class="nav-dropdown-trigger" to="/archive" active-class="current-page">
          {{ t("navArchive") }}
          <span class="nav-caret" aria-hidden="true">⌄</span>
        </RouterLink>
        <div class="nav-dropdown-menu" aria-label="历年成果年份">
          <RouterLink to="/archive">{{ t("archiveOverviewLink") }}</RouterLink>
          <RouterLink v-for="year in archiveYears" :key="year" :to="`/archive/${year}`">{{ year }}</RouterLink>
        </div>
      </div>
    </nav>
    <button class="lang-toggle" type="button" :aria-label="t('langLabel')" @click="toggleLang">{{ t("langButton") }}</button>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "../i18n.js";

const { t, toggleLang } = useI18n();
const route = useRoute();
const menuOpen = ref(false);
const isScrolled = ref(false);
const archiveYears = [2022, 2023, 2024, 2025, 2026];

const isArchiveSection = computed(() => route.name === "archive" || route.name === "archive-detail");

watch(() => route.fullPath, () => {
  menuOpen.value = false;
});

function updateHeaderState() {
  isScrolled.value = window.scrollY > 24;
}

onMounted(() => {
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateHeaderState);
});
</script>
