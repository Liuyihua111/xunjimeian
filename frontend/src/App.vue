<template>
  <SiteCursor />
  <SiteHeader />
  <main :class="['site-main', backgroundVariant && 'has-inner-background']">
    <SitePageBackground :variant="backgroundVariant" />
    <RouterView />
  </main>
  <SiteFooter />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteCursor from "./components/SiteCursor.vue";
import SitePageBackground from "./components/SitePageBackground.vue";

const route = useRoute();
const backgroundVariant = computed(() => route.meta.background || "");
</script>
