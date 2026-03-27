import api from "./axios";

export const bookAvailabilityApi = async (data) => {
  const response = await api.post("/transactions/book-availability", data);
  return response.data;
};

export const issueBookApi = async (data) => {
  const response = await api.post("/transactions/issue", data);
  return response.data;
};

export const returnBookApi = async (data) => {
  const response = await api.post("/transactions/return", data);
  return response.data;
};

export const payFineApi = async (data) => {
  const response = await api.post("/transactions/pay-fine", data);
  return response.data;
};

export const getTransactionApi = async (id) => {
  const response = await api.get(`/transactions/${id}`);
  return response.data;
};