<template>
  <div class="home-layered-scroll">
    <section ref="heroSection" id="home-hero" class="home-official-hero" aria-label="寻迹梅庵首页主视觉">
      <picture class="home-official-hero-picture">
        <source media="(max-width: 700px)" srcset="/assets/images/home-archive-background-dongda-meian-mobile-gate-calligraphy-20260910.png">
        <img
          class="home-official-hero-image"
          src="/assets/images/home-archive-background-dongda-meian-gate-calligraphy-20260910.png"
          alt="东大梅庵，数字化体验平台"
        >
      </picture>
      <div class="home-hero-atmosphere" aria-hidden="true">
        <span v-for="index in 8" :key="`petal-${index}`" class="home-hero-petal"></span>
        <span v-for="index in 7" :key="`fiber-${index}`" class="home-hero-fiber"></span>
      </div>
    </section>

    <div class="home-foreground-sheet">
      <div class="home-meian-page-turn" aria-hidden="true">
        <picture class="home-meian-paper-cut">
          <source media="(max-width: 700px)" srcset="/assets/images/meian-paper-cut-hero-texture-mobile-20260909.svg">
          <img src="/assets/images/meian-paper-cut-hero-texture-20260909.svg" alt="">
        </picture>
      </div>

      <div class="home-foreground-body">
        <div class="home-chapter-preview-band">
        <nav class="home-chapter-preview" :aria-label="homeCopy.chapterPreviewLabel">
          <button v-for="chapter in chapters" :key="chapter.id" type="button" @click="scrollToSection(chapter.id)">
            <span>{{ chapter.number }}</span>
            <strong>{{ chapter.title }}</strong>
          </button>
        </nav>
      </div>

      <section ref="xieSection" id="home-xie-avatar" class="section home-feature-section home-xie-section">
    <span class="home-chapter-watermark" aria-hidden="true">01</span>
    <div v-reveal class="section-heading home-section-heading">
      <p class="eyebrow">{{ homeCopy.xieEyebrow }}</p>
      <h2>{{ homeCopy.xieTitle }}</h2>
    </div>
    <div class="home-xie-grid">
      <div v-reveal="80" class="home-model-column">
        <div class="home-avatar-video-stage" :aria-label="homeCopy.videoPlaceholder">
          <span class="home-avatar-video-mark" aria-hidden="true"></span>
          <p>{{ homeCopy.videoPlaceholder }}</p>
        </div>
        <div class="home-avatar-actions">
          <button ref="profileTrigger" class="home-profile-trigger" type="button" @click="openProfile">
            <span>{{ homeCopy.xieLink }}</span>
            <span class="home-profile-arrow" aria-hidden="true">→</span>
          </button>
          <button ref="modelTrigger" class="home-profile-trigger is-model" type="button" @click="openModel">
            <span>{{ homeCopy.modelLink }}</span>
            <span class="home-profile-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <ChatPanel :show-status="false" @speech-active-change="handleSpeechActivity" />
    </div>
    <figure v-reveal="140" class="home-xie-feature-film">
      <div class="home-xie-feature-film-frame">
        <video
          controls
          playsinline
          preload="metadata"
          src="/assets/video/xie-yuanding-feature-20260912.mp4"
          @error="xieVideoFailed = true"
        ></video>
        <p v-if="xieVideoFailed" role="status">{{ homeCopy.videoError }}</p>
      </div>
      <figcaption>
        <strong>{{ homeCopy.videoTitle }}</strong>
        <span>{{ homeCopy.videoMeta }}</span>
      </figcaption>
    </figure>
      </section>

      <div v-reveal class="home-section-divider" aria-hidden="true">
    <svg class="home-divider-path home-divider-path-desktop" viewBox="0 0 1200 150" preserveAspectRatio="xMidYMid meet">
      <g class="home-divider-source-nodes">
        <path pathLength="1" d="M58 84 L108 58 L150 94" />
        <circle cx="58" cy="84" r="4" />
        <circle cx="108" cy="58" r="5" />
        <circle cx="150" cy="94" r="3.5" />
      </g>
      <path class="home-divider-branch" pathLength="1" d="M58 84 C196 92 290 49 418 67 C536 84 631 103 753 78 C824 64 874 63 931 72" />
      <g class="home-divider-twigs">
        <path pathLength="1" d="M344 60 C377 44 394 33 408 16" />
        <path pathLength="1" d="M388 57 C417 42 439 37 463 39" />
        <path pathLength="1" d="M497 77 C525 59 539 44 548 25" />
        <path pathLength="1" d="M688 88 C716 106 733 112 760 114" />
      </g>
      <g class="home-divider-blossom" transform="translate(578 65)">
        <circle class="home-divider-petal" cx="0" cy="-10" r="7" />
        <circle class="home-divider-petal" cx="9.5" cy="-3" r="7" />
        <circle class="home-divider-petal" cx="5.5" cy="8" r="7" />
        <circle class="home-divider-petal" cx="-5.5" cy="8" r="7" />
        <circle class="home-divider-petal" cx="-9.5" cy="-3" r="7" />
        <circle class="home-divider-heart" cx="0" cy="0" r="3.5" />
      </g>
      <g class="home-divider-building">
        <path pathLength="1" d="M900 67 L900 58 L922 58 L922 48 L1125 48 L1125 58 L1147 58 L1147 67" />
        <path pathLength="1" d="M918 67 L918 121 L1127 121 L1127 67" />
        <path pathLength="1" d="M907 67 L1147 67" />
        <path pathLength="1" d="M941 121 L941 81 L968 81 L968 121 M986 121 L986 81 L1013 81 L1013 121" />
        <path pathLength="1" d="M1035 121 L1035 76 L1073 76 L1073 121 M1091 121 L1091 82 L1113 82 L1113 121" />
        <path pathLength="1" d="M1046 88 L1054 80 L1062 88 L1062 100 L1054 108 L1046 100 Z" />
        <path pathLength="1" d="M1021 121 L1021 128 L1087 128 L1087 121" />
      </g>
    </svg>

    <svg class="home-divider-path home-divider-path-mobile" viewBox="0 0 390 104" preserveAspectRatio="xMidYMid meet">
      <g class="home-divider-source-nodes">
        <path pathLength="1" d="M18 61 L46 44 L72 66" />
        <circle cx="18" cy="61" r="3" />
        <circle cx="46" cy="44" r="4" />
        <circle cx="72" cy="66" r="3" />
      </g>
      <path class="home-divider-branch" pathLength="1" d="M18 61 C86 72 121 36 181 51 C224 62 255 68 286 57" />
      <g class="home-divider-twigs">
        <path pathLength="1" d="M118 46 C135 35 145 25 151 13" />
        <path pathLength="1" d="M145 43 C162 34 174 32 186 33" />
      </g>
      <g class="home-divider-blossom" transform="translate(198 54)">
        <circle class="home-divider-petal" cx="0" cy="-8" r="5.5" />
        <circle class="home-divider-petal" cx="7.5" cy="-2" r="5.5" />
        <circle class="home-divider-petal" cx="4.5" cy="6.5" r="5.5" />
        <circle class="home-divider-petal" cx="-4.5" cy="6.5" r="5.5" />
        <circle class="home-divider-petal" cx="-7.5" cy="-2" r="5.5" />
        <circle class="home-divider-heart" cx="0" cy="0" r="2.8" />
      </g>
      <g class="home-divider-building">
        <path pathLength="1" d="M276 56 L276 50 L285 50 L285 43 L366 43 L366 50 L375 50 L375 56" />
        <path pathLength="1" d="M283 56 L283 84 L368 84 L368 56" />
        <path pathLength="1" d="M279 56 L375 56" />
        <path pathLength="1" d="M292 84 L292 65 L305 65 L305 84 M314 84 L314 65 L327 65 L327 84" />
        <path pathLength="1" d="M337 84 L337 62 L354 62 L354 84" />
      </g>
    </svg>
      </div>

      <section ref="gallerySection" id="home-digital-meian" class="section home-feature-section home-meian-gallery-section">
    <span class="home-chapter-watermark" aria-hidden="true">02</span>
    <div v-reveal class="section-heading home-section-heading">
      <p class="eyebrow">{{ homeCopy.galleryEyebrow }}</p>
      <h2>{{ homeCopy.galleryTitle }}</h2>
    </div>

    <div v-reveal="100" class="home-gallery-frame">
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

        <HomeMediaDivider v-reveal variant="gallery-documentary" />

        <section ref="documentarySection" id="home-congress-documentary" class="section home-feature-section home-documentary-section">
          <span class="home-chapter-watermark" aria-hidden="true">03</span>
          <div v-reveal class="section-heading home-section-heading">
            <p class="eyebrow">{{ homeCopy.documentaryEyebrow }}</p>
            <h2>{{ homeCopy.documentaryTitle }}</h2>
          </div>
          <div v-reveal="100" class="home-media-stage home-documentary-stage">
            <div class="home-documentary-frame" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <p>{{ homeCopy.contentPending }}</p>
          </div>
        </section>

        <HomeMediaDivider v-reveal variant="documentary-song" />

        <section ref="songSection" id="home-meian-song" class="section home-feature-section home-song-section">
          <span class="home-chapter-watermark" aria-hidden="true">04</span>
          <div v-reveal class="section-heading home-section-heading">
            <p class="eyebrow">{{ homeCopy.songEyebrow }}</p>
            <h2>{{ homeCopy.songTitle }}</h2>
          </div>
          <div v-reveal="100" class="home-media-stage home-song-stage">
            <HomeSongArchive :tracks="songTracks" :labels="homeCopy.songPlayer" />
          </div>
        </section>
      </div>
    </div>
  </div>

  <nav :class="['home-quick-nav', { 'is-visible': activeChapter }]" :aria-label="homeCopy.quickNavLabel">
    <button
      v-for="chapter in chapters"
      :key="chapter.id"
      type="button"
      :class="{ 'is-active': activeChapter === chapter.id }"
      :aria-current="activeChapter === chapter.id ? 'location' : undefined"
      @click="scrollToSection(chapter.id)"
    >
      <span class="home-quick-index">{{ chapter.number }}</span>
      <span class="home-quick-label">{{ chapter.shortTitle }}</span>
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
        <button ref="profileCloseButton" type="button" class="home-gallery-close" @click="closeProfile" :aria-label="homeCopy.profileClose">×</button>
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

  <dialog ref="modelDialog" class="home-model-dialog" @click="handleModelBackdrop" @close="handleModelClosed">
    <div class="home-model-dialog-shell">
      <header class="home-gallery-dialog-header">
        <div>
          <p class="eyebrow">{{ homeCopy.modelEyebrow }}</p>
          <h2>{{ homeCopy.modelTitle }}</h2>
        </div>
        <button ref="modelCloseButton" type="button" class="home-gallery-close" @click="closeModel" :aria-label="homeCopy.modelClose">×</button>
      </header>
      <div class="home-model-dialog-stage">
        <ModelViewer v-if="modelMounted" :info="modelInfo" :speech-active="speechActive" />
      </div>
    </div>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import ChatPanel from "../components/ChatPanel.vue";
