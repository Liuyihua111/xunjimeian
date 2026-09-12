import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const pngSize = (path) => {
  const data = readFileSync(new URL(`../${path}`, import.meta.url));
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
};

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

test("annual archive titles use the agreed theme names and omit the 2026 hero watermark", () => {
  const projects = JSON.parse(read("public/assets/data/projects.json")).results;
  const copy = read("src/i18n.js");
  const styles = read("src/styles.css");
  const expectedTitles = new Map([
    [2022, "寻迹梅庵，薪火相传"],
    [2023, "数字化视域下“团二大”红色历史的时空对话"],
    [2024, "元宇宙视域下“团二大”红色历史的“交互式”时空建构"],
    [2025, "AI浪潮下团二大红色历史的青年叙事"],
    [2026, "数智赋能人物新生"]
  ]);

  for (const project of projects) {
    assert.equal(project.title, expectedTitles.get(project.year));
  }
  assert.match(copy, /五年实践成果在此汇聚/);
  assert.doesNotMatch(copy, /逐年查看/);
  assert.match(copy, /five years of practice come together/);
  assert.doesNotMatch(styles, /\.archive-detail-hero\.featured::after/);
});

test("hero-texture paper cuts match the opening image paper and fade a complete Mei'an card", () => {
  for (const variant of ["", "-mobile"]) {
    const svg = read(`public/assets/images/meian-paper-cut-hero-texture${variant}-20260909.svg`);
    assert.match(svg, /id="paper-foundation" fill="#f3f1ec"/);
    assert.match(svg, /id="hero-paper-texture"/);
    assert.match(svg, /id="paper-texture-layer"/);
    assert.match(svg, /id="meian-pattern-card"[^>]*data-fade-depth="75%"/);
    assert.match(svg, /id="faded-meian-pattern" mask="url\(#pattern-inward-fade\)"/);
    assert.match(svg, /<use href="#meian-pattern-card"/);
    assert.match(svg, /id="watercolor-paper"/);
    assert.match(svg, /<feTurbulence/);
    assert.match(svg, /<feDisplacementMap/);
    assert.match(svg, /id="octagonal-window"/);
    assert.match(svg, /id="entrance"/);
    assert.match(svg, /id="meian-plaque"/);
    assert.match(svg, /id="straight-architectural-edge"/);
    assert.ok((svg.match(/<linearGradient\b/g) || []).length >= 3);
    assert.doesNotMatch(svg, /<(?:text|animate|script|feDropShadow)\b/);
    assert.match(svg, /href="data:image\/png;base64,/);
    assert.doesNotMatch(svg, /href="https?:/);
    const card = svg.split('id="meian-pattern-card"')[1]?.split('</g>')[0] || "";
    assert.doesNotMatch(card, /\bstroke=/);
  }
});

test("home page connects four tracked exhibition chapters and opens the model on demand", () => {
  const page = read("src/pages/HomePage.vue");
  const styles = read("src/styles.css");
  assert.match(page, /home-archive-background-dongda-meian-gate-calligraphy-20260910\.png/);
  assert.match(page, /home-archive-background-dongda-meian-mobile-gate-calligraphy-20260910\.png/);
  assert.deepEqual(pngSize("public/assets/images/home-archive-background-dongda-meian-gate-calligraphy-20260910.png"), [1672, 941]);
  assert.deepEqual(pngSize("public/assets/images/home-archive-background-dongda-meian-mobile-gate-calligraphy-20260910.png"), [941, 1672]);

  assert.match(page, /home-chapter-preview/);
  assert.match(page, /home-chapter-preview-band/);
  assert.match(page, /home-layered-scroll/);
  assert.match(page, /home-foreground-sheet/);
  assert.match(page, /home-foreground-body/);
  assert.match(page, /home-meian-page-turn/);
  assert.match(page, /meian-paper-cut-hero-texture-20260909\.svg/);
  assert.match(page, /meian-paper-cut-hero-texture-mobile-20260909\.svg/);
  assert.doesNotMatch(page, /home-meian-transition-lines/);
  assert.doesNotMatch(page, />梅庵<\/text>/);
  assert.doesNotMatch(page, /home-hero-silhouette/);
  assert.match(page, /home-chapter-watermark[^>]*>01</);
  assert.match(page, /home-chapter-watermark[^>]*>02</);
  assert.match(page, /home-chapter-watermark[^>]*>03</);
  assert.match(page, /home-chapter-watermark[^>]*>04</);
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
  assert.match(page, /quickDocumentary:\s*"团二大纪录片"/);
  assert.match(page, /quickSong:\s*"梅庵歌曲"/);
  for (const id of ["home-xie-avatar", "home-digital-meian", "home-congress-documentary", "home-meian-song"]) {
    assert.match(page, new RegExp(id));
  }
  assert.match(page, /HomeMediaDivider v-reveal variant="gallery-documentary"/);
  assert.match(page, /HomeMediaDivider v-reveal variant="documentary-song"/);
  assert.match(page, /跨时空数字人短片：《谢远定：从梅庵出发》/);
  assert.match(page, /Across-Time Digital Avatar Short Film: Xie Yuanding, Setting Out from Mei'an/);
  assert.match(page, /ChatPanel :show-status="false"/);
  assert.match(page, /home-avatar-video-stage/);
  assert.match(page, /xie-yuanding-feature-20260912\.mp4/);
  assert.match(page, /controls[\s\S]*?playsinline[\s\S]*?preload="metadata"/);
  assert.match(page, /HomeSongArchive :tracks="songTracks"/);
  assert.match(page, /const songTrackLibrary = \[/);
  assert.match(page, /modelMounted/);
  assert.match(page, /ModelViewer v-if="modelMounted"/);
  assert.match(page, /function openModel\(\)/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /profileCloseButton\.value\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(page, /profileTrigger\.value\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(page, /function lockModalScroll\(\)/);
  assert.match(page, /function unlockModalScroll\(\)/);
  assert.match(styles, /\.home-chapter-preview\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none;/);
  assert.match(styles, /\.home-layered-scroll\s*\{[\s\S]*?isolation:\s*isolate;/);
  assert.match(styles, /\.home-official-hero\s*\{[\s\S]*?position:\s*sticky;[\s\S]*?top:\s*0;[\s\S]*?height:\s*100dvh;/);
  assert.match(styles, /\.home-foreground-sheet\s*\{[\s\S]*?position:\s*relative;[\s\S]*?z-index:\s*3;[\s\S]*?background:\s*transparent;/);
  assert.match(styles, /\.home-foreground-body\s*\{[\s\S]*?inner-digital-desktop-20260901\.webp/);
  assert.match(styles, /\.home-meian-page-turn\s*\{[\s\S]*?margin-top:\s*0;[\s\S]*?background:\s*transparent;/);
  assert.match(styles, /\.home-meian-paper-cut\s*\{[\s\S]*?width:\s*100%;/);
  assert.match(styles, /\.home-chapter-preview-band\s*\{[\s\S]*?background:\s*var\(--paper\);/);
  assert.match(styles, /\.home-chapter-preview::before\s*\{\s*content:\s*none;/);
  assert.match(styles, /\.home-divider-branch,[\s\S]*?stroke-dashoffset:\s*1;/);
  assert.match(styles, /\.home-section-divider\.is-reveal-visible \.home-divider-branch,[\s\S]*?stroke-dashoffset:\s*0;/);
  assert.match(styles, /\.home-avatar-video-stage\s*\{[\s\S]*?background:/);
  assert.match(styles, /\.home-gallery-frame\s*\{[\s\S]*?border:\s*0;[\s\S]*?box-shadow:\s*none;/);
  assert.match(styles, /\.home-xie-grid\s*\{[\s\S]*?background:\s*rgba\(248, 247, 243, 0\.36\);/);
  assert.match(styles, /\.home-profile-dialog\s*\{[\s\S]*?position:\s*fixed;[\s\S]*?inset:\s*0;/);
  assert.match(styles, /html\.profile-modal-open,[\s\S]*?body\.profile-modal-open\s*\{[^}]*overflow:\s*hidden;/);
  assert.match(styles, /xie-model-meian-stage-desktop-20260912\.webp/);
  assert.match(styles, /xie-model-meian-stage-mobile-20260912\.webp/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.home-divider-branch,[\s\S]*?stroke-dashoffset:\s*0;[\s\S]*?\.home-section-divider\.is-reveal-visible \.home-divider-blossom\s*\{\s*animation:\s*none;/);

  const video = statSync(new URL("../public/assets/video/xie-yuanding-feature-20260912.mp4", import.meta.url));
  assert.ok(video.size > 18_000_000);
});

test("home song archive exposes the ten-track Mei'an collection", () => {
  const component = read("src/components/HomeSongArchive.vue");
  const page = read("src/pages/HomePage.vue");
  const tracks = [
    ["01", "序 月影梅庵", "06:19", "01-prologue-moonlit-meian.mp3"],
    ["02", "蝶恋花", "03:50", "02-die-lian-hua.mp3"],
    ["03", "咏梅", "05:37", "03-yong-mei.mp3"],
    ["04", "松烟", "05:14", "04-song-yan.mp3"],
    ["05", "秋风词", "04:45", "05-qiu-feng-ci.mp3"],
    ["06", "关山月", "03:43", "06-guan-shan-yue.mp3"],
    ["07", "青春", "03:31", "07-qing-chun.mp3"],
    ["08", "时代的囚徒", "03:24", "08-prisoner-of-the-times.mp3"],
    ["09", "初心照梅庵", "02:40", "09-original-intent-shines-on-meian.mp3"],
    ["10", "尾声 大学之道", "04:02", "10-epilogue-the-great-learning.mp3"]
  ];

  assert.match(component, /home-song-archive/);
  assert.match(component, /home-song-artwork-image/);
  assert.match(component, /meian-audio-collection-cover-20260912\.webp/);
  assert.doesNotMatch(component, /home-song-artwork-ring|home-song-artwork-center/);
  assert.match(component, /v-for="\(track, index\) in tracks"/);
  assert.match(component, /:disabled="!track\.src"/);
  assert.match(component, /audioElement\.value\?\.pause\(\)/);

  for (const [id, title, duration, filename] of tracks) {
    assert.match(page, new RegExp(`id: "${id}"[\\s\\S]*?title: "${title}"[\\s\\S]*?duration: "${duration}"[\\s\\S]*?${filename.replaceAll(".", "\\.")}`));
    const audio = statSync(new URL(`../public/assets/audio/meian/${filename}`, import.meta.url));
    assert.ok(audio.size > 2_000_000);
  }

  const cover = statSync(new URL("../public/assets/images/meian-audio-collection-cover-20260912.webp", import.meta.url));
  assert.ok(cover.size > 40_000);
});

test("home profile and model dialogs keep their close controls visible without resetting page scroll", () => {
  const page = read("src/pages/HomePage.vue");
  const styles = read("src/styles.css");

  assert.match(page, /function lockModalScroll\(\)/);
  assert.doesNotMatch(page, /window\.scrollTo\(/);
  assert.doesNotMatch(page, /--profile-modal-scroll-offset/);
  assert.match(styles, /html\.profile-modal-open,[\s\S]*?body\.profile-modal-open\s*\{[\s\S]*?overflow:\s*hidden;/);
  assert.doesNotMatch(styles, /body\.profile-modal-open\s*\{[^}]*position:\s*fixed;/);
  assert.match(styles, /\.home-profile-dialog-header,[\s\S]*?\.home-model-dialog \.home-gallery-dialog-header\s*\{[\s\S]*?position:\s*sticky;[\s\S]*?z-index:\s*\d+;/);
  assert.match(styles, /\.home-gallery-close\s*\{[\s\S]*?position:\s*relative;[\s\S]*?z-index:\s*\d+;/);
  assert.match(styles, /\.site-main > :not\(\.site-page-background\):not\(dialog\)/);
  assert.match(styles, /@media \(max-width:\s*700px\)[\s\S]*?\.home-profile-dialog-header\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto;/);
});

test("home media dividers use VHS cassettes and staff notation without film strips or a waveform", () => {
  const component = read("src/components/HomeMediaDivider.vue");
  const styles = read("src/styles.css");

  assert.equal((component.match(/home-media-divider-vhs-shell/g) || []).length, 2);
  assert.equal((component.match(/home-media-divider-vhs-reels/g) || []).length, 2);
  assert.equal((component.match(/home-media-divider-vhs-window/g) || []).length, 2);
  assert.equal((component.match(/home-media-divider-vhs-label/g) || []).length, 2);
  assert.equal((component.match(/home-media-divider-tape/g) || []).length, 2);
  assert.match(component, /home-media-divider-staff/);
  assert.equal((component.match(/<circle cx="(?:860|910|960|1024|1081|1138)"/g) || []).length, 6);
  assert.doesNotMatch(component, /home-media-divider-film-(?:shell|sprockets|frames|scenes)/);
  assert.doesNotMatch(component, /C842 72 842 52 862 52/);
  assert.match(styles, /\.home-media-divider-vhs \.home-media-divider-vhs-reels\s*\{[\s\S]*?transition-delay:\s*320ms;/);
  assert.match(styles, /\.home-media-divider-vhs \.home-media-divider-vhs-window\s*\{[\s\S]*?transition-delay:\s*460ms;/);
  assert.match(styles, /\.home-media-divider-sound \.home-media-divider-note-stem\s*\{[\s\S]*?transition-delay:\s*900ms;/);
});

test("chat panel keeps the window label without the secondary interview title", () => {
  const chatPanel = read("src/components/ChatPanel.vue");

  assert.match(chatPanel, /t\("chatWindow"\)/);
  assert.doesNotMatch(chatPanel, /t\("chatTitle"\)/);
  assert.match(chatPanel, /v-if="showStatus" class="status-pill"/);
  assert.match(chatPanel, /showStatus:[\s\S]*?default:\s*true/);
});

test("Mei'an page exposes the complete exhibition sequence and local news video", () => {
  const page = read("src/pages/MeianPage.vue");

  for (const id of ["meian-profile", "meian-origin", "meian-spirit", "meian-timeline", "meian-today", "meian-video"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.match(page, /meian-nanjing-news\.mp4/);
  assert.doesNotMatch(page, /li-ruiqing-statue/);
  assert.match(page, /现存建筑登记/);
  assert.match(page, /三江、两江时期/);
  assert.match(page, /1917年/);
  assert.match(page, /形成梅庵周边景观环境提升设计，并推进相关整治工作/);
  assert.doesNotMatch(page, /1916 年/);
});

test("Second CYL Congress page exposes the complete exhibition sequence", () => {
  const page = read("src/pages/CongressPage.vue");

  for (const id of ["congress-overview", "congress-background", "congress-preparation", "congress-agenda", "congress-relations", "congress-archives", "congress-legacy"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.match(page, /heritage-gallery-ideas/);
  assert.doesNotMatch(page, /marxism-exhibit/);
  assert.match(page, /label: "到会代表"/);
  assert.match(page, /value: "16个省"/);
  assert.match(page, /label: "地方团组织"/);
  assert.match(page, /代表全国2000多名团员/);
  assert.doesNotMatch(page, /value: "2000余名"/);
  assert.match(page, /在政策上，S\.Y\.须完全服从C\.P\.的指导/);
  assert.match(page, /件团二大会议文件/);
  assert.doesNotMatch(page, /6月12日|7月15日|7月24日/);
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
  assert.match(router, /path: "\/", name: "home", component: HomePage \}/);
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

test("custom cursor separates pointer position from hover scaling", () => {
  const cursor = read("src/components/SiteCursor.vue");
  const styles = read("src/styles.css");
  const cursorStyles = styles.slice(styles.indexOf(".site-cursor {"), styles.indexOf("@media (hover: none)"));

  assert.match(cursor, /translate3d\(\$\{x\}px, \$\{y\}px, 0\)/);
  assert.match(styles, /\.site-cursor-leader::before,[\s\S]*?transform:\s*translate\(-50%, -50%\) scale\(var\(--cursor-scale, 1\)\);/);
  assert.match(styles, /\.site-cursor\.is-active \.site-cursor-leader\s*\{\s*--cursor-scale:\s*1\.42;/);
  assert.doesNotMatch(cursorStyles, /^\s*scale:/m);
});

test("scroll reveal repeats after leaving the viewport and supports reduced motion", () => {
  const motion = read("src/motion.js");
  const styles = read("src/styles.css");
  const meian = read("src/pages/MeianPage.vue");
  const congress = read("src/pages/CongressPage.vue");
  const archive = read("src/pages/ArchivePage.vue");

  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /function resetReveal\(element\)/);
  assert.match(motion, /if \(!entry\.isIntersecting\) \{[\s\S]*?resetReveal\(entry\.target\)/);
  assert.match(motion, /entry\.intersectionRatio >= 0\.12/);
  assert.match(motion, /threshold:\s*\[0, 0\.12\]/);
  assert.doesNotMatch(motion, /observer\.unobserve\(entry\.target\)/);
  assert.match(motion, /Math\.min\(index \* stagger, 360\)/);
  assert.match(motion, /motion-reveal-group/);
  assert.match(motion, /motion-reveal-item-media/);
  assert.match(meian, /v-reveal="\{ group: true \}"/);
  assert.match(congress, /v-reveal="\{ group: true \}"/);
  assert.doesNotMatch(archive, /v-reveal="80" class="section archive-timeline-section"/);
  assert.match(styles, /--reveal-distance:\s*24px;/);
  assert.match(styles, /--reveal-duration:\s*620ms;/);
  assert.match(styles, /scale\(1\.015\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.motion-reveal-group > \.motion-reveal-item \{[\s\S]*?transition:\s*none;/);
  assert.match(styles, /@media \(max-width: 720px\)[\s\S]*?--reveal-distance:\s*14px;[\s\S]*?--reveal-duration:\s*500ms;/);
});
