from django.core.management.base import BaseCommand

from meian.models import Project, Source, Tag


TAGS = [
    {"tag": "谢远定", "category": "人物", "description": "核心人物", "use_cases": "谢远定是谁、谢远定生平", "aliases": ["谢远定先生"], "enabled": True},
    {"tag": "团二大", "category": "会议", "description": "中国社会主义青年团第二次全国代表大会", "use_cases": "团二大意义、参会背景", "aliases": ["青年团二大"], "enabled": True},
    {"tag": "梅庵", "category": "地点/空间", "description": "团二大召开地点和项目精神线索", "use_cases": "团二大为何在梅庵召开", "aliases": ["梅庵旧址"], "enabled": True},
    {"tag": "南京高师", "category": "学校", "description": "南京高等师范学校，东南大学校史前身之一", "use_cases": "谢远定求学、东大关联", "aliases": ["南京高等师范", "南高师"], "enabled": True},
    {"tag": "东南大学", "category": "学校", "description": "当前学校与校史主体", "use_cases": "东大青年、校史传承", "aliases": ["东大"], "enabled": True},
    {"tag": "东大校友", "category": "身份", "description": "谢远定与东大关联", "use_cases": "百年前东大青年叙事", "aliases": ["校友"], "enabled": True},
    {"tag": "南京", "category": "地点", "description": "团二大、梅庵、学校所在地", "use_cases": "南京党团组织背景", "aliases": [], "enabled": True},
    {"tag": "青年运动", "category": "主题", "description": "早期青年组织和革命活动", "use_cases": "青年责任、历史背景", "aliases": ["青年责任"], "enabled": True},
    {"tag": "生平", "category": "主题", "description": "人物经历", "use_cases": "谢远定是谁", "aliases": ["人物经历"], "enabled": True},
    {"tag": "资料不足", "category": "边界", "description": "资料不足或无法确认", "use_cases": "不确定问题", "aliases": ["不确定"], "enabled": True},
    {"tag": "诱导编造", "category": "边界", "description": "用户要求编造史料、原话或亲历细节", "use_cases": "拒绝编造", "aliases": ["编一段", "假设他说过"], "enabled": True},
    {"tag": "技术项目", "category": "项目", "description": "用户询问网站、AI、数字分身技术", "use_cases": "项目技术介绍", "aliases": ["网站", "接口", "模型"], "enabled": True},
]

SOURCES = [
    {
        "title": "谢远定数字分身人物资料占位",
        "person": "谢远定",
        "topic": "生平",
        "period": "1923年前后",
        "location": "南京",
        "content": "该资料用于说明谢远定作为本项目重点呈现的东南大学校友人物。正式史料入库后，应补充其生平、求学经历、青年组织经历和来源出处。当前内容为系统联调占位，不能作为最终史实引用。",
        "source_name": "项目示例数据",
        "source_url": "",
        "tags": ["谢远定", "生平", "东大校友"],
        "usable_for_qa": True,
        "note": "示例行，正式上线前需替换为核验史料。",
    },
    {
        "title": "梅庵与团二大关系资料占位",
        "person": "无",
        "topic": "团二大",
        "period": "1923年前后",
        "location": "南京",
        "content": "该资料用于说明梅庵作为项目叙事中的历史空间线索，与团二大历史记忆、东南大学校园文化和青年实践主题之间的关系。正式版本需要补充可靠来源、会议背景和地点说明。",
        "source_name": "项目示例数据",
        "source_url": "",
        "tags": ["梅庵", "团二大", "南京", "青年运动"],
        "usable_for_qa": True,
        "note": "示例行，正式上线前需替换为核验史料。",
    },
    {
        "title": "南京高师与东南大学校史关联占位",
        "person": "无",
        "topic": "校史",
        "period": "近现代",
        "location": "南京",
        "content": "该资料用于说明南京高师、东南大学校史和项目人物叙事之间的关联。问答系统可据此回答东大关联类问题，但正式版本应替换为校史馆、官方资料或正式出版物来源。",
        "source_name": "项目示例数据",
        "source_url": "",
        "tags": ["南京高师", "东南大学", "东大校友"],
        "usable_for_qa": True,
        "note": "示例行，正式上线前需替换为核验史料。",
    },
]