import HomeMediaDivider from "../components/HomeMediaDivider.vue";
import HomeSongArchive from "../components/HomeSongArchive.vue";
import ModelViewer from "../components/ModelViewer.vue";
import { fetchModelInfo } from "../api.js";
import { useI18n } from "../i18n.js";

const { isEnglish } = useI18n();
const digitalMeianUrl = "https://www.720yun.com/vr/658jOzey5w8";
const galleryDialog = ref(null);
const profileDialog = ref(null);
const modelDialog = ref(null);
const profileTrigger = ref(null);
const profileCloseButton = ref(null);
const modelTrigger = ref(null);
const modelCloseButton = ref(null);
const heroSection = ref(null);
const xieSection = ref(null);
const gallerySection = ref(null);
const documentarySection = ref(null);
const songSection = ref(null);
const activeChapter = ref("");
const speechActive = ref(false);
const modelMounted = ref(false);
const xieVideoFailed = ref(false);
let chapterObserver;
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
      xieEyebrow: "Talk with Xie Yuanding",
      xieTitle: "Xie Yuanding Avatar",
      xieLink: "Learn about Xie Yuanding",
      modelLink: "View 3D avatar",
      videoPlaceholder: "Portrait film coming soon",
      modelEyebrow: "Digital representation",
      modelTitle: "3D model of Xie Yuanding",
      modelClose: "Close 3D model",
      videoTitle: "Across-Time Digital Avatar Short Film: Xie Yuanding, Setting Out from Mei'an",
      videoMeta: "Digital portrait archive · 01:37",
      videoError: "The video could not be loaded. Please try again later.",
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
      documentaryEyebrow: "Moving-image archive",
      documentaryTitle: "Second CYL Congress Documentary",
      songEyebrow: "Sound archive",
      songTitle: "Song of Mei'an",
      songPlayer: {
        currentTrack: "Current track",
        collection: "Mei'an audio collection",
        coverAlt: "Watercolor cover of the Mei'an audio collection",
        catalogue: "Track catalogue",
        trackCount: "10 tracks",
        play: "Play current track",
        pause: "Pause current track",
        progress: "Playback progress",
        pending: "Pending"
      },
      contentPending: "Content coming soon",
      enlarge: "Enlarge",
      openExternal: "Open in new window",
      chapterPreviewLabel: "Explore the four digital exhibition chapters",
      quickNavLabel: "Home chapter navigation",
      quickXie: "Xie Yuanding Avatar",
      quickGallery: "Digital Mei'an",
      quickDocumentary: "CYL Congress Documentary",
      quickSong: "Song of Mei'an"
    };
  }

  return {
    xieEyebrow: "与谢远定对话",
    xieTitle: "谢远定数字人",
    xieLink: "了解谢远定",
    modelLink: "查看3D数字人",
    videoPlaceholder: "人物影像待接入",
    modelEyebrow: "数字形象",
    modelTitle: "谢远定3D建模",
    modelClose: "关闭3D模型",
    videoTitle: "跨时空数字人短片：《谢远定：从梅庵出发》",
    videoMeta: "人物数字化影像 · 01:37",
    videoError: "视频暂时无法加载，请稍后重试",
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
    documentaryEyebrow: "影像档案",
    documentaryTitle: "团二大纪录片",
    songEyebrow: "声音档案",
    songTitle: "梅庵歌曲",
    songPlayer: {
      currentTrack: "当前曲目",
      collection: "梅庵声音馆藏",
      coverAlt: "梅庵声音馆藏水彩封面",
      catalogue: "馆藏曲目",
      trackCount: "共10首",
      play: "播放当前曲目",
      pause: "暂停当前曲目",
      progress: "播放进度",
      pending: "待提供"
    },
    contentPending: "内容待接入",
    enlarge: "放大查看",
    openExternal: "新窗口打开",
    chapterPreviewLabel: "浏览首页四项数字展陈",
    quickNavLabel: "首页章节定位",
    quickXie: "谢远定数字人",
    quickGallery: "数字梅庵展馆",
    quickDocumentary: "团二大纪录片",
    quickSong: "梅庵歌曲"
  };
});

