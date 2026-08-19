<template>
  <section class="page-hero context-hero meian-hero">
    <PageMotif variant="context" />
    <p class="eyebrow">{{ t("meianEyebrow") }}</p>
    <h1>{{ t("meianPageTitle") }}</h1>
    <p>{{ t("meianPageLede") }}</p>
  </section>

  <div class="section heritage-layout heritage-layout-meian">
    <aside class="heritage-index" :aria-label="copy.indexLabel">
      <span class="heritage-index-kicker">{{ copy.indexKicker }}</span>
      <nav>
        <a v-for="(item, index) in copy.index" :key="item.id" :href="`#${item.id}`">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>{{ item.label }}
        </a>
      </nav>
    </aside>

    <article class="heritage-flow">
      <section id="meian-profile" class="heritage-chapter heritage-opening">
        <figure class="heritage-lead-image">
          <img src="/assets/exhibitions/meian/exterior.webp" :alt="copy.images.exterior.alt">
          <figcaption>{{ copy.images.exterior.caption }}</figcaption>
        </figure>
        <div class="heritage-opening-copy">
          <p class="heritage-chapter-no">01 / {{ copy.profileKicker }}</p>
          <h2>{{ copy.profileTitle }}</h2>
          <p class="heritage-lede">{{ copy.profileText }}</p>
          <dl class="heritage-facts">
            <div v-for="fact in copy.facts" :key="fact.label">
              <dt>{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="meian-origin" class="heritage-chapter">
        <header class="heritage-section-heading">
          <p class="heritage-chapter-no">02 / {{ copy.originKicker }}</p>
          <h2>{{ copy.originTitle }}</h2>
        </header>
        <div class="heritage-asymmetric-grid">
          <div class="heritage-prose">
            <p v-for="paragraph in copy.originText" :key="paragraph">{{ paragraph }}</p>
          </div>
          <figure class="heritage-portrait-figure">
            <img src="/assets/exhibitions/meian/li-ruiqing-portrait.webp" :alt="copy.images.portrait.alt">
            <figcaption>{{ copy.images.portrait.caption }}</figcaption>
          </figure>
          <figure class="heritage-wide-figure">
            <img src="/assets/exhibitions/meian/li-ruiqing-statue.webp" :alt="copy.images.statue.alt">
            <figcaption>{{ copy.images.statue.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <section id="meian-spirit" class="heritage-chapter heritage-quote-chapter">
        <div class="heritage-quote-copy">
          <p class="heritage-chapter-no">03 / {{ copy.spiritKicker }}</p>
          <blockquote>{{ copy.spiritQuote }}</blockquote>
          <p>{{ copy.spiritText }}</p>
        </div>
        <figure>
          <img src="/assets/exhibitions/meian/historical-building.webp" :alt="copy.images.historical.alt">
          <figcaption>{{ copy.images.historical.caption }}</figcaption>
        </figure>
      </section>

      <section id="meian-timeline" class="heritage-chapter">
        <header class="heritage-section-heading">
          <p class="heritage-chapter-no">04 / {{ copy.timelineKicker }}</p>
          <h2>{{ copy.timelineTitle }}</h2>
        </header>
        <ol class="heritage-timeline">
          <li v-for="item in copy.timeline" :key="item.year">
            <time>{{ item.year }}</time>
            <div><strong>{{ item.title }}</strong><p>{{ item.text }}</p></div>
          </li>
        </ol>
        <div class="heritage-image-pair">
          <figure>
            <img src="/assets/exhibitions/meian/rebuilt-building.webp" :alt="copy.images.rebuilt.alt">
            <figcaption>{{ copy.images.rebuilt.caption }}</figcaption>
          </figure>
          <figure>
            <img src="/assets/exhibitions/meian/protected-building.webp" :alt="copy.images.protected.alt">
            <figcaption>{{ copy.images.protected.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <section id="meian-today" class="heritage-chapter">
        <header class="heritage-section-heading">
          <p class="heritage-chapter-no">05 / {{ copy.todayKicker }}</p>
          <h2>{{ copy.todayTitle }}</h2>
          <p>{{ copy.todayText }}</p>
        </header>
        <div class="heritage-gallery heritage-gallery-uneven">
          <figure>
            <img src="/assets/exhibitions/meian/current-exhibition.webp" :alt="copy.images.exhibition.alt">
            <figcaption>{{ copy.images.exhibition.caption }}</figcaption>
          </figure>
          <figure>
            <img src="/assets/exhibitions/meian/guided-visit.webp" :alt="copy.images.visit.alt">
            <figcaption>{{ copy.images.visit.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <section id="meian-video" class="heritage-chapter meian-video-section" aria-labelledby="meian-video-title">
        <header class="heritage-section-heading">
          <p class="heritage-chapter-no">06 / {{ t("meianVideoEyebrow") }}</p>
          <h2 id="meian-video-title">{{ t("meianVideoTitle") }}</h2>
        </header>
        <figure class="meian-video-feature">
          <div class="meian-video-frame">
            <video src="/assets/video/meian-nanjing-news.mp4" :aria-label="t('meianVideoTitle')" controls playsinline preload="metadata"></video>
          </div>
          <figcaption>{{ t("meianVideoSource") }}</figcaption>
        </figure>
      </section>

      <section class="heritage-sources" :aria-label="copy.sourcesTitle">
        <h2>{{ copy.sourcesTitle }}</h2>
        <a href="https://splgwh.seu.edu.cn/2021/0426/c25044a369506/page.htm" target="_blank" rel="noreferrer">{{ copy.sourceHeritage }}</a>
        <a href="https://history.seu.edu.cn/2023/0822/c18650a456949/page.htm" target="_blank" rel="noreferrer">{{ copy.sourceHistory }}</a>
      </section>
    </article>
  </div>
</template>

<script setup>
import { computed } from "vue";
import PageMotif from "../components/PageMotif.vue";
import { useI18n } from "../i18n.js";

const { t, isEnglish } = useI18n();

const zh = {
  indexLabel: "梅庵页面章节导航", indexKicker: "展陈目录",
  index: [
    { id: "meian-profile", label: "基础档案" }, { id: "meian-origin", label: "梅庵溯源" },
    { id: "meian-spirit", label: "菜根精神" }, { id: "meian-timeline", label: "建筑沿革" },
    { id: "meian-today", label: "今日梅庵" }, { id: "meian-video", label: "影像记录" }
  ],
  profileKicker: "基础档案", profileTitle: "六朝松畔的一座百年小筑",
  profileText: "梅庵位于东南大学四牌楼校区西北角，西临进香河，北近鸡笼山。它从纪念教育先驱李瑞清的校园建筑，逐渐成为讲学、集会、艺术教育与红色文化展陈的重要空间。",
  facts: [
    { label: "建成时间", value: "1914 年" }, { label: "建筑风格", value: "西方古典复兴主义" },
    { label: "建筑面积", value: "212.4 平方米" }, { label: "历史位置", value: "四牌楼校区 · 六朝松旁" }
  ],
  originKicker: "梅庵溯源", originTitle: "因人得名，也因教育理想而延续",
  originText: [
    "南京高等师范学校成立后，校长江谦为纪念两江师范学堂监督李瑞清的办学之功，在六朝松旁以带皮松木为梁架建起三间茅屋，并取李瑞清之号命名为“梅庵”。",
    "李瑞清是近代书法家、美术教育先驱和高等教育的重要奠基者。他重视中西学术融通，也格外珍视青年人才，将学校视作家族、学生视作子弟。"
  ],
  spiritKicker: "菜根精神", spiritQuote: "嚼得菜根，做得大事",
  spiritText: "这句校训强调耐劳、务实与担当。1916 年，古琴家王燕卿在此授琴，梅庵也成为梅庵琴派传播的重要空间。建筑、艺术与育人传统由此交织。",
  timelineKicker: "建筑沿革", timelineTitle: "从三间茅屋到文物建筑",
  timeline: [
    { year: "1914", title: "梅庵建成", text: "江谦为纪念李瑞清，在六朝松旁建三间茅屋并命名梅庵。" },
    { year: "1933", title: "改建平房", text: "中央大学将梅庵改建为砖混结构的音乐教室，形成中西合璧的现存形态。" },
    { year: "1947", title: "重题匾额", text: "著名史学家柳诒徵题写“梅庵”二字，匾额悬于建筑正中。" },
    { year: "1992", title: "文物保护", text: "梅庵被列为南京市文物保护单位。" },
    { year: "2006", title: "纳入国保", text: "梅庵随中央大学旧址纳入全国重点文物保护单位。" },
    { year: "2021", title: "环境提升", text: "校园开展梅庵周边景观与展陈提升，让建筑保护与公共教育相互支撑。" },
    { year: "2023", title: "教育基地", text: "梅庵成为江苏省党史教育基地，持续服务校史与红色文化教育。" }
  ],
  todayKicker: "今日梅庵", todayTitle: "收藏历史，也继续孕育青年力量",
  todayText: "团二大史料展以图文、实物文件、场景复原和艺术装置呈现历史。梅庵也通过讲解、课程、社会实践与数字展陈，让校园中的百年记忆进入当代青年生活。",
  sourcesTitle: "资料来源", sourceHeritage: "东南大学国保单位文物本体：梅庵", sourceHistory: "东南大学校史馆：100年前，这场重要的大会在东大召开",
  images: {
    exterior: { alt: "梅庵正面建筑与匾额", caption: "梅庵正面，匾额高悬" },
    portrait: { alt: "李瑞清人物画像", caption: "李瑞清（1867—1920），字仲麟，号梅庵" },
    statue: { alt: "梅庵前的李瑞清雕像", caption: "梅庵前的李瑞清先生雕像" },
    historical: { alt: "早期梅庵建筑历史影像", caption: "早期梅庵建筑历史影像" },
    rebuilt: { alt: "改建后的梅庵建筑", caption: "改建后的梅庵，保留中西合璧的建筑特征" },
    protected: { alt: "梅庵与团二大会址纪念碑", caption: "梅庵建筑与团二大会址纪念碑" },
    exhibition: { alt: "梅庵内部历史展陈", caption: "梅庵纪念馆内部展陈" },
    visit: { alt: "学生参观梅庵展览", caption: "青年学生在讲解中认识梅庵历史" }
  }
};

const en = {
  ...zh,
  indexLabel: "Mei'an section navigation", indexKicker: "Contents",
  index: [
    { id: "meian-profile", label: "Profile" }, { id: "meian-origin", label: "Origins" },
    { id: "meian-spirit", label: "Caigen Spirit" }, { id: "meian-timeline", label: "Architecture" },
    { id: "meian-today", label: "Mei'an Today" }, { id: "meian-video", label: "Video" }
  ],
  profileKicker: "Profile", profileTitle: "A century-old building beside the Six Dynasties Pine",
  profileText: "Mei'an stands in the northwest corner of Southeast University's Sipailou Campus. Created to honor educator Li Ruiqing, it later became a place for teaching, assembly, art education, and exhibitions of revolutionary history.",
  facts: [
    { label: "Built", value: "1914" }, { label: "Style", value: "Western Classical Revival" },
    { label: "Floor area", value: "212.4 m²" }, { label: "Location", value: "Sipailou Campus" }
  ],
  originKicker: "Origins", originTitle: "Named for an educator and sustained by an educational ideal",
  originText: [
    "After Nanjing Higher Normal School was founded, president Jiang Qian built a three-room thatched hall beside the Six Dynasties Pine in memory of Li Ruiqing and named it after Li's art name, Mei'an.",
    "Li Ruiqing was a calligrapher, art-education pioneer, and influential modern educator who advocated learning across Chinese and Western traditions and cared deeply for young talent."
  ],
  spiritKicker: "Caigen Spirit", spiritQuote: "Endure humble fare; accomplish great work",
  spiritText: "The maxim values endurance, practical effort, and responsibility. In 1916, guqin master Wang Yanqing taught here, making Mei'an an important home of the Mei'an school of qin music.",
  timelineKicker: "Architecture", timelineTitle: "From a thatched hall to protected heritage",
  timeline: [
    { year: "1914", title: "Mei'an built", text: "Jiang Qian created a three-room thatched hall in memory of Li Ruiqing." },
    { year: "1933", title: "Rebuilt", text: "Central University rebuilt it as a brick-and-concrete music classroom." },
    { year: "1947", title: "Plaque renewed", text: "Historian Liu Yizheng inscribed the Mei'an plaque." },
    { year: "1992", title: "Municipal protection", text: "Mei'an became a protected cultural property of Nanjing." },
    { year: "2006", title: "National protection", text: "It became part of the nationally protected Central University historic site." },
    { year: "2021", title: "Landscape renewal", text: "The surrounding landscape and exhibition environment were improved." },
    { year: "2023", title: "Education base", text: "Mei'an was recognized as a Jiangsu Party-history education base." }
  ],
  todayKicker: "Mei'an Today", todayTitle: "Preserving history while inspiring new generations",
  todayText: "The exhibition combines documents, installations, reconstructed scenes, and historical objects. Guided tours, courses, social practice, and digital exhibitions continue to bring this campus memory to young people.",
  sourcesTitle: "Sources", sourceHeritage: "Southeast University protected heritage: Mei'an", sourceHistory: "Southeast University History Museum: The congress held here a century ago",
  images: Object.fromEntries(Object.entries(zh.images).map(([key, value]) => [key, { ...value, alt: value.caption }]))
};

const copy = computed(() => isEnglish.value ? en : zh);
</script>
