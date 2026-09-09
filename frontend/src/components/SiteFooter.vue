<template>
  <footer class="site-footer">
    <p>{{ t("footerCopy") }}</p>
  </footer>
</template>

<script setup>
import { useI18n } from "../i18n.js";

const { t } = useI18n();
</script>
