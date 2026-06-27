import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getGifts = async () => {
  const res = await api.get("/gifts");
  return res.data;
};

export const createGift = async (data: any) => {
  const res = await api.post("/gifts", data);
  return res.data;
};

export const updateGift = async (id: number, data: any) => {
  const res = await api.put(`/gifts/${id}`, data);
  return res.data;
};

export const deleteGift = async (id: number) => {
  const res = await api.delete(`/gifts/${id}`);
  return res.data;
};