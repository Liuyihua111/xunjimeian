<template>
  <section v-if="loading" class="page-hero archive-detail-hero" aria-live="polite" aria-busy="true">
    <p class="eyebrow">{{ t("archiveLoading") }}</p>
    <div class="detail-title-skeleton"></div>
  </section>

  <section v-else-if="loadError" class="page-hero archive-detail-hero archive-state" role="status">
    <p class="eyebrow">{{ t("archiveEyebrow") }}</p>
    <h1>{{ t("archiveErrorTitle") }}</h1>
    <p>{{ t("archiveErrorText") }}</p>
    <button class="button secondary" type="button" @click="loadProject">{{ t("retry") }}</button>
  </section>

  <section v-else v-reveal :class="['page-hero archive-detail-hero', { featured: project?.year === 2026 }]" :data-year="project?.year">
    <PageMotif v-if="project" :variant="`year-${project.year}`" class="annual-motif" />
    <p class="eyebrow">{{ project ? `${project.year} · ${project.directions?.join(" / ")}` : "成果详情" }}</p>
    <h1>{{ project?.title || "年度成果加载中" }}</h1>
    <p>{{ project?.subtitle || project?.summary || "正在读取年度成果内容。" }}</p>
    <div class="page-actions">
      <RouterLink class="button secondary" to="/archive">返回五年成果总览</RouterLink>
      <RouterLink v-if="project?.year === 2026" class="button primary" to="/xie-dialogue">与谢远定对话</RouterLink>
    </div>
  </section>

  <AnnualFeatureArticle
    v-if="project && isEditorialYear"
    :project="project"
    :show-embedded-result="showEmbeddedResult"
  />

  <section v-if="project && !isEditorialYear" v-reveal="80" class="section archive-detail-layout">
    <div :class="['archive-detail-media', { single: visibleImages.length === 1 }]">
      <img
        v-for="image in visibleImages"
        :key="image.path"
        :src="image.path"
        :alt="image.title || project.title"
      >
    </div>

    <div class="archive-detail-content">
      <article class="info-panel">
        <p class="eyebrow">年度简介</p>
        <p>{{ project.summary }}</p>
      </article>

      <article class="compact-card">
        <h2>主要成果</h2>
        <div class="tag-row">
          <span v-for="item in project.highlights || project.outputs" :key="item">{{ item }}</span>
        </div>
      </article>

      <article class="compact-card">
        <h2>实践信息</h2>
        <dl class="detail-list archive-detail-list">
          <dt>实践地点</dt>
          <dd>{{ project.cities?.join(" / ") || "待补充" }}</dd>
          <dt>成果形式</dt>
          <dd>{{ project.outputs?.join(" / ") || "待补充" }}</dd>
          <dt>继承价值</dt>
          <dd>{{ project.inheritance_value || project.reusable_assets }}</dd>
        </dl>
      </article>
    </div>
  </section>

  <section v-if="project && !isEditorialYear" v-reveal="120" class="section detail-section-grid">
    <article v-for="(section, index) in project.detail_sections" :key="section.title" v-reveal="index * 90" class="intro-block">
      <p class="eyebrow">{{ project.year }}</p>
      <h2>{{ section.title }}</h2>
      <p>{{ section.body }}</p>
    </article>
  </section>

  <section v-if="project && !isEditorialYear" v-reveal="140" class="section archive-links-section">
    <div class="section-heading">
      <p class="eyebrow">成果链接</p>
      <h2>继续查看相关成果</h2>
    </div>
    <div class="archive-link-row">
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
      <span v-if="!project.links?.length" class="archive-link-placeholder">成果链接后续补充</span>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchProjects } from "../api.js";
import { useI18n } from "../i18n.js";
import PageMotif from "../components/PageMotif.vue";
import AnnualFeatureArticle from "../components/AnnualFeatureArticle.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const projects = ref([]);
const loading = ref(true);
const loadError = ref(false);

const project = computed(() => {
  const slug = String(route.params.year || "");
  return projects.value.find((item) => String(item.slug || item.year) === slug);
});

const isEditorialYear = computed(() => {
  const year = Number(project.value?.year);
  return year >= 2022 && year <= 2025 && Boolean(project.value?.article_blocks?.length);
});

const yearsWithoutEmbeddedResult = new Set([2022, 2025]);
const showEmbeddedResult = computed(() => !yearsWithoutEmbeddedResult.has(Number(project.value?.year)));

const visibleImages = computed(() => {
  const images = project.value?.images || [];
  const validImages = images.filter((image) => image?.path).slice(0, 2);
  return validImages.length ? validImages : [{ title: project.value?.title || "成果图片占位", path: "/assets/images/placeholder-media.svg" }];
});

async function loadProject() {
  loading.value = true;
  loadError.value = false;
  try {
    const data = await fetchProjects();
    projects.value = data.results || [];
  } catch (error) {
    loadError.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(loadProject);

watch(projects, () => {
  if (projects.value.length && !project.value) {
    router.replace("/archive");
  }
});
</script>
