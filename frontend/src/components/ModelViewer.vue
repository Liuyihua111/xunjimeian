<template>
  <FullModelViewer />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const FullModelViewer = defineAsyncComponent(() => import("./FullModelViewer.vue"));

defineProps({
  info: {
    type: Object,
    required: true
  }
});

</script>
