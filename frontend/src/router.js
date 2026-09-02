import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import MeianPage from "./pages/MeianPage.vue";
import CongressPage from "./pages/CongressPage.vue";
import DialoguePage from "./pages/DialoguePage.vue";
import ArchivePage from "./pages/ArchivePage.vue";
import ArchiveDetailPage from "./pages/ArchiveDetailPage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage, meta: { background: "digital" } },
  { path: "/overview", redirect: "/" },
  { path: "/context", redirect: "/meian" },
  { path: "/meian", name: "meian", component: MeianPage, meta: { background: "heritage" } },
  { path: "/cyl-congress", name: "congress", component: CongressPage, meta: { background: "heritage" } },
  { path: "/xie-yuanding", redirect: { path: "/", hash: "#home-xie-avatar" } },
  { path: "/xie-dialogue", name: "dialogue", component: DialoguePage, meta: { background: "digital" } },
  { path: "/meian-site", redirect: "/archive/2024" },
  { path: "/archive", name: "archive", component: ArchivePage, meta: { background: "digital" } },
  { path: "/archive/:year", name: "archive-detail", component: ArchiveDetailPage, meta: { background: "digital" } }
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 88 };
    }
    return { top: 0 };
  }
});
