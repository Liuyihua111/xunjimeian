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

test("archive overview keeps 2026 featured and orders earlier years newest first", () => {
  const page = read("src/pages/ArchivePage.vue");

  assert.match(page, /sort\(\(a, b\) => b\.year - a\.year\)/);
  assert.match(page, /featured \? \[featured, \.\.\.rest\] : list/);
});

test("home page separates the avatar and gallery with a quiet chapter marker", () => {
  const page = read("src/pages/HomePage.vue");

  assert.match(page, /home-section-divider/);
  assert.match(page, /home-divider-seal[^>]*>梅</);
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

test("only the 2023 editorial page keeps its embedded annual result entry", () => {
  const detailPage = read("src/pages/ArchiveDetailPage.vue");
  const article = read("src/components/AnnualFeatureArticle.vue");

  assert.match(detailPage, /const yearsWithoutEmbeddedResult = new Set\(\[2022, 2024, 2025\]\)/);
  assert.match(detailPage, /:show-embedded-result="showEmbeddedResult"/);
  assert.match(article, /v-if="showEmbeddedResult" class="annual-result-entry"/);
  assert.match(article, /v-if="showEmbeddedResult"\s+ref="resultModal"/);
});
