import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import OverviewPage from "./pages/OverviewPage.vue";
import ContextPage from "./pages/ContextPage.vue";
import XiePage from "./pages/XiePage.vue";
import DialoguePage from "./pages/DialoguePage.vue";
import ArchivePage from "./pages/ArchivePage.vue";
import ArchiveDetailPage from "./pages/ArchiveDetailPage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/overview", name: "overview", component: OverviewPage },
  { path: "/context", name: "context", component: ContextPage },
  { path: "/xie-yuanding", name: "xie", component: XiePage },
  { path: "/xie-dialogue", name: "dialogue", component: DialoguePage },
  { path: "/meian-site", redirect: "/archive/2024" },
  { path: "/archive", name: "archive", component: ArchivePage },
  { path: "/archive/:year", name: "archive-detail", component: ArchiveDetailPage }
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});
