<template>
  <section v-reveal class="page-hero context-hero congress-hero">
    <PageMotif variant="context" />
    <p class="eyebrow">{{ t("congressEyebrow") }}</p>
    <h1>{{ t("congressPageTitle") }}</h1>
    <p>{{ t("congressPageLede") }}</p>
  </section>

  <div class="section heritage-layout heritage-layout-congress">
    <aside class="heritage-index" :aria-label="copy.indexLabel">
      <span class="heritage-index-kicker">{{ copy.indexKicker }}</span>
      <nav>
        <a v-for="(item, index) in copy.index" :key="item.id" :href="`#${item.id}`">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>{{ item.label }}
        </a>
      </nav>
    </aside>

    <article class="heritage-flow">
      <section id="congress-overview" v-reveal="{ group: true }" class="heritage-chapter heritage-opening">
        <figure class="heritage-lead-image">
          <img src="/assets/exhibitions/congress/meeting-room.webp" :alt="copy.images.meeting.alt">
          <figcaption>{{ copy.images.meeting.caption }}</figcaption>
        </figure>
        <div class="heritage-opening-copy">
          <p class="heritage-chapter-no">01 / {{ copy.overviewKicker }}</p>
          <h2>{{ copy.overviewTitle }}</h2>
          <p class="heritage-lede">{{ copy.overviewText }}</p>
          <dl class="heritage-facts heritage-facts-numeric">
            <div v-for="fact in copy.facts" :key="fact.label"><dt>{{ fact.value }}</dt><dd>{{ fact.label }}</dd></div>
          </dl>
        </div>
      </section>

      <section id="congress-background" v-reveal="{ group: true }" class="heritage-chapter">
        <header class="heritage-section-heading">
          <p class="heritage-chapter-no">02 / {{ copy.backgroundKicker }}</p>
          <h2>{{ copy.backgroundTitle }}</h2>
          <p>{{ copy.backgroundText }}</p>
        </header>
        <div class="heritage-gallery heritage-gallery-ideas">
          <figure v-for="image in copy.backgroundImages" :key="image.src">
            <img :src="image.src" :alt="image.alt"><figcaption>{{ image.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <section id="congress-preparation" v-reveal="{ group: true }" class="heritage-chapter heritage-document-split">
        <div>
          <header class="heritage-section-heading">
            <p class="heritage-chapter-no">03 / {{ copy.preparationKicker }}</p>
            <h2>{{ copy.preparationTitle }}</h2>
          </header>
          <ol v-reveal="120" class="heritage-timeline heritage-timeline-compact">
            <li v-for="item in copy.preparation" :key="item.date"><time>{{ item.date }}</time><p>{{ item.text }}</p></li>
          </ol>
        </div>
        <figure>
          <img src="/assets/exhibitions/congress/presidium-record.webp" :alt="copy.images.presidium.alt">
          <figcaption>{{ copy.images.presidium.caption }}</figcaption>
        </figure>
      </section>

      <section id="congress-agenda" v-reveal="{ group: true }" class="heritage-chapter heritage-agenda">
        <figure>
          <img src="/assets/exhibitions/congress/committee-record.webp" :alt="copy.images.committee.alt">
          <figcaption>{{ copy.images.committee.caption }}</figcaption>
        </figure>
        <div>
          <p class="heritage-chapter-no">04 / {{ copy.agendaKicker }}</p>
          <h2>{{ copy.agendaTitle }}</h2>
          <p>{{ copy.agendaText }}</p>
          <ol class="heritage-decision-list"><li v-for="item in copy.agenda" :key="item">{{ item }}</li></ol>
        </div>
      </section>

      <section id="congress-relations" v-reveal="{ group: true }" class="heritage-chapter heritage-quote-chapter">
        <div class="heritage-quote-copy">
          <p class="heritage-chapter-no">05 / {{ copy.relationsKicker }}</p>
          <h2>{{ copy.relationsTitle }}</h2>
          <blockquote>{{ copy.relationsQuote }}</blockquote>
          <p>{{ copy.relationsText }}</p>
        </div>
        <figure>
          <img src="/assets/exhibitions/congress/delegate-exhibit.webp" :alt="copy.images.delegate.alt">
          <figcaption>{{ copy.images.delegate.caption }}</figcaption>
        </figure>
      </section>

      <section id="congress-archives" v-reveal="{ group: true }" class="heritage-chapter heritage-archive-feature">
        <header class="heritage-section-heading">
          <p class="heritage-chapter-no">06 / {{ copy.archivesKicker }}</p>
          <h2>{{ copy.archivesTitle }}</h2>
        </header>
        <div class="heritage-archive-grid">
          <figure><img src="/assets/exhibitions/congress/eighth-session.webp" :alt="copy.images.session.alt"><figcaption>{{ copy.images.session.caption }}</figcaption></figure>
          <div class="heritage-archive-stat"><strong>69</strong><span>{{ copy.archivesStat }}</span><p>{{ copy.archivesText }}</p></div>
        </div>
      </section>

      <section id="congress-legacy" v-reveal="{ group: true, stagger: 70 }" class="heritage-chapter heritage-legacy">
        <p class="heritage-chapter-no">07 / {{ copy.legacyKicker }}</p>
        <h2>{{ copy.legacyTitle }}</h2>
        <p>{{ copy.legacyText }}</p>
        <div class="heritage-legacy-lines"><span v-for="item in copy.legacy" :key="item">{{ item }}</span></div>
      </section>

      <section v-reveal="{ group: true, stagger: 70 }" class="heritage-sources" :aria-label="copy.sourcesTitle">
        <h2>{{ copy.sourcesTitle }}</h2>
        <a href="https://history.seu.edu.cn/2023/0822/c18650a456949/page.htm" target="_blank" rel="noreferrer">{{ copy.sourceHistory }}</a>
        <a href="https://www.seu.edu.cn/2023/0820/c124a456859/page.htm" target="_blank" rel="noreferrer">{{ copy.sourceUniversity }}</a>
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
  indexLabel: "团二大页面章节导航", indexKicker: "展陈目录",
  index: [
    { id: "congress-overview", label: "大会概览" }, { id: "congress-background", label: "思想传播" },
    { id: "congress-preparation", label: "大会筹备" }, { id: "congress-agenda", label: "六日议程" },
    { id: "congress-relations", label: "党团关系" }, { id: "congress-archives", label: "珍贵史料" },
    { id: "congress-legacy", label: "当代传承" }
  ],
  overviewKicker: "大会概览", overviewTitle: "中国社会主义青年团第二次全国代表大会",
  overviewText: "1923年8月20日至25日，中国社会主义青年团第二次全国代表大会在南京东南大学梅庵召开。大会总结建团以来的工作，讨论青年运动方针和党团关系，为中国青年运动确立了更清晰的政治方向。",
  facts: [{ value: "6日", label: "会期" }, { value: "30余名", label: "正式代表" }, { value: "2000余名", label: "代表团员" }, { value: "唯一", label: "南京召开的全国党团代表大会" }],
  backgroundKicker: "思想传播", backgroundTitle: "新思想在南京青年中生长",
  backgroundText: "五四运动后，少年中国学会南京分会、马克思主义研究活动与南京青年团组织相继发展。东南大学及其前身汇聚的一批进步师生，为团二大在南京召开准备了思想与组织基础。",
  backgroundImages: [
    { src: "/assets/exhibitions/congress/young-china-society.webp", alt: "少年中国学会相关史料展陈", caption: "少年中国学会与南京新思想传播" },
    { src: "/assets/exhibitions/congress/nanjing-league.webp", alt: "南京青年团组织相关展陈", caption: "南京青年团组织的建立与发展" }
  ],
  preparationKicker: "大会筹备", preparationTitle: "从长沙到南京梅庵",
  preparation: [
    { date: "3月7日", text: "团中央开始讨论召开第二次全国代表大会。" },
    { date: "5月10日", text: "原计划在长沙召开，着手准备大会组织工作。" },
    { date: "6月12日", text: "根据形势调整会址，并继续征集各地报告。" },
    { date: "7月15日", text: "确定南京为大会举办地。" },
    { date: "7月24日", text: "进一步落实代表、议程和会议文件。" },
    { date: "8月20日", text: "大会在东南大学梅庵正式开幕。" }
  ],
  agendaKicker: "六日议程", agendaTitle: "在讨论与决议中校准青年运动方向",
  agendaText: "六天会期中，代表听取中央执行委员会报告，讨论国际青年运动、中国政治形势、经济斗争、教育宣传和组织建设等议题，并选举新的中央执行委员会。",
  agenda: ["总结建团以来的组织与宣传工作", "讨论青年工人、学生与农民运动", "明确教育宣传及组织建设任务", "审议党团关系并形成重要决议", "选举新一届中央执行委员会"],
  relationsKicker: "党团关系", relationsTitle: "确立党领导团的根本原则",
  relationsQuote: "中国社会主义青年团应在中国共产党领导之下，协助党开展青年运动。",
  relationsText: "团二大在中国青年运动史上的重要意义，在于进一步明确党与团的政治关系和组织关系，使青年团成为党联系广大青年的桥梁，也为此后共青团事业发展奠定了思想与制度基础。",
  archivesKicker: "珍贵史料", archivesTitle: "从散落档案还原六日大会",
  archivesStat: "份团二大会议文件",
  archivesText: "东南大学持续搜集、整理与研究团二大史料，通过会议记录、代表档案、决议文本和展陈复原，让一百年前的讨论重新可见。",
  legacyKicker: "当代传承", legacyTitle: "永远跟党走，青春向未来",
  legacyText: "今天，梅庵团二大史料展、校史课程、红色讲解与社会实践共同构成面向青年的历史课堂。团二大留下的政治选择与青春担当，继续回应新时代青年如何立志、求真与行动。",
  legacy: ["党史教育基地", "团史专题展陈", "青年社会实践", "数字化传播"],
  sourcesTitle: "资料来源", sourceHistory: "东南大学校史馆：100年前，这场重要的大会在东大召开", sourceUniversity: "东南大学：纪念团二大召开100周年相关报道",
  images: {
    meeting: { alt: "团二大会议场景复原", caption: "梅庵内的团二大会议场景复原" },
    presidium: { alt: "团二大主席团相关会议记录", caption: "团二大主席团及会议记录史料" },
    committee: { alt: "团二大中央执行委员会相关记录", caption: "大会决议与中央执行委员会相关史料" },
    delegate: { alt: "团二大代表人物展陈", caption: "来自各地的青年代表及其革命实践" },
    session: { alt: "团二大第八次会议记录展陈", caption: "团二大会议记录及原始文献展陈" }
  }
};

const en = {
  ...zh, indexLabel: "Congress section navigation", indexKicker: "Contents",
  index: [
    { id: "congress-overview", label: "Overview" }, { id: "congress-background", label: "Ideas" },
    { id: "congress-preparation", label: "Preparation" }, { id: "congress-agenda", label: "Six-day Agenda" },
    { id: "congress-relations", label: "Party and League" }, { id: "congress-archives", label: "Archives" },
    { id: "congress-legacy", label: "Legacy" }
  ],
  overviewKicker: "Overview", overviewTitle: "The Second National Congress of the Socialist Youth League of China",
  overviewText: "From 20 to 25 August 1923, the congress met at Mei'an on the campus of National Southeastern University in Nanjing. It reviewed the League's early work and clarified the direction of China's youth movement.",
  facts: [{ value: "6 days", label: "Duration" }, { value: "30+", label: "Delegates" }, { value: "2,000+", label: "Members represented" }, { value: "Only one", label: "National Party or League congress held in Nanjing" }],
  backgroundKicker: "Ideas", backgroundTitle: "New thought took root among Nanjing's youth",
  backgroundText: "After the May Fourth Movement, the Young China Association, Marxist study activities, and youth league organizations developed in Nanjing, creating the intellectual and organizational setting for the congress.",
  backgroundImages: zh.backgroundImages,
  preparationKicker: "Preparation", preparationTitle: "From Changsha to Mei'an in Nanjing",
  preparation: zh.preparation.map((item) => ({ ...item, text: item.text })),
  agendaKicker: "Six-day Agenda", agendaTitle: "Debate and resolutions redirected the youth movement",
  agendaText: "Delegates reviewed central work, discussed the political situation, education, labor, organization, and relations with the Communist Party, then elected a new Central Executive Committee.",
  agenda: ["Review organizational and publicity work", "Discuss workers', student, and peasant youth movements", "Define educational and organizational tasks", "Adopt resolutions on Party–League relations", "Elect a new Central Executive Committee"],
  relationsKicker: "Party and League", relationsTitle: "Establishing the Party's leadership of the League",
  relationsQuote: "The Youth League should work under the leadership of the Communist Party of China and assist the Party in the youth movement.",
  relationsText: "The congress clarified political and organizational relations between the Party and the League, laying an important foundation for the later development of China's Communist Youth League.",
  archivesKicker: "Archives", archivesTitle: "Reconstructing six days through scattered records", archivesStat: "congress documents",
  archivesText: "Southeast University has collected and studied meeting records, delegate files, and resolutions, making the discussions of a century ago visible again.",
  legacyKicker: "Legacy", legacyTitle: "Following the Party, carrying youth forward",
  legacyText: "The Mei'an exhibition, university-history courses, guided tours, and social-practice projects now form a living classroom for young people.",
  legacy: ["Party-history education", "Youth League exhibition", "Social practice", "Digital interpretation"],
  sourcesTitle: "Sources", sourceHistory: "SEU History Museum: The congress held here a century ago", sourceUniversity: "Southeast University: Centenary of the Second Youth League Congress",
  images: Object.fromEntries(Object.entries(zh.images).map(([key, value]) => [key, { ...value, alt: value.caption }]))
};

const copy = computed(() => isEnglish.value ? en : zh);
</script>
