import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";
import { createSpeechPortraitPlayback } from "../src/components/speechPortraitPlayback.js";
import { brightenSkinPixels, isSkinMaterial, applySkinTextureDisplay } from "../src/components/skinTextureDisplay.js";
import { documentaryLibrary } from "../src/components/documentaryLibrary.js";

test("portrait follows actual speech and resets to the closed-mouth first frame", async () => {
  const video = { readyState: 1, currentTime: 4, muted: false, paused: true,
    pause() { this.paused = true; }, async play() { this.paused = false; } };
  const controller = createSpeechPortraitPlayback(video);
  await controller.setActive(false);
  assert.equal(video.currentTime, 0);
  await controller.setActive(true);
  assert.equal(video.muted, true);
  assert.equal(video.paused, false);
  video.currentTime = 7;
  await controller.setActive(false);
  assert.equal(video.currentTime, 0);
  assert.equal(video.paused, true);
  controller.dispose();
  await controller.setActive(true);
  assert.equal(video.paused, true);
});

test("late play resolution, metadata and rejection cannot leave the portrait running", async () => {
  let complete, blocked = 0;
  const video = { readyState: 0, currentTime: 8, paused: true,
    pause() { this.paused = true; }, play() { return new Promise((resolve) => { complete = () => { this.paused = false; resolve(); }; }); } };
  const controller = createSpeechPortraitPlayback(video, () => blocked++);
  const starting = controller.setActive(true);
  await controller.setActive(false);
  video.readyState = 1;
  controller.ready();
  complete();
  await starting;
  assert.equal(video.paused, true);
  assert.equal(video.currentTime, 0);
  video.play = async () => { throw new Error("blocked"); };
  await controller.setActive(true);
  assert.equal(blocked, 1);
  assert.equal(video.paused, true);
});

test("skin brightening preserves alpha and relative texture shading", () => {
  const pixels = new Uint8ClampedArray([0, 100, 200, 70, 255, 220, 150, 255]);
  brightenSkinPixels(pixels);
  assert.deepEqual([...pixels], [38, 123, 208, 70, 255, 225, 166, 255]);
  assert.equal(isSkinMaterial("MID_MI_Face_Skin_Baked_LOD0_VT_0_0"), true);
  assert.equal(isSkinMaterial("MI_Body_Baked_VT_StaticMesh5"), true);
  assert.equal(isSkinMaterial("MI_Hair"), false);
  assert.equal(isSkinMaterial("MI_Eye"), false);
  assert.equal(isSkinMaterial("MI_Clothing"), false);
});

test("shared skin materials are derived once while other maps stay original", () => {
  let clones = 0, disposed = 0;
  const original = { image: { width: 1, height: 1 }, clone() { clones++; return { channel: 1 }; }, dispose() { disposed++; } };
  const skin = { name: "MI_Body_Baked_VT_StaticMesh5", map: original };
  const clothes = { name: "clothing", map: original };
  const previous = globalThis.document;
  globalThis.document = { createElement: () => ({ getContext: () => ({
    drawImage() {}, getImageData: () => ({ data: new Uint8ClampedArray([100, 100, 100, 255]) }), putImageData() {}
  }) }) };
  try {
    const release = applySkinTextureDisplay({ traverse(fn) { [skin, skin, clothes].forEach((material) => fn({ material })); } });
    assert.equal(clones, 1);
    assert.notEqual(skin.map, original);
    assert.equal(skin.map.channel, 1);
    assert.equal(original.image.width, 1);
    assert.notEqual(skin.map.source.data, original.image);
    assert.equal(clothes.map, original);
    release();
    assert.equal(disposed, 1);
  } finally { globalThis.document = previous; }
});

test("three selected-only documentary sources exist and each is below 90 MB", () => {
  assert.equal(documentaryLibrary.length, 3);
  assert.deepEqual(documentaryLibrary.map(film => film.title), [
    "梅庵红色记忆·初心东南", "梅庵红色记忆·寻迹之旅", "梅庵红色记忆·青春行记"
  ]);
  assert.deepEqual(documentaryLibrary.map(film => film.shortTitle), ["初心东南", "寻迹之旅", "青春行记"]);
  assert.match(documentaryLibrary[0].src, /seu-red-memories/);
  assert.match(documentaryLibrary[1].src, /tracing-meian-documentary/);
  for (const film of documentaryLibrary) {
    const size = statSync(new URL(`../public${film.src}`, import.meta.url)).size;
    assert.ok(size > 100_000 && size < 90_000_000);
    assert.ok(statSync(new URL(`../public${film.poster}`, import.meta.url)).size > 1000);
  }
  const component = readFileSync(new URL("../src/components/HomeDocumentaryArchive.vue", import.meta.url), "utf8");
  assert.equal((component.match(/<video\b/g) || []).length, 1);
  assert.match(component, /removeAttribute\("src"\)/);
  assert.doesNotMatch(component, /autoplay/);
  const portrait = readFileSync(new URL("../src/components/SpeechPortraitVideo.vue", import.meta.url), "utf8");
  assert.doesNotMatch(portrait, /\bcontrols\b/);
  assert.match(portrait, /muted\s+loop\s+playsinline/);
  assert.match(portrait, /v-show="!failed && playing"/);
  assert.match(portrait, /@pause="playing = false"/);
  const home = readFileSync(new URL("../src/pages/HomePage.vue", import.meta.url), "utf8");
  assert.match(home, /poster="\/assets\/video\/xie-yuanding-idle-20260913\.webp"/);
  assert.ok(statSync(new URL("../public/assets/video/xie-yuanding-idle-20260913.webp", import.meta.url)).size > 1000);
});

test("floating chapter navigation stays fixed and the feature film pauses outside the viewport", () => {
  const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const css = read("src/styles.css");
  const home = read("src/pages/HomePage.vue");
  assert.match(css, /\.site-main > nav\.home-quick-nav\s*\{\s*position:\s*fixed;/);
  assert.match(home, /featureVideoObserver = new IntersectionObserver/);
  assert.match(home, /entry\.intersectionRatio < 0\.25/);
  assert.match(home, /xieFeatureVideo\.value\?\.pause\(\)/);
  assert.match(home, /window\.removeEventListener\("scroll", scheduleChapterUpdate\)/);
  assert.match(home, /xie-yuanding-speaking-hq-20260913\.mp4/);
  const project = JSON.parse(read("public/assets/data/projects.json")).results.find(project => project.year === 2022);
  assert.equal(project.article_blocks.find(block => block.type === "image").path,
    "/assets/projects/2022/article/practice-route-20260913.webp");
  assert.equal(project.article_blocks.some(block => block.path?.endsWith("06.gif")), false);
});
