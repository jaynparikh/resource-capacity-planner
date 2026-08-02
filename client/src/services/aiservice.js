import api from "./api";

export async function askAI(question) {
  const { data } = await api.post("/ai/query", {
    question,
  });

  return data;
}