import assert from "node:assert/strict";
import test from "node:test";
import { withMinimumThinkingTime } from "../src/components/chatResponseTiming.js";

test("an immediate fixed answer stays pending until the two-second gate opens", async () => {
  let release, requested = false, displayed = false;
  const answer = { answer: "今天的东大学子和百年前有什么不同" };
  const result = withMinimumThinkingTime(() => {
    requested = true;
    return answer;
  }, {
    now: () => 100,
    delay: (ms) => {
      assert.equal(ms, 2000);
      return new Promise((resolve) => { release = resolve; });
    }
  }).then((value) => { displayed = true; return value; });
  assert.equal(requested, true);
  await Promise.resolve();
  assert.equal(displayed, false);
  release();
  assert.equal(await result, answer);
  assert.equal(displayed, true);
});

test("a fast API answer waits only for the remaining time from request start", async () => {
  let time = 500, waited;
  const result = await withMinimumThinkingTime(async () => {
    time += 650;
    return { answer: "API answer", sources: [{ id: 1 }] };
  }, { now: () => time, delay: async (ms) => { waited = ms; } });
  assert.equal(waited, 1350);
  assert.deepEqual(result.sources, [{ id: 1 }]);
});

test("answers taking at least two seconds have no additional artificial delay", async () => {
  for (const elapsed of [2000, 3500]) {
    let time = 100;
    const result = await withMinimumThinkingTime(async () => {
      time += elapsed;
      return "model answer";
    }, {
      now: () => time,
      delay: () => assert.fail("slow answers must display immediately")
    });
    assert.equal(result, "model answer");
  }
});

test("synchronous and asynchronous failures also keep thinking visible before surfacing", async () => {
  for (const synchronous of [true, false]) {
    const error = new Error("request failed");
    let waited = false;
    const result = withMinimumThinkingTime(() => {
      if (synchronous) throw error;
      return Promise.reject(error);
    }, { now: () => 0, delay: async (ms) => {
      assert.equal(ms, 2000);
      waited = true;
    } });
    await assert.rejects(result, (actual) => waited && actual === error);
  }
});
