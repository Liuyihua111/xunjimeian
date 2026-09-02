import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("site header uses the official university lockup", () => {
  const header = read("src/components/SiteHeader.vue");
  const i18n = read("src/i18n.js");
  const styles = read("src/styles.css");

  assert.match(header, /seu-emblem\.png/);
  assert.match(header, /width="58" height="58"/);
  assert.match(i18n, /brandTitle:\s*"东南大学"/);
  assert.match(i18n, /brandSubtitle:\s*"SOUTHEAST UNIVERSITY"/);
  assert.match(header, /window\.scrollY > 24/);
  assert.match(header, /is-scrolled/);
  assert.match(styles, /\.site-header \.brand-icon \{[\s\S]*?width:\s*58px;[\s\S]*?height:\s*58px;/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.site-header \.brand-icon \{ width: 44px; height: 44px; \}/);
});

test("formal body typography keeps the heritage title hierarchy", () => {
  const typography = read("src/heritage-type.css");
  const styles = read("src/styles.css");

  assert.match(typography, /--font-content:\s*var\(--font-ui\);/);
  assert.match(typography, /--font-numeral:\s*var\(--font-ui\);/);
  assert.match(typography, /html:lang\(en\) body\s*\{\s*font-family:\s*var\(--font-ui\);/);
  assert.match(typography, /html:lang\(zh-CN\) h1\s*\{\s*font-family:\s*var\(--font-brush\);/);
  assert.match(typography, /html:lang\(zh-CN\) h2,[\s\S]*?font-family:\s*var\(--font-display\);/);
  assert.match(styles, /\.heritage-timeline time\s*\{[\s\S]*?font-family:\s*var\(--font-ui\);/);
});

test("archive overview keeps 2026 featured and orders earlier years newest first", () => {
  const page = read("src/pages/ArchivePage.vue");

  assert.match(page, /sort\(\(a, b\) => b\.year - a\.year\)/);
  assert.match(page, /featured \? \[featured, \.\.\.rest\] : list/);
});

test("home page connects the hero, avatar, and gallery as tracked chapters", () => {
  const page = read("src/pages/HomePage.vue");
  const styles = read("src/styles.css");

  assert.match(page, /home-chapter-preview/);
  assert.match(page, /home-chapter-watermark[^>]*>01</);
  assert.match(page, /home-chapter-watermark[^>]*>02</);
  assert.match(page, /home-section-divider/);
  assert.match(page, /home-divider-path-desktop/);
  assert.match(page, /home-divider-path-mobile/);
  assert.match(page, /home-divider-branch/);
  assert.match(page, /home-divider-blossom/);
  assert.match(page, /home-divider-building/);
  assert.doesNotMatch(page, /context-meian-meeting\.webp/);
  assert.match(page, /quickXie:\s*"谢远定数字人"/);
  assert.match(page, /quickGallery:\s*"数字梅庵展馆"/);
  assert.match(page, /quickXie:\s*"Xie Yuanding Avatar"/);
  assert.match(page, /quickGallery:\s*"Digital Mei'an"/);
  assert.match(page, /activeChapter === 'home-xie-avatar'/);
  assert.match(page, /activeChapter === 'home-digital-meian'/);
  assert.match(page, /IntersectionObserver/);
  assert.match(styles, /\.home-chapter-preview\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none;/);
  assert.match(styles, /\.home-divider-branch,[\s\S]*?stroke-dashoffset:\s*1;/);
  assert.match(styles, /\.home-section-divider\.is-reveal-visible \.home-divider-branch,[\s\S]*?stroke-dashoffset:\s*0;/);
  assert.match(styles, /\.home-xie-grid \.model-fallback\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none;/);
  assert.match(styles, /\.home-gallery-frame\s*\{[\s\S]*?border:\s*0;[\s\S]*?box-shadow:\s*none;/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.home-divider-branch,[\s\S]*?stroke-dashoffset:\s*0;[\s\S]*?\.home-section-divider\.is-reveal-visible \.home-divider-blossom\s*\{\s*animation:\s*none;/);
});

test("chat panel keeps the window label without the secondary interview title", () => {
  const chatPanel = read("src/components/ChatPanel.vue");

  assert.match(chatPanel, /t\("chatWindow"\)/);
  assert.doesNotMatch(chatPanel, /t\("chatTitle"\)/);
});

test("Mei'an page exposes the complete exhibition sequence and local news video", () => {
  const page = read("src/pages/MeianPage.vue");

  for (const id of ["meian-profile", "meian-origin", "meian-spirit", "meian-timeline", "meian-today", "meian-video"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.match(page, /meian-nanjing-news\.mp4/);
  assert.doesNotMatch(page, /li-ruiqing-statue/);
});

test("Second CYL Congress page exposes the complete exhibition sequence", () => {
  const page = read("src/pages/CongressPage.vue");

  for (const id of ["congress-overview", "congress-background", "congress-preparation", "congress-agenda", "congress-relations", "congress-archives", "congress-legacy"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.match(page, /heritage-gallery-ideas/);
  assert.doesNotMatch(page, /marxism-exhibit/);
});

test("the 2023 exhibit and 2024 Windows VR download keep annual result entries", () => {
  const detailPage = read("src/pages/ArchiveDetailPage.vue");
  const article = read("src/components/AnnualFeatureArticle.vue");
  const projects = read("public/assets/data/projects.json");

  assert.match(detailPage, /const yearsWithoutEmbeddedResult = new Set\(\[2022, 2025\]\)/);
  assert.match(detailPage, /:show-embedded-result="showEmbeddedResult"/);
  assert.match(article, /v-if="showEmbeddedResult" class="annual-result-entry"/);
  assert.match(article, /v-if="isDownloadEntry"/);
  assert.match(article, /download/);
  assert.match(article, /v-if="showEmbeddedResult && !isDownloadEntry"\s+ref="resultModal"/);
  assert.match(projects, /meian-windows-demo-2024\.zip/);
  assert.match(projects, /Windows 体验版 · 约 12\.2GB/);
});

test("inner routes use responsive heritage and digital background layers", () => {
  const app = read("src/App.vue");
  const router = read("src/router.js");
  const background = read("src/components/SitePageBackground.vue");
  const styles = read("src/styles.css");

  assert.match(app, /SitePageBackground :variant="backgroundVariant"/);
  assert.match(router, /name: "home"[\s\S]*?background: "digital"/);
  assert.match(router, /name: "meian"[\s\S]*?background: "heritage"/);
  assert.match(router, /name: "congress"[\s\S]*?background: "heritage"/);
  assert.match(router, /name: "dialogue"[\s\S]*?background: "digital"/);
  assert.match(router, /name: "archive-detail"[\s\S]*?background: "digital"/);
  assert.match(background, /Math\.min\(window\.scrollY \* 0\.018, 24\)/);
  assert.match(background, /prefers-reduced-motion: no-preference/);
  assert.match(styles, /inner-heritage-desktop-wide-20260901\.webp/);
  assert.match(styles, /inner-heritage-mobile-20260901\.webp/);
  assert.match(styles, /inner-digital-desktop-20260901\.webp/);
  assert.match(styles, /inner-digital-mobile-20260901\.webp/);
  assert.match(styles, /context-hero > \.page-motif-context img \{[\s\S]*?object-fit:\s*contain;/);
});
