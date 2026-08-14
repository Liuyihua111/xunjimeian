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

export async function fetchProjects() {
  const localData = await requestJson("/assets/data/projects.json");

  try {
    const apiData = await requestJson("/api/projects/");
    const localProjects = new Map(
      (localData.results || []).map((project) => [String(project.year), project])
    );

    const presentationFields = [
      "slug", "title", "subtitle", "summary", "directions", "cities", "outputs",
      "images", "links", "highlights", "detail_sections", "inheritance_value", "reusable_assets"
    ];

    return {
      ...apiData,
      results: (apiData.results || []).map((project) => {
        const localProject = localProjects.get(String(project.year));
        const presentation = localProject
          ? Object.fromEntries(presentationFields.map((field) => [field, localProject[field]]))
          : {};

        return {
          ...project,
          ...presentation,
          images: (localProject?.images || project.images || []).slice(0, 2)
        };
      })
    };
  } catch {
    return localData;
  }
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
