<template>
  <aside v-reveal="160" class="chat-panel" aria-label="问答窗口">
    <div class="chat-header">
      <div>
        <p class="eyebrow">{{ t("chatWindow") }}</p>
      </div>
      <span class="status-pill">{{ loading ? t("chatLoading") : t("chatReady") }}</span>
    </div>

    <div class="chat-log" ref="chatLog" tabindex="0" aria-live="polite" :aria-busy="loading">
      <div class="message bot">{{ t("chatGreeting") }}</div>
      <template v-for="message in messages" :key="message.id">
        <div :class="['message', message.type]" :data-message-id="message.id">
          <div v-if="message.type === 'bot'" class="answer-toolbar">
            <span class="answer-label">{{ t("chatAnswerLabel") }}</span>
            <button
              v-if="message.speakable"
              type="button"
              :class="['speech-button', `is-${message.speechStatus}`]"
              :disabled="message.speechStatus === 'loading' || (speechBusyId && speechBusyId !== message.id)"
              :aria-label="speechButtonLabel(message)"
              @click="toggleSpeech(message)"
            >
              <span class="speech-button-mark" aria-hidden="true">{{ speechButtonMark(message) }}</span>
              <span>{{ speechButtonLabel(message) }}</span>
            </button>
          </div>
          <span class="message-text">{{ message.text }}</span>
          <span v-if="message.speechError" class="speech-error" role="status">{{ message.speechError }}</span>
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
      <div v-if="loading" class="message bot chat-answer-skeleton" role="status">
        <span class="chat-skeleton-kicker">{{ t("chatLoading") }}</span>
        <span class="chat-skeleton-line is-long"></span>
        <span class="chat-skeleton-line"></span>
        <span class="chat-skeleton-line is-short"></span>
      </div>
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
      v-reveal
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
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { askQuestion, generateSpeech } from "../api.js";
import { useI18n } from "../i18n.js";

const { isEnglish, t } = useI18n();
const promptQueries = {
  q1: "谢远定是谁？",
  q2: "谢远定和东南大学有什么关系？",
  q3: "谢远定为什么参加团二大？"
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
const speechBusyId = ref(null);
const activeEvidence = computed(() => messages.value.find((message) => message.id === activeEvidenceId.value) || null);
const speechCopy = computed(() => isEnglish.value ? {
  idle: "Play answer",
  loading: "Generating",
  playing: "Stop audio",
  error: "Retry audio",
  unavailable: "Voice playback is temporarily unavailable. Please try again later.",
  playback: "The audio could not be played. Please try again."
} : {
  idle: "播放回答",
  loading: "生成中",
  playing: "停止播放",
  error: "重试语音",
  unavailable: "语音服务暂时不可用，请稍后重试",
  playback: "音频播放失败，请重试"
});
let id = 0;
let activeAudio = null;
let activeSpeechId = null;
let speechGeneration = 0;

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

function speechButtonLabel(message) {
  return speechCopy.value[message.speechStatus] || speechCopy.value.idle;
}

function speechButtonMark(message) {
  if (message.speechStatus === "loading") return "…";
  if (message.speechStatus === "playing") return "■";
  return "▷";
}

function findMessage(messageId) {
  return messages.value.find((message) => message.id === messageId);
}

function stopActiveAudio(resetStatus = true) {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio.onended = null;
    activeAudio.onerror = null;
    activeAudio = null;
  }

  if (resetStatus && activeSpeechId) {
    const previousMessage = findMessage(activeSpeechId);
    if (previousMessage?.speechStatus === "playing") previousMessage.speechStatus = "idle";
  }
  activeSpeechId = null;
}

function resetSpeech() {
  speechGeneration += 1;
  stopActiveAudio();
  if (speechBusyId.value) {
    const pendingMessage = findMessage(speechBusyId.value);
    if (pendingMessage?.speechStatus === "loading") pendingMessage.speechStatus = "idle";
  }
  speechBusyId.value = null;
}

async function playSpeech(message) {
  stopActiveAudio();
  message.speechError = "";
  const audio = new Audio(message.audioUrl);
  activeAudio = audio;
  activeSpeechId = message.id;
  message.speechStatus = "playing";

  audio.onended = () => {
    if (activeAudio !== audio) return;
    message.speechStatus = "idle";
    activeAudio = null;
    activeSpeechId = null;
  };
  audio.onerror = () => {
    if (activeAudio !== audio) return;
    message.speechStatus = "error";
    message.speechError = speechCopy.value.playback;
    activeAudio = null;
    activeSpeechId = null;
  };

  try {
    await audio.play();
  } catch {
    if (activeAudio === audio) {
      stopActiveAudio(false);
      message.speechStatus = "error";
      message.speechError = speechCopy.value.playback;
    }
  }
}

async function toggleSpeech(message) {
  if (message.speechStatus === "loading") return;
  if (message.speechStatus === "playing") {
    stopActiveAudio();
    return;
  }
  if (speechBusyId.value && speechBusyId.value !== message.id) return;

  if (message.audioUrl) {
    await playSpeech(message);
    return;
  }

  stopActiveAudio();
  const requestGeneration = ++speechGeneration;
  speechBusyId.value = message.id;
  message.speechStatus = "loading";
  message.speechError = "";

  try {
    const data = await generateSpeech(message.text);
    if (requestGeneration !== speechGeneration) return;
    message.audioUrl = data.audio_url;
    await playSpeech(message);
  } catch (error) {
    if (requestGeneration !== speechGeneration) return;
    message.speechStatus = "error";
    message.speechError = error.userMessage || speechCopy.value.unavailable;
  } finally {
    if (speechBusyId.value === message.id) speechBusyId.value = null;
  }
}

async function submitQuestion(rawQuestion, queryOverride = "") {
  const displayQuestion = rawQuestion.trim();
  const apiQuestion = (queryOverride || rawQuestion).trim();
  if (!displayQuestion || !apiQuestion || loading.value) return;
  resetSpeech();
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
      sources: data.sources || [],
      speakable: true,
      speechStatus: "idle",
      speechError: "",
      audioUrl: ""
    });
  } catch (error) {
    answerId = pushMessage({ type: "bot", text: t("chatError"), speakable: false });
  } finally {
    loading.value = false;
    await scrollToMessage(answerId);
  }
}

onBeforeUnmount(resetSpeech);
</script>