PROJECTS = [
    {
        "year": 2022,
        "slug": "2022",
        "title": "项目起点：追寻团二大代表足迹",
        "subtitle": "从红色寻访开始，建立谢远定人物线索和项目实践基地。",
        "summary": "2022 年，寻迹梅庵实践团围绕团二大主题开展社会实践，从襄阳、黄冈、常州回到南京梅庵，追寻团二大代表红色足迹，整理谢远定早期事迹，并推动东南大学-襄阳团市委社会实践基地建设。",
        "directions": ["红色寻访", "人物史料", "实践基地"],
        "cities": ["襄阳", "黄冈", "常州", "南京"],
        "outputs": ["访谈纪录片", "寻访路线", "实践基地", "口述史料"],
        "images": [{"title": "2022 项目资料占位", "path": "/assets/images/placeholder-media.svg"}],
        "links": [],
        "highlights": ["访谈纪录片《寻迹梅庵》", "东南大学-襄阳团市委社会实践基地", "谢远定早期事迹资料整理", "林育英相关口述史料采集"],
        "detail_sections": [
            {"title": "寻访路径", "body": "实践团成员从全国多个城市出发，汇聚于荆楚之地，从襄阳到黄冈，再到常州，最终回到南京梅庵，一路向东追寻团二大代表的红色足迹。"},
            {"title": "人物线索", "body": "襄阳人谢远定是团二大代表中与东南大学校史相关的重要人物。团队以其家乡和早期事迹为纽带，整理出后续数字分身建设所需的人物资料基础。"},
            {"title": "实践基地", "body": "团队牵线共青团襄阳市委员会，共同建立东南大学首个社会实践基地，让新时代东大人继续追寻谢远定学长的足迹。"}
        ],
        "inheritance_value": "2022 年奠定谢远定数字分身的人物数据基础、情感锚点和“人物 + 地域”联动模式。",
        "reusable_assets": "可复用人物资料、口述史料、寻访路线和实践基地资源。",
    },
    {
        "year": 2023,
        "slug": "2023",
        "title": "数字梅庵展馆",
        "subtitle": "以三维建模和 VR 全景打造沉浸式梅庵记忆。",
        "summary": "2023 年，实践团立足专业知识，深挖梅庵故事，历时两月建成数字梅庵展馆。团队多次实地勘测梅庵，手绘平面草图，完成三维模型和 VR 全景制作。",
        "directions": ["数字梅庵", "三维建模", "VR 全景"],
        "cities": ["南京"],
        "outputs": ["数字展馆", "三维模型", "VR 全景", "测绘资料"],
        "images": [{"title": "数字梅庵展馆占位", "path": "/assets/images/placeholder-hero.svg"}],
        "links": [{"title": "数字梅庵展馆", "url": "https://www.720yun.com/vr/658jOzey5w8"}],
        "highlights": ["实地勘测梅庵", "手绘梅庵平面草图", "500 余小时建模", "28 次内容修改", "VR 全景展馆上线"],
        "detail_sections": [
            {"title": "实地勘测", "body": "团队成员集体自学测绘学和建筑学知识，多次走进梅庵展馆，实地测量建筑尺寸并收集团二大史料展素材。"},
            {"title": "匠心建模", "body": "团队放弃简单全景照片方案，使用专业软件建立梅庵三维模型，从建筑细节到材质反光都力求真实。"},
            {"title": "VR 展馆", "body": "在三维模型基础上，团队完成 VR 全景制作，突破传统图文排列模式，强化沉浸式体验。"}
        ],
        "inheritance_value": "2023 年提供了建模、渲染、VR 交互等技术原型，也积累了数字展馆的体验设计经验。",
        "reusable_assets": "可复用 720 云链接、空间叙事经验、三维模型流程和数字展馆组织方式。",
    },
    {
        "year": 2024,
        "slug": "2024",
        "title": "梅庵元宇宙与智能导览",
        "subtitle": "从数字场馆调研走向 UE5 场景、VR 体验和语音导览。",
        "summary": "2024 年，实践团在前两年基础上探索梅庵元宇宙，前往南京、镇江、常州、无锡、苏州调研数字场馆，基于 UE5 复现梅庵故园风貌，并搭建线下语音导览系统。",
        "directions": ["梅庵元宇宙", "UE5 场景", "VR 设备", "语音导览"],
        "cities": ["南京", "镇江", "常州", "无锡", "苏州"],
        "outputs": ["UE5 场景", "VR 叙事方案", "语音导览系统", "调研材料"],
        "images": [{"title": "2024 项目资料占位", "path": "/assets/images/placeholder-media.svg"}],
        "links": [],
        "highlights": ["五地数字场馆调研", "UE5 梅庵故园场景", "蓝图触发文字交互", "Pico VR 设备方案", "线下语音导览系统"],
        "detail_sections": [
            {"title": "数字场馆调研", "body": "团队前往多地红色场馆和数字产品体验馆，观察 AR、3DVR、全景场景制作等技术在实体场馆中的应用。"},
            {"title": "梅庵元宇宙", "body": "团队基于 UE5 复现百年前梅庵故园风貌，并通过触发文字的方式增强参观者沉浸感。"},
            {"title": "智能导览", "body": "团队基于讲解文案切割点位，利用 AI 技术生成适配语音，并转化为二维码导览入口。"}
        ],
        "inheritance_value": "2024 年深化了“数字人 + 场景”融合能力，为 2026 数字分身的场景叙事、触发式对话和自动讲解提供技术支撑。",
        "reusable_assets": "可复用 UE5 场景经验、VR 设备方案、点位讲解逻辑和跨场馆调研资料。",
    },
    {
        "year": 2025,
        "slug": "2025",
        "title": "AI 浪潮下的红色历史青年叙事",
        "subtitle": "以梅小安虚拟形象和知识库问答预演数字分身技术链路。",
        "summary": "2025 年，实践团前往广州、长沙、常州三地调研，制作纪录片《走向梅庵：青年思想长征》，并打造虚拟形象“梅小安”和梅庵 AI 虚拟智能体小程序。",
        "directions": ["AI 智能体", "青年叙事", "虚拟形象", "知识库"],
        "cities": ["广州", "长沙", "常州"],
        "outputs": ["主题纪录片", "梅小安虚拟形象", "知识库问答", "小程序交互界面"],
        "images": [{"title": "2025 项目资料占位", "path": "/assets/images/placeholder-hero.svg"}],
        "links": [],
        "highlights": ["三地红色调研", "纪录片《走向梅庵：青年思想长征》", "Blender 建模梅小安", "Spark-TTS 语音", "DeepSeek-R1 知识库问答"],
        "detail_sections": [
            {"title": "青年思想长征", "body": "团队从广州团一大纪念馆、长沙毛泽东故居、常州瞿秋白纪念馆出发，串联青年运动从萌芽到成熟的精神脉络。"},
            {"title": "梅小安虚拟形象", "body": "团队使用 Blender 从设计图出发建立梅小安白模，反复调整面部拓扑与细节，为红色传播塑造新载体。"},
            {"title": "AI 智能体", "body": "团队将团二大展览讲解词、梅庵红色史料汇编等文本导入系统，结合国产大模型和语音模型完成问答与语音输出。"}
        ],
        "inheritance_value": "2025 年几乎完整预演了数字分身技术链路，为 2026 谢远定数字分身提供建模、知识库、语音交互和人物 IP 化经验。",
        "reusable_assets": "可复用 AI 智能体链路、垂直知识库经验、小程序交互设计和青年叙事方法。",
    },
    {
        "year": 2026,
        "slug": "2026",
        "title": "谢远定数字分身与寻迹梅庵综合网站",
        "subtitle": "五年成果汇聚为可访问、可交互、可持续扩展的数字实践平台。",
        "summary": "2026 年，项目把前四年的人物史料、空间建模、VR 叙事和 AI 智能体经验整合为谢远定数字分身与综合网站，形成史料问答、模型展示、年度成果归档和公网部署链路。",
        "directions": ["数字分身", "史料问答", "3D 模型", "综合网站"],
        "cities": ["南京"],
        "outputs": ["Vue 网站", "Django API", "SQLite 资料库", "模型展示", "问答原型"],
        "images": [
            {"title": "2026 数字分身占位", "path": "/assets/images/placeholder-media.svg"},
            {"title": "谢远定人物头像素材", "path": "/assets/projects/2026/xie-yuanding-portrait.jpg"},
            {"title": "谢远定人物全身素材", "path": "/assets/projects/2026/xie-yuanding-fullbody.jpg"}
        ],
        "links": [],
        "highlights": ["谢远定数字分身", "史料问答接口", "3D 模型展示位", "五年成果归档", "公网部署网站"],
        "detail_sections": [
            {"title": "数字分身", "body": "以谢远定为核心人物，整合人物史料、形象素材、问答能力和展示页面，形成数字分身原型。"},
            {"title": "综合网站", "body": "网站使用 Vue + Vite 构建前端，Django REST Framework 提供接口，SQLite 保存史料、标签和年度成果。"},
            {"title": "五年集成", "body": "首页星图、年度详情页、模型页和对话页共同承载 2022-2026 的项目递进关系。"}
        ],
        "inheritance_value": "2026 年是五年成果的综合落点，把线下调研、数字展馆、VR 场景和 AI 智能体经验汇聚成可访问的网站与数字分身。",
        "reusable_assets": "沉淀 Vue 前端、Django 接口、SQLite 史料库、模型展示链路和部署配置。",
    },
]


class Command(BaseCommand):
    help = "Seed demo tags, sources, and projects for first-version integration."

    def handle(self, *args, **options):
        for row in TAGS:
            Tag.objects.update_or_create(tag=row["tag"], defaults=row)
        for row in SOURCES:
            Source.objects.update_or_create(title=row["title"], defaults=row)
        for row in PROJECTS:
            Project.objects.update_or_create(year=row["year"], defaults=row)
        self.stdout.write(self.style.SUCCESS("Seeded demo data."))
