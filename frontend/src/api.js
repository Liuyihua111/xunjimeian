const jsonHeaders = {
  "Content-Type": "application/json"
};

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export function fetchProjects() {
  return requestJson("/api/projects/").catch(() => requestJson("/assets/data/projects.json"));
}

export function fetchModelInfo() {
  return requestJson("/api/model/").catch(() => ({
    name: "谢远定数字分身模型",
    model_url: "",
    preview_url: "/assets/models/xieyuanding/preview.png",
    status: "building",
    description: "谢远定静态人物模型正在制作中，当前展示为占位版本。"
  }));
}

export function askQuestion(question) {
  return requestJson("/api/chat/", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ question })
  });
}
