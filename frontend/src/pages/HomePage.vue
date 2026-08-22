<template>
  <section class="home-official-hero" aria-label="寻迹梅庵首页主视觉">
    <picture class="home-official-hero-picture">
      <source media="(max-width: 700px)" srcset="/assets/images/home-archive-background-dongda-meian-mobile-20260822.png">
      <img
        class="home-official-hero-image"
        src="/assets/images/home-archive-background-dongda-meian-title-small-20260821.png"
        alt="东大梅庵，数字化体验平台"
      >
    </picture>
  </section>

  <section id="home-xie-avatar" class="section home-feature-section home-xie-section">
    <div class="section-heading home-section-heading">
      <p class="eyebrow">{{ homeCopy.xieEyebrow }}</p>
      <h2>{{ homeCopy.xieTitle }}</h2>
    </div>
    <div class="home-xie-grid">
      <div class="home-model-column">
        <ModelViewer :info="modelInfo" />
        <button ref="profileTrigger" class="home-profile-trigger" type="button" @click="openProfile">
          <span>{{ homeCopy.xieLink }}</span>
          <span class="home-profile-arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <ChatPanel />
    </div>
  </section>

  <div class="home-section-divider" aria-hidden="true">
    <span class="home-divider-line"></span>
    <span class="home-divider-seal">梅</span>
    <span class="home-divider-line"></span>
  </div>

  <section id="home-digital-meian" class="section home-feature-section home-meian-gallery-section">
    <div class="section-heading home-section-heading">
      <p class="eyebrow">{{ homeCopy.galleryEyebrow }}</p>
      <h2>{{ homeCopy.galleryTitle }}</h2>
    </div>

    <div class="home-gallery-frame">
      <div class="home-gallery-toolbar">
        <div>
          <strong>{{ homeCopy.galleryCardTitle }}</strong>
          <span>{{ homeCopy.galleryCardMeta }}</span>
        </div>
        <button type="button" class="button secondary" @click="openGallery">{{ homeCopy.enlarge }}</button>
      </div>
      <div class="home-gallery-embed">
        <iframe
          :src="digitalMeianUrl"
          title="数字梅庵展馆"
          loading="lazy"
          allow="autoplay 'none'; xr-spatial-tracking"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="home-gallery-fallback">
        <img src="/assets/projects/2023/article/11.webp" alt="数字梅庵展馆预览">
        <a class="button secondary" :href="digitalMeianUrl" target="_blank" rel="noreferrer">{{ homeCopy.openExternal }}</a>
      </div>
    </div>
  </section>

  <nav class="home-quick-nav" aria-label="首页快速定位">
    <button type="button" @click="scrollToSection('home-xie-avatar')">
      <span class="home-quick-index">01</span>
      <span>{{ homeCopy.quickXie }}</span>
    </button>
    <button type="button" @click="scrollToSection('home-digital-meian')">
      <span class="home-quick-index">02</span>
      <span>{{ homeCopy.quickGallery }}</span>
    </button>
  </nav>

  <dialog ref="profileDialog" class="home-profile-dialog" @click="handleProfileBackdrop" @close="restoreProfileFocus">
    <article class="home-profile-dialog-shell">
      <header class="home-profile-dialog-header">
        <div>
          <p class="eyebrow">{{ homeCopy.profileEyebrow }}</p>
          <h2>{{ homeCopy.profileTitle }}</h2>
          <p>{{ homeCopy.profileIntro }}</p>
        </div>
        <button type="button" class="home-gallery-close" @click="closeProfile" :aria-label="homeCopy.profileClose">×</button>
      </header>

      <div class="home-profile-dialog-body">
        <ol class="home-profile-timeline">
          <li v-for="period in homeCopy.profilePeriods" :key="period.title">
            <span aria-hidden="true"></span>
            <div>
              <h3>{{ period.title }}</h3>
              <p>{{ period.text }}</p>
            </div>
          </li>
        </ol>

        <aside class="home-profile-aside">
          <section>
            <p class="eyebrow">{{ homeCopy.abilityEyebrow }}</p>
            <h3>{{ homeCopy.abilityTitle }}</h3>
            <ul>
              <li v-for="ability in homeCopy.abilities" :key="ability">{{ ability }}</li>
            </ul>
          </section>
          <section class="home-profile-sources">
            <p class="eyebrow">{{ homeCopy.sourcesTitle }}</p>
            <a href="https://history.seu.edu.cn/2018/0326/c18671a210750/page.htm" target="_blank" rel="noreferrer">{{ homeCopy.sourceHistory }}</a>
            <a href="https://seuaa.seu.edu.cn/2008/0114/c1670a26729/page.htm" target="_blank" rel="noreferrer">{{ homeCopy.sourceAlumni }}</a>
            <a href="https://dsb.nanjing.gov.cn/xxcb/201306/t20130617_2084703.html" target="_blank" rel="noreferrer">{{ homeCopy.sourceNanjing }}</a>
          </section>
        </aside>
      </div>
    </article>
  </dialog>

  <dialog ref="galleryDialog" class="home-gallery-dialog" @click="handleGalleryBackdrop">
    <div class="home-gallery-dialog-shell">
      <header class="home-gallery-dialog-header">
        <div>
          <p class="eyebrow">{{ homeCopy.galleryEyebrow }}</p>
          <h2>{{ homeCopy.galleryTitle }}</h2>
        </div>
        <button type="button" class="home-gallery-close" @click="closeGallery" aria-label="关闭数字梅庵展馆">×</button>
      </header>
      <iframe
        :src="digitalMeianUrl"
        title="放大查看数字梅庵展馆"
        loading="lazy"
        allow="autoplay 'none'; xr-spatial-tracking"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <a class="button secondary" :href="digitalMeianUrl" target="_blank" rel="noreferrer">{{ homeCopy.openExternal }}</a>
    </div>
  </dialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ChatPanel from "../components/ChatPanel.vue";