const chapters = computed(() => [
  { id: "home-xie-avatar", number: "01", title: homeCopy.value.xieTitle, shortTitle: homeCopy.value.quickXie },
  { id: "home-digital-meian", number: "02", title: homeCopy.value.galleryTitle, shortTitle: homeCopy.value.quickGallery },
  { id: "home-congress-documentary", number: "03", title: homeCopy.value.documentaryTitle, shortTitle: homeCopy.value.quickDocumentary },
  { id: "home-meian-song", number: "04", title: homeCopy.value.songTitle, shortTitle: homeCopy.value.quickSong }
]);

const songTrackLibrary = [
  { id: "01", title: "序 月影梅庵", titleEn: "Prologue: Moonlit Mei'an", duration: "06:19", src: "/assets/audio/meian/01-prologue-moonlit-meian.mp3" },
  { id: "02", title: "蝶恋花", titleEn: "Butterflies in Love with Flowers", duration: "03:50", src: "/assets/audio/meian/02-die-lian-hua.mp3" },
  { id: "03", title: "咏梅", titleEn: "Ode to Plum Blossoms", duration: "05:37", src: "/assets/audio/meian/03-yong-mei.mp3" },
  { id: "04", title: "松烟", titleEn: "Pine Soot", duration: "05:14", src: "/assets/audio/meian/04-song-yan.mp3" },
  { id: "05", title: "秋风词", titleEn: "Song of the Autumn Wind", duration: "04:45", src: "/assets/audio/meian/05-qiu-feng-ci.mp3" },
  { id: "06", title: "关山月", titleEn: "Moon over the Mountain Pass", duration: "03:43", src: "/assets/audio/meian/06-guan-shan-yue.mp3" },
  { id: "07", title: "青春", titleEn: "Youth", duration: "03:31", src: "/assets/audio/meian/07-qing-chun.mp3" },
  { id: "08", title: "时代的囚徒", titleEn: "Prisoner of the Times", duration: "03:24", src: "/assets/audio/meian/08-prisoner-of-the-times.mp3" },
  { id: "09", title: "初心照梅庵", titleEn: "Original Aspiration Illuminates Mei'an", duration: "02:40", src: "/assets/audio/meian/09-original-intent-shines-on-meian.mp3" },
  { id: "10", title: "尾声 大学之道", titleEn: "Epilogue: The Great Learning", duration: "04:02", src: "/assets/audio/meian/10-epilogue-the-great-learning.mp3" }
];

