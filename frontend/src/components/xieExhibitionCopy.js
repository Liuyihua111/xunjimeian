import { computed } from "vue";
import { useI18n } from "../i18n.js";

export function useXieExhibitionCopy() {
  const { isEnglish } = useI18n();
  return computed(() => isEnglish.value ? {

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
      sourceNanjing: "Nanjing Party History Office"
  } : {

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
    sourceNanjing: "南京党史网"
  });
}
