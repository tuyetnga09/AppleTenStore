import httpClient from "../../api/http-comons";

export const readAllUser = () => {
  return httpClient.get(`/admin/user`);
};

export const readAllUserByRole = (role) => {
  return httpClient.get(`/admin/user/findByRole?role=${role}`);
};

export const update = (id, editCustomer) => {
  return httpClient.put(`/admin/user/${id}`, editCustomer);
};

export const updatePassword = (id, editPassword) => {
  return httpClient.put(`/admin/user/updatePassword/${id}`, editPassword);
};

export const deleteUser = (id) => {
  return httpClient.put(`/admin/user/deleteUser?id=${id}`);
};
