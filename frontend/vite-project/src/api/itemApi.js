import api from "./axios";

export const getItemsApi = async () => {
  const response = await api.get("/items");
  return response.data;
};

export const createItemApi = async (data) => {
  const response = await api.post("/items", data);
  return response.data;
};

export const updateItemApi = async (id, data) => {
  const response = await api.put(`/items/${id}`, data);
  return response.data;
};

export const searchItemsApi = async (params) => {
  const response = await api.get("/items/search", { params });
  return response.data;
};