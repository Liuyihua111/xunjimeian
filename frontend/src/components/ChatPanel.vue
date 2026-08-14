<template>
  <aside class="chat-panel" aria-label="问答窗口">
    <div class="chat-header">
      <div>
        <p class="eyebrow">{{ t("chatWindow") }}</p>
        <h2>{{ t("chatTitle") }}</h2>
      </div>
      <span class="status-pill">{{ loading ? t("chatLoading") : t("chatReady") }}</span>
    </div>

    <div class="chat-log" ref="chatLog" tabindex="0" aria-live="polite">
      <div class="message bot">{{ t("chatGreeting") }}</div>
      <template v-for="message in messages" :key="message.id">
        <div :class="['message', message.type]" :data-message-id="message.id">
          <span v-if="message.type === 'bot'" class="answer-label">{{ t("chatAnswerLabel") }}</span>
          <span class="message-text">{{ message.text }}</span>
        </div>
        <div v-if="message.warning" class="warning-message">{{ message.warning }}</div>
        <button
          v-if="message.sources?.length"
          class="evidence-trigger"
          type="button"
          :aria-expanded="activeEvidenceId === message.id"
          aria-controls="evidence-drawer"
          @click="toggleEvidence(message.id)"
        >
          <span>
            <span class="evidence-heading">
              <strong>{{ t("chatEvidenceTitle") }}</strong>
              <small>{{ message.sources.length }} {{ t("chatEvidenceCount") }}</small>
            </span>
          </span>
          <span class="evidence-trigger-action">
            {{ activeEvidenceId === message.id ? t("chatEvidenceClose") : t("chatEvidenceOpen") }}
          </span>
        </button>
      </template>
    </div>

    <div class="prompt-grid">
      <button v-for="prompt in prompts" :key="prompt.key" type="button" @click="submitQuestion(prompt.label, prompt.query)">{{ prompt.label }}</button>
    </div>

    <form class="chat-input" @submit.prevent="submitQuestion(input)">
      <input v-model="input" type="text" maxlength="300" :placeholder="t('chatInput')">
      <button type="submit" :disabled="loading">{{ loading ? t("chatSending") : t("chatSend") }}</button>
    </form>
  </aside>

  <Transition name="evidence-drawer">
    <aside
      v-if="activeEvidence"
      id="evidence-drawer"
      class="evidence-drawer"
      :aria-label="t('chatEvidenceTitle')"
    >
      <header class="evidence-drawer-header">
        <div>
          <p class="eyebrow">{{ t("chatEvidenceTitle") }}</p>
          <h2>{{ activeEvidence.sources.length }} {{ t("chatEvidenceCount") }}</h2>
        </div>
        <button type="button" class="evidence-drawer-close" @click="closeEvidence">
          {{ t("chatEvidenceClose") }}
        </button>
      </header>
      <div class="evidence-drawer-content">
        <p class="evidence-note">{{ t("chatEvidenceNote") }}</p>
        <div class="source-list">
          <article v-for="source in activeEvidence.sources" :key="source.id || source.title" class="source-card">
            <h3>{{ source.title }}</h3>
            <p>{{ source.quote }}</p>
            <a v-if="source.source_url" :href="source.source_url" target="_blank" rel="noreferrer">{{ source.source_name }}</a>
            <span v-else>{{ source.source_name }}</span>
          </article>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { askQuestion } from "../api.js";
import { useI18n } from "../i18n.js";

const { t } = useI18n();
const promptQueries = {
  q1: "谢远定是谁？",
  q2: "谢远定和东南大学有什么关系？",
  q3: "谢远定为什么参加团二大？",
  q4: "团二大为什么在梅庵召开？",
  q5: "当时南京高师的青年氛围是什么样的？",
  q6: "你想对今天的东大学生说什么？"
};
const prompts = computed(() => Object.keys(promptQueries).map((key) => ({
  key,
  label: t(key),
  query: promptQueries[key]
})));

const input = ref("");
const loading = ref(false);
const messages = ref([]);
const chatLog = ref(null);
const activeEvidenceId = ref(null);
const activeEvidence = computed(() => messages.value.find((message) => message.id === activeEvidenceId.value) || null);
let id = 0;

function pushMessage(payload) {
  const messageId = id += 1;
  messages.value.push({ id: messageId, ...payload });
  return messageId;
}

async function scrollToBottom() {
  await nextTick();
  if (chatLog.value) {
    chatLog.value.scrollTop = chatLog.value.scrollHeight;
  }
}

async function scrollToMessage(messageId) {
  await nextTick();
  const target = chatLog.value?.querySelector(`[data-message-id="${messageId}"]`);
  if (target && chatLog.value) {
    chatLog.value.scrollTo({ top: Math.max(0, target.offsetTop - 12), behavior: "smooth" });
  }
}

function toggleEvidence(messageId) {
  activeEvidenceId.value = activeEvidenceId.value === messageId ? null : messageId;
}

function closeEvidence() {
  activeEvidenceId.value = null;
}

async function submitQuestion(rawQuestion, queryOverride = "") {
  const displayQuestion = rawQuestion.trim();
  const apiQuestion = (queryOverride || rawQuestion).trim();
  if (!displayQuestion || !apiQuestion || loading.value) return;
  closeEvidence();
  input.value = "";
  pushMessage({ type: "user", text: displayQuestion });
  loading.value = true;
  await scrollToBottom();

  let answerId;
  try {
    const data = await askQuestion(apiQuestion);
    answerId = pushMessage({
      type: "bot",
      text: data.answer || data.error?.message || t("chatError"),
      warning: data.warning && data.warning !== "error" ? data.warning : "",
      sources: data.sources || []
    });
  } catch (error) {
    answerId = pushMessage({ type: "bot", text: t("chatError") });
  } finally {
    loading.value = false;
    await scrollToMessage(answerId);
  }
}
</script>
