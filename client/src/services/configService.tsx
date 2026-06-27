import api from "./api";

export async function getConfig() {
  const res = await api.get("/configuracoes");
  return res.data;
}

export async function updateConfig(data: any) {
  const res = await api.post("/configuracoes", data);
  return res.data;
}