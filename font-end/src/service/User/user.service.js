import httpClient from "../../api/http-comons";

export const readAllUser = () => {
  return httpClient.get(`/admin/user`);
};

export const readAllUserByRole = (role, status) => {
  return httpClient.get(`/admin/user/findByRole?role=${role}&status=${status}`);
};

export const update = (id, editCustomer) => {
  return httpClient.put(`/admin/user/${id}`, editCustomer);
};

export const updatePassword = (id, editPassword) => {
  return httpClient.put(`/admin/user/updatePassword/${id}`, editPassword);
};

export const updateStatusUser = (status, id) => {
  return httpClient.put(
    `/admin/user/updateStatusUser?status=${status}&id=${id}`
  );
};
