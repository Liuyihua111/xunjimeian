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
    keywordMeian: "梅庵",
    keywordTuan: "团二大",
    keywordXie: "谢远定",
    slideMeian: "梅庵主题影像占位",
    slideXie: "谢远定数字人素材占位",
    slidePractice: "社会实践成果照片占位",
    slideSite: "梅庵旧址建模参考占位",
    meianEyebrow: "梅庵",
    meianTitle: "东南大学校园中的历史文化场域",
    meianText: "梅庵位于东南大学四牌楼校区，是承载校史记忆、教育传统与文化传承的重要空间 本项目以梅庵为寻迹起点，连接人物、建筑与青年实践",
    tuanEyebrow: "团二大",
    tuanTitle: "青年理想与时代行动的历史坐标",
    tuanText: "团二大相关历史为项目提供了理解青年使命、校友担当与革命记忆的重要线索 后续将补充正式史料、时间线与实践队研究成果",
    homeFocusEyebrow: "今年重点",
    homeFocusTitle: "2026 年把五年积累汇聚成可交互成果",
    homeCard1Title: "谢远定先生数字人",
    homeCard1Text: "预留 3D 建模、人物访谈、史料问答与数字展陈入口",
    homeCard2Title: "2024 梅庵元宇宙",
    homeCard2Text: "把梅庵旧址数字化、UE5 场景、VR 体验与语音导览放入对应年度成果中展示",
    homeCard3Title: "实践成果沉淀",
    homeCard3Text: "集中呈现五年社会实践成果、调研记录、影像资料与展示材料",

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
    contextTitle: "梅庵与团二大：项目叙事的两条历史线索",
    contextLede: "本页用于放置梅庵旧址、团二大历史背景及二者与谢远定先生、东南大学校友精神之间的关系说明。",
    contextXieTitle: "谢远定先生数字人建设的叙事支点",
    contextXieText: "谢远定先生作为项目重点人物，将通过数字人、史料问答与展示内容，把个体经历、学校记忆和青年运动历史联系起来。",

    xieEyebrow: "数字人建设",
    xieTitle: "谢远定先生数字人展示入口",
    xieLede: "本页预留谢远定先生 3D 数字人、史料问答、人物访谈与教学展示入口。首版以占位结构呈现，等待模型与知识材料接入。",
    xieTalk: "与谢远定对话",
    xieProfileTitle: "人物档案",
    xieProfileText: "预留姓名、身份、在校经历、团二大相关经历、史料出处等结构化信息。",
    xieAbilityTitle: "数字人能力",
    xieAbilityText: "支持史料问答、出处展示、人物叙事和答辩演示。首版后端提供占位 LLM 适配器，后续可替换为真实大模型。",
    xieProgressTitle: "建设进度",
    xieProgressText: "可用于展示建模、知识库整理、语音形象、交互原型等阶段成果。",

    dialogueEyebrow: "数字人交互原型",
    dialogueTitle: "与谢远定对话",
    dialogueLede: "此界面接入 `/api/chat/`，用于演示基于史料的问答、资料不足提示和参考出处展示。",
    modelBadge: "3D 建模展示位",
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
    keywordMeian: "Mei'an",
    keywordTuan: "CYL II",
    keywordXie: "Xie Yuanding",
    slideMeian: "Mei'an visual placeholder",
    slideXie: "Xie Yuanding avatar material placeholder",
    slidePractice: "Practice outcome photo placeholder",
    slideSite: "Mei'an modeling reference placeholder",
    meianEyebrow: "Mei'an",
    meianTitle: "A historical and cultural site on the Southeast University campus",
    meianText: "Located on Southeast University's Sipailou campus, Mei'an carries campus memory, educational traditions, and cultural inheritance The project uses Mei'an as the starting point for tracing people, architecture, and youth practice",
    tuanEyebrow: "Second CYL Congress",
    tuanTitle: "A historical coordinate for youth ideals and action",
    tuanText: "The history of the Second CYL Congress helps the project interpret youth responsibility, alumni commitment, and revolutionary memory More verified sources, timelines, and research outcomes will be added later",
    homeFocusEyebrow: "2026 Focus",
    homeFocusTitle: "Turning Five Years of Work into an Interactive Outcome",
    homeCard1Title: "Xie Yuanding Digital Avatar",
    homeCard1Text: "Reserved for 3D modeling, character interview, source-based Q&A, and digital exhibition entry points",
    homeCard2Title: "2024 Mei'an Metaverse",
    homeCard2Text: "Mei'an site digitization, UE5 scenes, VR, and voice guide work now live under the yearly outcome page",
    homeCard3Title: "Practice Archive",
    homeCard3Text: "Collecting five years of practice outcomes, research notes, visual records, and presentation materials",

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
    contextTitle: "Mei'an and the Second CYL Congress: two historical threads",
    contextLede: "This page introduces the Mei'an site, the historical background of the Second CYL Congress, and their relationship with Xie Yuanding and Southeast University's alumni spirit.",
    contextXieTitle: "A narrative anchor for the Xie Yuanding digital avatar",
    contextXieText: "As the project's central figure, Xie Yuanding connects personal experience, university memory, and youth movement history through the digital avatar and source-based Q&A.",

    xieEyebrow: "Digital Avatar",
    xieTitle: "Entry Point for the Xie Yuanding Digital Avatar",
    xieLede: "This page reserves space for Xie Yuanding's 3D avatar, source-based Q&A, interview materials, and educational presentation modules.",
    xieTalk: "Talk with Xie Yuanding",
    xieProfileTitle: "Profile",
    xieProfileText: "Reserved for name, identity, university experience, Second CYL Congress context, and historical sources.",
    xieAbilityTitle: "Avatar Capabilities",
    xieAbilityText: "Supports source-based Q&A, citation display, character narration, and presentation demos. The first version uses a placeholder LLM adapter that can later be replaced.",
    xieProgressTitle: "Build Progress",
    xieProgressText: "Can show modeling, knowledge-base preparation, voice design, and interaction prototype progress.",

    dialogueEyebrow: "Digital Avatar Prototype",
    dialogueTitle: "Talk with Xie Yuanding",
    dialogueLede: "This interface connects to `/api/chat/` to demonstrate source-based Q&A, insufficient-source warnings, and citation display.",
    modelBadge: "3D Model Area",
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
