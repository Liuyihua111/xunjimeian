<template>
  <article class="annual-feature-article">
    <header v-if="featureTitle" v-reveal class="annual-article-feature-heading">
      <p>{{ project.year }} · {{ isEnglish ? "Annual feature" : "年度特稿" }}</p>
      <h2>{{ featureTitle }}</h2>
    </header>

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

    <section
      v-if="isXieDialogueEntry"
      class="annual-result-entry"
      v-reveal="80"
      aria-labelledby="xie-dialogue-entry-title"
    >
      <div>
        <p>{{ isEnglish ? "2026 · Core digital outcome" : "2026 · 年度核心成果" }}</p>
        <h2 id="xie-dialogue-entry-title">{{ isEnglish ? "Xie Yuanding Digital Avatar" : "谢远定数字人" }}</h2>
        <span>{{ isEnglish
          ? "Explore the 3D representation, ask questions grounded in historical records, and inspect the evidence behind each answer."
          : "查看谢远定三维形象，围绕人物生平与团二大历史展开提问，并核验回答所依据的史料。"
        }}</span>
      </div>
      <RouterLink class="button primary" to="/xie-dialogue">
        {{ isEnglish ? "Talk with Xie Yuanding" : "与谢远定对话" }}
      </RouterLink>
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

        <blockquote v-else-if="block.type === 'quote'" v-reveal="blockRevealDelay(index)" class="annual-article-quote">
          {{ block.text }}
        </blockquote>

        <figure
          v-else-if="block.type === 'image'"
          v-reveal="blockRevealDelay(index)"
          :class="['annual-article-figure', `is-${block.ratio || 'wide'}`]"
        >
          <img v-if="block.path" :src="block.path" :alt="block.alt || block.caption || project.title" loading="lazy">
          <div v-else class="annual-article-media-placeholder" role="img" :aria-label="block.caption">
            <span>{{ block.placeholderLabel }}</span>
            <strong>{{ isEnglish ? "Image to be added" : "图片待补充" }}</strong>
          </div>
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

    <figure v-if="Number(project.year) === 2022" v-reveal class="annual-article-video">
      <video ref="footage" controls playsinline preload="metadata"
        src="/assets/video/meian-footage-20260913.mp4"
        poster="/assets/video/meian-footage-20260913.webp"
        :aria-label="isEnglish ? 'Social Practice' : '社会实践'"
        @error="videoFailed = true"></video>
      <figcaption>{{ isEnglish ? "Social Practice" : "社会实践" }}</figcaption>
      <p v-if="videoFailed" role="status">{{ isEnglish ? 'The video is temporarily unavailable.' : '视频暂时无法加载，请稍后重试' }}</p>
    </figure>

    <footer v-if="project.links?.length" v-reveal class="annual-article-footer">
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
import { computed, onBeforeUnmount, ref } from "vue";
import AnnualResultModal from "./AnnualResultModal.vue";
import { useI18n } from "../i18n.js";

const { isEnglish } = useI18n();
const footage = ref(null);
const videoFailed = ref(false);
onBeforeUnmount(() => {
  footage.value?.pause();
  footage.value?.removeAttribute("src");
  footage.value?.load();
});

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
function localizeBlock(block) {
  const localized = { ...block };
  if (isEnglish.value) {
    localized.text = block.text_en || block.text;
    localized.caption = block.caption_en || block.caption;
    localized.alt = block.alt_en || block.alt || localized.caption;
    localized.placeholderLabel = block.placeholder_label_en || block.placeholder_label;
  } else {
    localized.placeholderLabel = block.placeholder_label;
  }
  return localized;
}

const blocks = computed(() => (props.project.article_blocks || []).map(localizeBlock));
const leadBlock = computed(() => blocks.value[0]?.type === "paragraph" ? blocks.value[0] : null);
const remainingBlocks = computed(() => leadBlock.value ? blocks.value.slice(1) : blocks.value);
const isDownloadEntry = computed(() => props.project.embedded_result?.type === "download");
const isXieDialogueEntry = computed(() => Number(props.project.year) === 2026);
const featureTitle = computed(() => isEnglish.value
  ? props.project.feature_title_en || props.project.feature_title
  : props.project.feature_title);

function blockRevealDelay(index) {
  return (index % 4) * 80;
}

function openResult() {
  resultModal.value?.open();
}
</script>
