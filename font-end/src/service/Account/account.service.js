import httpClient from "../../api/http-comons";

export const numberOfCustomersLastMonth = () => {
  return httpClient.get(`/admin/account/numberOfCustomersLastMonth`);
};

export const numberOfCustomersThisMonth = () => {
  return httpClient.get(`/admin/account/numberOfCustomersThisMonth`);
};

export const listRoles = (role) => {
  return httpClient.get(`/admin/account/roles`);
};
