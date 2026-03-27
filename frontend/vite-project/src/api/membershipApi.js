import api from "./axios";

export const getMembershipsApi = async () => {
  const response = await api.get("/memberships");
  return response.data;
};

export const createMembershipApi = async (data) => {
  const response = await api.post("/memberships", data);
  return response.data;
};

export const getMembershipByNumberApi = async (membershipNumber) => {
  const response = await api.get(`/memberships/${membershipNumber}`);
  return response.data;
};

export const updateMembershipApi = async (membershipNumber, data) => {
  const response = await api.put(`/memberships/${membershipNumber}`, data);
  return response.data;
};

export const extendMembershipApi = async (membershipNumber, data) => {
  const response = await api.patch(`/memberships/${membershipNumber}/extend`, data);
  return response.data;
};

export const cancelMembershipApi = async (membershipNumber) => {
  const response = await api.patch(`/memberships/${membershipNumber}/cancel`);
  return response.data;
};