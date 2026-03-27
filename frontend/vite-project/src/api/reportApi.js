import api from "./axios";

export const getBooksReportApi = async () => {
  const response = await api.get("/reports/books");
  return response.data;
};

export const getMoviesReportApi = async () => {
  const response = await api.get("/reports/movies");
  return response.data;
};

export const getMembershipsReportApi = async () => {
  const response = await api.get("/reports/memberships");
  return response.data;
};

export const getActiveIssuesReportApi = async () => {
  const response = await api.get("/reports/active-issues");
  return response.data;
};

export const getOverdueReturnsReportApi = async () => {
  const response = await api.get("/reports/overdue-returns");
  return response.data;
};

export const getPendingRequestsReportApi = async () => {
  const response = await api.get("/reports/pending-requests");
  return response.data;
};