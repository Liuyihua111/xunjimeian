<template>
  <article class="annual-feature-article">
    <div v-reveal class="annual-article-lede">
      <p>{{ leadBlock?.text || project.summary }}</p>
    </div>

    <section v-if="showEmbeddedResult" class="annual-result-entry" v-reveal="80" aria-labelledby="annual-result-entry-title">
      <div>
        <p>{{ project.year }} · 年度数字成果</p>
        <h2 id="annual-result-entry-title">{{ project.embedded_result.title }}</h2>
        <span>{{ project.embedded_result.description }}</span>
        <p v-if="project.embedded_result.meta" class="annual-result-entry-meta">
          {{ project.embedded_result.meta }}
        </p>
      </div>
      <a
        v-if="isDownloadEntry"
        class="button primary"
        :href="project.embedded_result.external_url"
        download
        rel="noopener"
        referrerpolicy="no-referrer"
      >
        {{ project.embedded_result.action_label || "下载 Windows 体验版" }}
      </a>
      <button v-else class="button primary" type="button" @click="openResult">
        查看年度数字成果
      </button>
    </section>

    <div class="annual-article-flow">
      <template v-for="(block, index) in remainingBlocks" :key="`${block.type}-${index}`">
        <header v-if="block.type === 'section_heading'" v-reveal="blockRevealDelay(index)" class="annual-article-section-title">
          <span v-if="block.index">{{ block.index }}</span>
          <h2>{{ block.text }}</h2>
        </header>

        <p v-else-if="block.type === 'paragraph'" v-reveal="blockRevealDelay(index)" class="annual-article-paragraph">
          {{ block.text }}
        </p>

        <figure v-else-if="block.type === 'image'" v-reveal="blockRevealDelay(index)" class="annual-article-figure">
          <img :src="block.path" :alt="block.alt || block.caption || project.title" loading="lazy">
          <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
        </figure>

        <div
          v-else-if="block.type === 'image_group'"
          v-reveal="blockRevealDelay(index)"
          :class="['annual-article-image-group', `columns-${block.columns || 2}`]"
        >
          <figure v-for="image in block.images" :key="image.path">
            <img :src="image.path" :alt="image.alt || image.caption || project.title" loading="lazy">
            <figcaption v-if="image.caption">{{ image.caption }}</figcaption>
          </figure>
        </div>

        <p v-else-if="block.type === 'caption'" v-reveal="blockRevealDelay(index)" class="annual-article-standalone-caption">
          {{ block.text }}
        </p>

        <a
          v-else-if="block.type === 'link'"
          v-reveal="blockRevealDelay(index)"
          class="annual-article-inline-link"
          :href="block.url"
          target="_blank"
          rel="noreferrer"
        >
          {{ block.text }}
        </a>
      </template>
    </div>

    <footer v-reveal class="annual-article-footer">
      <p>相关成果与原报道</p>
      <div>
        <a
          v-for="link in project.links"
          :key="link.url"
          class="button secondary"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.title }}
        </a>
      </div>
    </footer>

    <AnnualResultModal
      v-if="showEmbeddedResult && !isDownloadEntry"
      ref="resultModal"
      :result="project.embedded_result"
      :year="project.year"
    />
  </article>
</template>

<script setup>
import { computed, ref } from "vue";
import AnnualResultModal from "./AnnualResultModal.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  showEmbeddedResult: {
    type: Boolean,
    default: true
  }
});

const resultModal = ref(null);
const blocks = computed(() => props.project.article_blocks || []);
const leadBlock = computed(() => blocks.value[0]?.type === "paragraph" ? blocks.value[0] : null);
const remainingBlocks = computed(() => leadBlock.value ? blocks.value.slice(1) : blocks.value);
const isDownloadEntry = computed(() => props.project.embedded_result?.type === "download");

function blockRevealDelay(index) {
  return (index % 4) * 80;
}

function openResult() {
  resultModal.value?.open();
}
</script>
