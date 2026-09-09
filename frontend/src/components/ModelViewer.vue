<template>
  <FullModelViewer :speech-active="props.speechActive" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const FullModelViewer = defineAsyncComponent(() => import("./FullModelViewer.vue"));

const props = defineProps({
  info: {
    type: Object,
    required: true
  },
  speechActive: {
    type: Boolean,
    default: false
  }
});

</script>
