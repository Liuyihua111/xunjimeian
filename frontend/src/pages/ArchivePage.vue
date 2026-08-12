<template>
  <section class="page-hero">
    <p class="eyebrow">{{ t("archiveEyebrow") }}</p>
    <h1>{{ t("archiveTitle") }}</h1>
    <p>{{ t("archiveLede") }}</p>
  </section>

  <section class="section archive-timeline-section">
    <div class="archive-overview-grid" v-if="orderedProjects.length">
      <RouterLink
        v-for="project in orderedProjects"
        :key="project.year"
        :class="['archive-overview-card', { featured: project.year === 2026 }]"
        :to="`/archive/${project.slug || project.year}`"
      >
        <div class="archive-card-image">
          <img :src="coverImage(project).path" :alt="coverImage(project).title || project.title">
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
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchProjects } from "../api.js";
import { useI18n } from "../i18n.js";

const { t } = useI18n();
const projects = ref([]);

const orderedProjects = computed(() => {
  const list = [...projects.value].sort((a, b) => a.year - b.year);
  const featured = list.find((project) => project.year === 2026);
  const rest = list.filter((project) => project.year !== 2026);
  return featured ? [featured, ...rest] : list;
});

function coverImage(project) {
  const images = project.images || [];
  return images[0] || { title: project.title || "成果图片占位", path: "/assets/images/placeholder-media.svg" };
}

onMounted(async () => {
  const data = await fetchProjects();
  projects.value = data.results || [];
});
</script>
