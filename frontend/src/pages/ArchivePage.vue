<template>
  <section v-reveal class="page-hero archive-hero">
    <PageMotif variant="archive" />
    <p class="eyebrow">{{ t("archiveEyebrow") }}</p>
    <h1>{{ t("archiveTitle") }}</h1>
    <p>{{ t("archiveLede") }}</p>
  </section>

  <section class="section archive-timeline-section">
    <div v-if="loading" class="archive-overview-grid" aria-live="polite" aria-busy="true">
      <article v-for="index in 3" :key="index" class="archive-overview-card archive-skeleton">
        <div class="archive-card-image"></div>
        <div class="archive-overview-body"><span></span><span></span><span></span></div>
      </article>
    </div>
    <div v-else-if="loadError" class="archive-state" role="status">
      <h2>{{ t("archiveErrorTitle") }}</h2>
      <p>{{ t("archiveErrorText") }}</p>
      <button class="button secondary" type="button" @click="loadProjects">{{ t("retry") }}</button>
    </div>
    <div class="archive-overview-grid" v-else-if="orderedProjects.length">
      <RouterLink
        v-for="project in orderedProjects"
        :key="project.year"
        :class="['archive-overview-card', { featured: project.year === 2026 }]"
        v-reveal="project.year === 2026 ? 0 : (2026 - project.year) * 80"
        :to="`/archive/${project.slug || project.year}`"
      >
        <div class="archive-card-image" :data-year="project.year">
          <img :src="coverImage(project).path" :alt="coverImage(project).title || project.title">
          <span class="archive-image-year" aria-hidden="true">{{ project.year }}</span>
        </div>
        <div class="archive-overview-body">
          <span class="archive-meta">{{ project.year }} · {{ project.directions?.join(" / ") }}</span>
          <h2>{{ project.title }}</h2>
          <p>{{ project.subtitle || project.summary }}</p>
          <div class="tag-row">
            <span v-for="output in project.outputs" :key="output">{{ output }}</span>
          </div>
          <span class="page-card-link">查看 {{ project.year }} 年成果</span>
        </div>
      </RouterLink>
    </div>
    <div v-else class="archive-state" role="status">
      <h2>{{ t("archiveEmptyTitle") }}</h2>
      <p>{{ t("archiveEmptyText") }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchProjects } from "../api.js";
import { useI18n } from "../i18n.js";
import PageMotif from "../components/PageMotif.vue";

const { t } = useI18n();
const projects = ref([]);
const loading = ref(true);
const loadError = ref(false);

const orderedProjects = computed(() => {
  const list = [...projects.value].sort((a, b) => b.year - a.year);
  const featured = list.find((project) => project.year === 2026);
  const rest = list.filter((project) => project.year !== 2026);
  return featured ? [featured, ...rest] : list;
});

function coverImage(project) {
  const images = project.images || [];
  const fallback = { title: project.title || "成果图片占位", path: "/assets/images/placeholder-media.svg" };
  return images[0] || fallback;
}

async function loadProjects() {
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

onMounted(loadProjects);
</script>