import ModelViewer from "../components/ModelViewer.vue";
import { fetchModelInfo } from "../api.js";
import { useI18n } from "../i18n.js";

const { isEnglish } = useI18n();
const digitalMeianUrl = "https://www.720yun.com/vr/658jOzey5w8";
const galleryDialog = ref(null);
const profileDialog = ref(null);
const profileTrigger = ref(null);
const modelInfo = ref({
  name: "谢远定数字分身模型",
  model_url: "",
  preview_url: "/assets/models/xieyuanding/preview.png",
  status: "building",
  description: "谢远定静态人物模型正在制作中，当前展示为占位版本。"
});

const homeCopy = computed(() => {
  if (isEnglish.value) {
    return {
      xieEyebrow: "Xie Yuanding Avatar",
      xieTitle: "Talk with Xie Yuanding",
      xieLink: "Learn about Xie Yuanding",
      profileEyebrow: "Person and era",
      profileTitle: "Xie Yuanding · From Mei'an to the revolutionary movement",
      profileIntro: "Xie Yuanding (1899–1928), known as Boping, was born in Zaoyang, Hubei. A student of Nanjing Higher Normal School, a predecessor of Southeast University, he became an early Party and Youth League organizer and a participant in the Second National Congress of the Socialist Youth League.",
      profileClose: "Close profile",
      profilePeriods: [
        { title: "1899–1920 · Education and awakening", text: "Influenced by progressive educators including Yun Daiying, he joined the Mutual Aid Society and Liqun Bookstore. In 1920 he entered Nanjing Higher Normal School and continued his intellectual awakening." },
        { title: "1920–1923 · Study at Mei'an", text: "On campus he took part in Marxist study and progressive publishing, joined the Socialist Youth League in May 1921, and became a member of the Communist Party of China in 1922." },
        { title: "1923 · The Second CYL Congress", text: "As a representative and organizer of the Nanjing League, he participated in the congress held at Mei'an from 20 to 25 August and later helped lead early Party organization in Nanjing." },
        { title: "1924–1927 · Xiangyang and the Northern Expedition", text: "He returned to Hubei to develop Party and League organizations, joined the Northern Expedition, worked in political publicity, and helped edit Hansheng Weekly." },
        { title: "1927–1928 · Northern Hubei and martyrdom", text: "He continued underground and organizational work in northern Hubei. Arrested in Hankou in 1928, he was executed that August at the age of 29." }
      ],
      abilityEyebrow: "Digital interpretation",
      abilityTitle: "How the avatar presents history",
      abilities: ["A 3D representation for digital exhibitions", "Source-based Q&A with evidence review", "A youth-oriented dialogue linking personal experience and historical context"],
      sourcesTitle: "Sources",
      sourceHistory: "Southeast University History Museum",
      sourceAlumni: "Southeast University Alumni Association",
      sourceNanjing: "Nanjing Party History Office",
      galleryEyebrow: "Digital Mei'an",
      galleryTitle: "Digital Mei'an Exhibition Hall",
      galleryCardTitle: "2023 Digital Mei'an",
      galleryCardMeta: "3D modeling · VR exhibition",
      enlarge: "Enlarge",
      openExternal: "Open in new window",
      quickXie: "Avatar",
      quickGallery: "Exhibition"
    };
  }

  return {
    xieEyebrow: "谢远定数字人",
    xieTitle: "与谢远定对话",
    xieLink: "了解谢远定",
    profileEyebrow: "人物与时代",
    profileTitle: "谢远定：从梅庵走出的革命先锋",
    profileIntro: "谢远定（1899—1928），伯平，湖北枣阳人，曾就读于东南大学前身南京高等师范学校。他从青年求学时期投身革命，是南京早期党团组织的重要成员，也是中国社会主义青年团第二次全国代表大会的参与者。",
    profileClose: "关闭人物资料",
    profilePeriods: [
      { title: "1899—1920 · 求学与启蒙", text: "早年在湖北求学，受到恽代英等进步人士影响，参加互助社、利群书社。1920 年考入南京高等师范学校，在求学与社会实践中逐渐确立救国理想。" },
      { title: "1920—1923 · 梅庵求学", text: "在校期间参与马克思主义研究和进步刊物活动，1921 年 5 月加入中国社会主义青年团，1922 年加入中国共产党。梅庵见证了他由进步青年走向革命者的思想转变。" },
      { title: "1923 · 参加团二大", text: "作为南京团组织代表和重要组织者，他参加了 8 月 20 日至 25 日在梅庵召开的团二大，并继续推动南京早期党团组织建设。" },
      { title: "1924—1927 · 襄阳与北伐实践", text: "回到湖北后，他以教员身份开展党团工作，在襄阳发展组织，随后参加北伐，从事政治宣传并参与编辑《汉声周报》。" },
      { title: "1927—1928 · 鄂北斗争与牺牲", text: "大革命失败后继续在鄂北和武汉从事革命工作。1928 年在汉口被捕，同年 8 月英勇就义，年仅 29 岁。" }
    ],
    abilityEyebrow: "数字阐释",
    abilityTitle: "数字人如何讲述历史",
    abilities: ["以三维人物形象承载数字展陈", "以史料知识库支持问答并提供出处核验", "以青年化对话连接人物经历、校园记忆与时代背景"],
    sourcesTitle: "资料来源",
    sourceHistory: "东南大学校史馆",
    sourceAlumni: "东南大学校友总会",
    sourceNanjing: "南京党史网",
    galleryEyebrow: "数字梅庵",
    galleryTitle: "数字梅庵展馆",
    galleryCardTitle: "2023 数字梅庵展馆",
    galleryCardMeta: "三维建模 · VR 全景展陈",
    enlarge: "放大查看",
    openExternal: "新窗口打开",
    quickXie: "谢远定数字人",
    quickGallery: "梅庵数字展馆"
  };
});

onMounted(async () => {
  modelInfo.value = await fetchModelInfo();
});

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openProfile() {
  if (profileDialog.value && !profileDialog.value.open) {
    profileDialog.value.showModal();
  }
}

function closeProfile() {
  profileDialog.value?.close();
}

function handleProfileBackdrop(event) {
  if (event.target === event.currentTarget) closeProfile();
}

function restoreProfileFocus() {
  profileTrigger.value?.focus();
}

function openGallery() {
  if (galleryDialog.value && !galleryDialog.value.open) {
    galleryDialog.value.showModal();
  }
}

function closeGallery() {
  galleryDialog.value?.close();
}

function handleGalleryBackdrop(event) {
  if (event.target === event.currentTarget) closeGallery();
}
</script>
