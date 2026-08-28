<template>
  <SiteCursor />
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>

<script setup>
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteCursor from "./components/SiteCursor.vue";
</script>
