export const MIN_THINKING_MS = 2000;

export async function withMinimumThinkingTime(request, {
  now = () => performance.now(),
  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
} = {}) {
  const startedAt = now();
  try {
    return await request();
  } finally {
    // Keep fast answers and failures behind the same visible thinking state.
    const remaining = MIN_THINKING_MS - (now() - startedAt);
    if (remaining > 0) await delay(remaining);
  }
}
