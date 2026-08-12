import { computed, readonly, ref } from "vue";

const messages = {
  zh: {
    brandTitle: "寻迹梅庵",
    brandSubtitle: "Tracing Mei'an",
    navHome: "首页",
    navOverview: "项目概览",
    navContext: "梅庵与团二大",
    navXie: "谢远定数字人",
    navSite: "梅庵旧址数字化",
    navArchive: "历年成果",
    archiveOverviewLink: "成果总览",
    navMenu: "菜单",
    langLabel: "当前中文展示",
    langButton: "EN",
    footerCopy: "寻迹梅庵社会实践项目 · 东南大学",
    footerNote: "Vue + Django 首版，图片、模型与正式史料可持续补充。",

    homeEyebrow: "东南大学社会实践项目",
    homeTitle: "寻迹梅庵",
    homeSubtitle: "五年磨一剑",
    homeLede: "从红色寻访、数字梅庵、梅庵元宇宙到 AI 青年叙事，前四年的持续探索在今年汇聚、延展，并以新的方式被看见",
    enter2026: "进入2026重点成果",
    startChat: "开始对话",
    viewModel: "查看人物模型",
    browseArchive: "浏览历代成果",
    starMapLabel: "五年成果星图",
    yearIndexLabel: "五年成果入口",
    keywordMeian: "梅庵",
    keywordTuan: "团二大",
    keywordXie: "谢远定",
    slideMeian: "梅庵主题影像占位",
    slideXie: "谢远定数字人素材占位",
    slidePractice: "社会实践成果照片占位",
    slideSite: "梅庵旧址建模参考占位",
    meianEyebrow: "梅庵",
    meianTitle: "东南大学校园中的历史文化场域",
    meianText: "梅庵坐落于东南大学四牌楼校区西北隅，最初是三江、两江时期搭建的茅屋，南京高等师范学校校长江谦为纪念李瑞清的办学之功，以李瑞清之号“梅庵”为其命名。",
    meianTextMore: "20 世纪 20 年代，这里既是会议与讲习场所，也是马克思主义在南京传播的重要空间。1933 年，学校将其改建为砖混结构平房；今天的梅庵继续承载校史教育、革命传统教育与青年实践。",
    tuanEyebrow: "团二大",
    tuanTitle: "青年理想与时代行动的历史坐标",
    tuanText: "1923 年 8 月 20 日至 25 日，中国社会主义青年团第二次全国代表大会在梅庵召开。毛泽东代表中共中央出席会议，来自各地的青年代表围绕团的发展方向、组织建设和统一战线等议题展开讨论。",
    tuanTextMore: "团二大是共青团历史上唯一一次在高校召开的全国代表大会。2021 年，东南大学从俄罗斯国家社会政治历史档案馆搜集到全套会议记录，并通过史料展、课程、宣讲与数字展陈持续开展研究和传播。",
    overviewEyebrow: "项目概览",
    overviewTitle: "从梅庵出发，重建校史、人物与实践的连接",
    overviewLede: "项目以梅庵作为文化场域，谢远定先生作为东南大学校友与团二大参与者，社会实践作为当代青年理解历史与传播历史的方法。",
    overviewLarge: "首版优先保证网站能上线、对话能运行、回答有依据、模型能展示、历代成果能汇总。",
    overviewStep1Title: "梅庵线索",
    overviewStep1Text: "梳理梅庵与东南大学校园记忆、教育传统、文化空间之间的关系。",
    overviewStep2Title: "校友人物",
    overviewStep2Text: "围绕谢远定先生的校友身份、时代背景与团二大参与经历，建立数字分身叙事支点。",
    overviewStep3Title: "数字实践",
    overviewStep3Text: "以 3D 建模、史料问答、数字展陈和成果归档，让社会实践成果可展示、可沉淀、可延展。",

    contextEyebrow: "主题介绍",
    contextTitle: "梅庵与团二大：一处校园建筑承载的青年历史",
    contextLede: "梅庵从校园中的讲习与集会空间，成为团二大召开地和红色史料展陈场所。建筑、会议与一代青年的选择，共同构成“寻迹梅庵”持续追寻的历史现场。",
    meianImageAlt: "梅庵建筑实景",
    tuanImageAlt: "历史照片中的梅庵建筑",
    meianPhotoNote: "梅庵实景，图片来源：东南大学校史文化网",
    tuanPhotoNote: "梅庵历史影像，图片来源：东南大学校史文化网",
    officialSource: "查看东南大学官方资料",
    contextXieTitle: "谢远定先生数字人建设的叙事支点",
    contextXieText: "谢远定先生作为项目重点人物，将通过数字人、史料问答与展示内容，把个体经历、学校记忆和青年运动历史联系起来。",

    xieEyebrow: "数字人建设",
    xieTitle: "谢远定先生数字人",
    xieLede: "本页预留谢远定先生 3D 数字人、史料问答、人物访谈与教学展示入口。首版以占位结构呈现，等待模型与知识材料接入。",
    xieTalk: "与谢远定对话",
    xieProfileTitle: "人物档案",
    xieMoreHint: "点击卡片展开详细内容",
    viewMore: "点击查看更多",
    xieProfileKicker: "人物与时代",
    xieProfileSummary: "从校友身份、革命经历与团二大线索认识谢远定",
    xieProfileText: "人物档案将以可核验史料为基础，梳理谢远定的求学经历、青年时期的社会活动、与东南大学及团二大的联系，并标注资料来源与仍待考证的部分。",
    xieProfilePoint1: "基础身份：姓名、生卒年份、籍贯、求学与任职经历",
    xieProfilePoint2: "历史联系：在校经历、团二大代表身份及相关活动线索",
    xieProfilePoint3: "史料体系：档案、校史资料、地方文献与实践访谈的出处对应",
    xieAbilityTitle: "数字人能力",
    xieAbilityKicker: "数字交互",
    xieAbilitySummary: "让人物形象、史料知识与对话能力在同一入口呈现",
    xieAbilityText: "数字人由三维形象、史料知识库与问答接口共同组成。回答优先引用已整理资料，并在证据不足时明确提示，避免把推测当作史实。",
    xieAbilityPoint1: "三维展示：支持人物模型旋转、缩放与后续动作播放",
    xieAbilityPoint2: "史料问答：围绕人物、梅庵和团二大进行检索式回答并展示出处",
    xieAbilityPoint3: "展示应用：面向网页导览、社会实践答辩与校史教育场景",
    xieProgressTitle: "建设进度",
    xieProgressText: "可用于展示建模、知识库整理、语音形象、交互原型等阶段成果。",

    dialogueEyebrow: "数字人交互原型",
    dialogueTitle: "与谢远定对话",
    dialogueLede: "此界面接入 `/api/chat/`，用于演示基于史料的问答、资料不足提示和参考出处展示。",
    modelBadge: "3D 建模展示位",
    avatarAlt: "谢远定人物数字形象素材",
    modelTitle: "谢远定先生 3D 数字人",
    modelText: "后续可替换为 GLB/GLTF 模型查看器，支持旋转、缩放、语音讲述与人物动作展示。",
    chatWindow: "问答窗口",
    chatTitle: "史料问答与人物访谈",
    chatLoading: "请求中",
    chatReady: "可演示",
    chatGreeting: "你好，我是谢远定数字分身原型。你可以从下方问题开始，了解校友身份、团二大经历和梅庵线索。",
    chatInput: "输入你想追问的问题",
    chatSend: "发送",
    chatSending: "发送中",
    chatError: "系统暂时无法回答，请稍后再试。",
    q1: "谢远定是谁？",
    q2: "谢远定和东南大学有什么关系？",
    q3: "谢远定为什么参加团二大？",
    q4: "团二大为什么在梅庵召开？",
    q5: "当时南京高师的青年氛围是什么样的？",
    q6: "你想对今天的东大学生说什么？",

    siteEyebrow: "旧址数字化",
    siteTitle: "为东南大学梅庵旧址预留三维展示空间",
    siteLede: "首版使用建筑示意占位，后续可替换为实景照片、点云成果、三维模型、导览视频或交互式校园空间展示。",
    sitePlaceholder: "3D 场景占位",
    siteAssetTitle: "梅庵旧址数字资产入口",
    siteAssetText: "此区域用于承载后续的 3D 场景、模型查看器或嵌入式展陈。当前版本保留稳定尺寸，方便后续直接替换。",
    siteGuideTitle: "空间导览",
    siteGuideText: "预留点位说明、路线节点、展陈解说和校园空间关系。",
    siteDigitalTitle: "数字资产",
    siteDigitalText: "预留模型文件、贴图、照片、测绘记录和版本说明。",

    archiveEyebrow: "成果归档",
    archiveTitle: "五年成果总览",
    archiveLede: "从项目起点、数字展馆、梅庵元宇宙、AI 青年叙事到 2026 谢远定数字分身，逐年查看“寻迹梅庵”的成果积累。"
    ,archiveLoading: "正在读取年度成果"
    ,archiveErrorTitle: "成果暂时无法读取"
    ,archiveErrorText: "请稍后重试，或返回历年成果总览"
    ,archiveEmptyTitle: "成果正在整理"
    ,archiveEmptyText: "年度资料与图片将在整理完成后显示"
    ,retry: "重新加载"
  },
  en: {
    brandTitle: "Tracing Mei'an",
    brandSubtitle: "Social Practice Project",
    navHome: "Home",
    navOverview: "Overview",
    navContext: "Mei'an and CYL II",
    navXie: "Xie Yuanding Avatar",
    navSite: "Mei'an Digitization",
    navArchive: "Yearly Outcomes",
    archiveOverviewLink: "Overview",
    navMenu: "Menu",
    langLabel: "Switch to Chinese",
    langButton: "中",
    footerCopy: "Tracing Mei'an Social Practice Project · Southeast University",
    footerNote: "First Vue + Django version. Images, models, and verified sources can be updated over time.",

    homeEyebrow: "Southeast University Social Practice Project",
    homeTitle: "Tracing Mei'an",
    homeSubtitle: "Five Years, One Focus",
    homeLede: "From field research and Digital Mei'an to metaverse scenes and AI youth narratives, four years of exploration converge this year and become visible in a new form",
    enter2026: "View 2026 Highlight",
    startChat: "Start Chat",
    viewModel: "View Model",
    browseArchive: "Browse Archive",
    starMapLabel: "Five-year outcome map",
    yearIndexLabel: "Five-year project index",
    keywordMeian: "Mei'an",
    keywordTuan: "CYL II",
    keywordXie: "Xie Yuanding",
    slideMeian: "Mei'an visual placeholder",
    slideXie: "Xie Yuanding avatar material placeholder",
    slidePractice: "Practice outcome photo placeholder",
    slideSite: "Mei'an modeling reference placeholder",
    meianEyebrow: "Mei'an",
    meianTitle: "Mei'an: A Campus Site of Memory",
    meianText: "Mei'an stands in the northwest corner of Southeast University's Sipailou campus. It began as a modest hut and was named by principal Jiang Qian in memory of educator Li Ruiqing, whose courtesy name was Mei'an.",
    meianTextMore: "In the 1920s it served as a venue for meetings and lectures and became an important site for the spread of Marxism in Nanjing. Rebuilt as a brick-and-concrete hall in 1933, it now supports university-history education and youth practice.",
    tuanEyebrow: "Second CYL Congress",
    tuanTitle: "CYL II: A Turning Point for Youth",
    tuanText: "The Second National Congress of the Chinese Socialist Youth League was held at Mei'an from 20 to 25 August 1923. Mao Zedong attended on behalf of the CPC Central Committee while delegates discussed the League's direction, organization, and united-front policy.",
    tuanTextMore: "It remains the only national congress in the League's history held on a university campus. Since recovering a complete set of congress records in 2021, Southeast University has continued research and public interpretation through exhibitions, courses, talks, and digital media.",
    overviewEyebrow: "Overview",
    overviewTitle: "Starting from Mei'an, reconnecting university history, people, and practice",
    overviewLede: "The project uses Mei'an as a cultural site, Xie Yuanding as a Southeast University alumnus and participant in the Second CYL Congress, and social practice as a contemporary way to understand and communicate history.",
    overviewLarge: "The first version prioritizes going online, running Q&A, showing evidence, displaying the model, and collecting yearly outcomes.",
    overviewStep1Title: "Mei'an Thread",
    overviewStep1Text: "Clarify Mei'an's relationship with campus memory, educational traditions, and cultural space.",
    overviewStep2Title: "Alumni Figure",
    overviewStep2Text: "Use Xie Yuanding's alumni identity, historical context, and Second CYL Congress experience as the narrative anchor.",
    overviewStep3Title: "Digital Practice",
    overviewStep3Text: "Use 3D modeling, source-based Q&A, digital exhibition, and archiving to make the project visible and reusable.",

    contextEyebrow: "Context",
    contextTitle: "Mei'an and the Second CYL Congress: youth history held by a campus building",
    contextLede: "From a campus lecture and meeting space to the site of the Second CYL Congress and a historical exhibition, Mei'an connects architecture, a national youth congress, and the choices of a generation.",
    meianImageAlt: "Mei'an building exterior",
    tuanImageAlt: "Historical image of Mei'an",
    meianPhotoNote: "Mei'an exterior, source: Southeast University History and Culture website",
    tuanPhotoNote: "Historical image of Mei'an, source: Southeast University History and Culture website",
    officialSource: "View official Southeast University source",
    contextXieTitle: "A narrative anchor for the Xie Yuanding digital avatar",
    contextXieText: "As the project's central figure, Xie Yuanding connects personal experience, university memory, and youth movement history through the digital avatar and source-based Q&A.",

    xieEyebrow: "Digital Avatar",
    xieTitle: "Xie Yuanding Digital Avatar",
    xieLede: "This page reserves space for Xie Yuanding's 3D avatar, source-based Q&A, interview materials, and educational presentation modules.",
    xieTalk: "Talk with Xie Yuanding",
    xieProfileTitle: "Profile",
    xieMoreHint: "Select a card to read the details",
    viewMore: "View details",
    xieProfileKicker: "Person and era",
    xieProfileSummary: "Understand Xie Yuanding through alumni, revolutionary, and congress records",
    xieProfileText: "The profile will use verifiable sources to organize Xie Yuanding's education, youth activism, relationship with Southeast University, and connection to the Second CYL Congress, while clearly marking unresolved details.",
    xieProfilePoint1: "Identity: name, dates, birthplace, education, and appointments",
    xieProfilePoint2: "Historical links: university experience, congress participation, and related activities",
    xieProfilePoint3: "Evidence: archives, university history, local records, and practice interviews",
    xieAbilityTitle: "Avatar Capabilities",
    xieAbilityKicker: "Digital interaction",
    xieAbilitySummary: "Bring the character, historical knowledge, and dialogue into one experience",
    xieAbilityText: "The avatar combines a 3D representation, a historical knowledge base, and a dialogue interface. Answers prioritize organized sources and clearly flag insufficient evidence rather than presenting conjecture as fact.",
    xieAbilityPoint1: "3D presentation: model rotation, zoom, and future motion playback",
    xieAbilityPoint2: "Source-based Q&A: retrieval across the person, Mei'an, and the congress with citations",
    xieAbilityPoint3: "Applications: web tours, project presentations, and university-history education",
    xieProgressTitle: "Build Progress",
    xieProgressText: "Can show modeling, knowledge-base preparation, voice design, and interaction prototype progress.",

    dialogueEyebrow: "Digital Avatar Prototype",
    dialogueTitle: "Talk with Xie Yuanding",
    dialogueLede: "This interface connects to `/api/chat/` to demonstrate source-based Q&A, insufficient-source warnings, and citation display.",
    modelBadge: "3D Model Area",
    avatarAlt: "Xie Yuanding digital portrait material",
    modelTitle: "Xie Yuanding 3D Avatar",
    modelText: "This area can later be replaced by a GLB/GLTF model viewer with rotation, zoom, narration, and character motion.",
    chatWindow: "Q&A Window",
    chatTitle: "Historical Q&A and Interview",
    chatLoading: "Loading",
    chatReady: "Demo Ready",
    chatGreeting: "Hello, I am the Xie Yuanding digital avatar prototype. Start with the questions below to learn about alumni identity, the Second CYL Congress, and Mei'an.",
    chatInput: "Type a follow-up question",
    chatSend: "Send",
    chatSending: "Sending",
    chatError: "The system cannot answer right now. Please try again later.",
    q1: "Who was Xie Yuanding?",
    q2: "How was Xie Yuanding connected to Southeast University?",
    q3: "Why did Xie Yuanding join the Second CYL Congress?",
    q4: "Why was the Second CYL Congress held at Mei'an?",
    q5: "What was the youth atmosphere at Nanjing Higher Normal School like?",
    q6: "What would you say to today's Southeast University students?",

    siteEyebrow: "Site Digitization",
    siteTitle: "A Reserved 3D Space for the Mei'an Site at Southeast University",
    siteLede: "The first version uses an architectural placeholder. It can later be replaced by photos, point-cloud results, 3D models, guide videos, or an interactive campus scene.",
    sitePlaceholder: "3D Scene Placeholder",
    siteAssetTitle: "Mei'an Site Digital Asset Entry",
    siteAssetText: "This area is designed for a future 3D scene, model viewer, or embedded exhibition. The current version keeps stable dimensions for replacement.",
    siteGuideTitle: "Spatial Guide",
    siteGuideText: "Reserved for points of interest, route nodes, exhibition narration, and campus-space relationships.",
    siteDigitalTitle: "Digital Assets",
    siteDigitalText: "Reserved for model files, textures, photos, survey records, and version notes.",

    archiveEyebrow: "Archive",
    archiveTitle: "Five-Year Outcome Overview",
    archiveLede: "Explore Tracing Mei'an year by year, from the project origin and digital exhibition to the 2026 Xie Yuanding avatar."
    ,archiveLoading: "Loading yearly outcomes"
    ,archiveErrorTitle: "Outcomes are temporarily unavailable"
    ,archiveErrorText: "Please try again later or return to the yearly overview"
    ,archiveEmptyTitle: "Outcomes are being organized"
    ,archiveEmptyText: "Yearly materials and images will appear when ready"
    ,retry: "Try again"
  }
};

const saved = typeof localStorage === "undefined" ? "zh" : localStorage.getItem("meian-lang");
const lang = ref(saved === "en" ? "en" : "zh");

if (typeof document !== "undefined") {
  document.documentElement.lang = lang.value === "zh" ? "zh-CN" : "en";
}

function setLang(nextLang) {
  lang.value = nextLang;
  if (typeof document !== "undefined") {
    document.documentElement.lang = nextLang === "zh" ? "zh-CN" : "en";
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("meian-lang", nextLang);
  }
}

function toggleLang() {
  setLang(lang.value === "zh" ? "en" : "zh");
}

function t(key) {
  return messages[lang.value][key] || messages.zh[key] || key;
}

const isEnglish = computed(() => lang.value === "en");

export function useI18n() {
  return {
    lang: readonly(lang),
    isEnglish,
    setLang,
    toggleLang,
    t
  };
}
