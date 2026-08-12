from dataclasses import dataclass
import re

from django.conf import settings

from .models import Source, Tag


ERROR_MESSAGES = {
    "EMPTY_QUESTION": "请输入问题",
    "QUESTION_TOO_LONG": "问题过长，请简化后重试",
    "MODEL_TIMEOUT": "系统暂时无法回答，请稍后重试",
    "MODEL_ERROR": "系统暂时无法回答，请稍后重试",
    "NO_SOURCE": "现有资料不足，不能确定",
    "INVALID_ROUTE": "系统正在调整检索，请稍后重试",
}


@dataclass
class Route:
    tags: list[str]
    question_type: str
    need_refusal: bool = False


def tokenize(text):
    return [token for token in re.split(r"[\s，。？！、；：,.!?;:]+", text) if token]


def route_question(question):
    tags = list(Tag.objects.filter(enabled=True))
    selected = []
    lowered = question.lower()

    for item in tags:
        candidates = [item.tag, *item.aliases]
        if any(candidate and candidate.lower() in lowered for candidate in candidates):
            selected.append(item.tag)

    if any(word in question for word in ["编一段", "假设他说过", "伪造", "原话"]):
        selected.append("诱导编造")
        return Route(tags=unique_tags(selected)[:6], question_type="诱导编造", need_refusal=True)

    if not selected:
        if any(word in question for word in ["网站", "接口", "模型", "技术", "部署"]):
            selected.append("技术项目")
        else:
            selected.append("资料不足")

    return Route(tags=unique_tags(selected)[:6], question_type=guess_question_type(question))


def unique_tags(tags):
    result = []
    for tag in tags:
        if tag and tag not in result:
            result.append(tag)
    return result


def guess_question_type(question):
    if "东南大学" in question or "东大" in question or "南京高师" in question:
        return "东大关联"
    if "团二大" in question:
        return "团二大关联"
    if "梅庵" in question:
        return "梅庵关联"
    if "今天" in question or "当代" in question:
        return "当代对话"
    return "人物生平"


def search_sources(question, route):
    tokens = tokenize(question)
    scored = []

    for source in Source.objects.filter(usable_for_qa=True):
        score = 0
        source_tags = source.tags or []
        for tag in route.tags:
            if tag in source_tags:
                score += 5
        for token in tokens:
            if token and token in source.title:
                score += 4
            if token and token in source_tags:
                score += 3
            if token and token in source.content:
                score += 2
        if score > 0:
            scored.append((score, source))

    scored.sort(key=lambda item: item[0], reverse=True)
    return [source for _, source in scored[:8]]


def source_payload(source):
    quote = source.content[:180]
    if len(source.content) > 180:
        quote += "..."
    return {
        "id": source.id,
        "title": source.title,
        "source_name": source.source_name,
        "source_url": source.source_url,
        "quote": quote,
    }


def error_response(code):
    return {
        "answer": "",
        "confidence": "low",
        "warning": "error",
        "error": {
            "code": code,
            "message": ERROR_MESSAGES.get(code, "系统暂时无法回答，请稍后重试"),
        },
        "route": {
            "tags": [],
            "question_type": "",
            "need_refusal": False,
        },
        "sources": [],
    }


def placeholder_answer(question, route, sources):
    if route.need_refusal or "诱导编造" in route.tags:
        return "这个问题涉及编造史料、原话或亲历细节。为了避免虚构历史，我不能这样回答；可以改问已有资料能够支持的生平、团二大或东大关联问题。"

    if not sources:
        return "现有资料不足，不能确定。后续需要补充经过核验的史料来源后，才能给出更完整的回答。"

    source_titles = "、".join(source.title for source in sources[:3])
    return (
        f"根据当前史料库中与“{question}”相关的资料，系统检索到了 {source_titles}。"
        "首版占位回答会先说明可确认的信息，并把依据列在下方；接入真实大模型后，将基于这些资料生成更自然的数字分身回答。"
    )


def answer_question(question):
    question = (question or "").strip()
    if not question:
        return error_response("EMPTY_QUESTION")
    if len(question) > 300:
        return error_response("QUESTION_TOO_LONG")

    route = route_question(question)
    sources = [] if route.need_refusal else search_sources(question, route)

    if not sources and not route.need_refusal:
        return {
            "answer": placeholder_answer(question, route, sources),
            "confidence": "low",
            "warning": ERROR_MESSAGES["NO_SOURCE"],
            "route": {
                "tags": route.tags,
                "question_type": route.question_type,
                "need_refusal": route.need_refusal,
            },
            "sources": [],
        }

    answer = placeholder_answer(question, route, sources)
    confidence = "medium" if sources else "low"
    if settings.LLM_API_KEY and settings.LLM_BASE_URL and settings.LLM_MODEL:
        answer = answer + "（真实大模型适配器已配置，后续可在此处替换为外部 API 调用结果。）"

    return {
        "answer": answer,
        "confidence": confidence,
        "warning": "",
        "route": {
            "tags": route.tags,
            "question_type": route.question_type,
            "need_refusal": route.need_refusal,
        },
        "sources": [source_payload(source) for source in sources],
    }
