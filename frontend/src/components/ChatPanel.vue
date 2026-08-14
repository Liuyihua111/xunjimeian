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
        <div :class="['message', message.type]">{{ message.text }}</div>
        <div v-if="message.warning" class="warning-message">{{ message.warning }}</div>
        <div v-if="message.sources?.length" class="source-list">
          <article v-for="source in message.sources" :key="source.id || source.title" class="source-card">
            <h3>{{ source.title }}</h3>
            <p>{{ source.quote }}</p>
            <a v-if="source.source_url" :href="source.source_url" target="_blank" rel="noreferrer">{{ source.source_name }}</a>
            <span v-else>{{ source.source_name }}</span>
          </article>
        </div>
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
let id = 0;

function pushMessage(payload) {
  messages.value.push({ id: id += 1, ...payload });
}

async function scrollToBottom() {
  await nextTick();
  if (chatLog.value) {
    chatLog.value.scrollTop = chatLog.value.scrollHeight;
  }
}

async function submitQuestion(rawQuestion, queryOverride = "") {
  const displayQuestion = rawQuestion.trim();
  const apiQuestion = (queryOverride || rawQuestion).trim();
  if (!displayQuestion || !apiQuestion || loading.value) return;
  input.value = "";
  pushMessage({ type: "user", text: displayQuestion });
  loading.value = true;
  await scrollToBottom();

  try {
    const data = await askQuestion(apiQuestion);
    pushMessage({
      type: "bot",
      text: data.answer || data.error?.message || t("chatError"),
      warning: data.warning && data.warning !== "error" ? data.warning : "",
      sources: data.sources || []
    });
  } catch (error) {
    pushMessage({ type: "bot", text: t("chatError") });
  } finally {
    loading.value = false;
    await scrollToBottom();
  }
}
</script>