const songTracks = computed(() => songTrackLibrary.map((track) => ({
  ...track,
  title: isEnglish.value ? track.titleEn : track.title,
  artist: isEnglish.value ? "Mei'an audio collection" : "梅庵声音馆藏",
  status: "ready"
})));

onMounted(() => {
  chapterObserver = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleEntry?.target.id) {
      activeChapter.value = visibleEntry.target.id === "home-hero" ? "" : visibleEntry.target.id;
    }
  }, {
    rootMargin: "-30% 0px -48% 0px",
    threshold: [0, 0.15, 0.4]
  });

  [heroSection.value, xieSection.value, gallerySection.value, documentarySection.value, songSection.value].forEach((section) => {
    if (section) chapterObserver.observe(section);
  });
});

onBeforeUnmount(() => {
  chapterObserver?.disconnect();
  modelDialog.value?.close();
  unlockModalScroll();
});

function scrollToSection(id) {
  activeChapter.value = id;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

function handleSpeechActivity(active) {
  speechActive.value = active;
}

function openProfile() {
  if (profileDialog.value && !profileDialog.value.open) {
    profileDialog.value.showModal();
    lockModalScroll();
    requestAnimationFrame(() => {
      profileCloseButton.value?.focus({ preventScroll: true });
    });
  }
}

async function openModel() {
  if (!modelDialog.value || modelDialog.value.open) return;

  modelMounted.value = true;
  await nextTick();
  modelDialog.value.showModal();
  lockModalScroll();
  requestAnimationFrame(() => {
    modelCloseButton.value?.focus({ preventScroll: true });
  });
  modelInfo.value = await fetchModelInfo();
}

function closeModel() {
  modelDialog.value?.close();
}

function handleModelBackdrop(event) {
  if (event.target === event.currentTarget) closeModel();
}

function handleModelClosed() {
  modelMounted.value = false;
  unlockModalScroll();
  modelTrigger.value?.focus({ preventScroll: true });
}

function closeProfile() {
  profileDialog.value?.close();
}

function handleProfileBackdrop(event) {
  if (event.target === event.currentTarget) closeProfile();
}

function restoreProfileFocus() {
  unlockModalScroll();
  profileTrigger.value?.focus({ preventScroll: true });
}

function lockModalScroll() {
  document.documentElement.classList.add("profile-modal-open");
  document.body.classList.add("profile-modal-open");
}

function unlockModalScroll() {
  document.documentElement.classList.remove("profile-modal-open");
  document.body.classList.remove("profile-modal-open");
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
