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

export const login = (email, password) => {
  return httpClient.get(
    `/admin/account/login?email=${email}&password=${password}`
  );
};

export const detail = (id) => {
  return httpClient.get(`/admin/account/get-id?id=${id}`);
};

export const updateRole = (role, idUser) => {
  return httpClient.put(
    `/admin/account/updateRole?role=${role}&idUser=${idUser}`
  );
};

export const getAllAccount = () => {
  return httpClient.get(`/admin/account`);
};
