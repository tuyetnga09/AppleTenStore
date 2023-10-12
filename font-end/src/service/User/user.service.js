import httpClient from "../../api/http-comons";

export const readAllUser = () => {
  return httpClient.get(`/manager/user`);
};

export const readAllUserByRole = (role) => {
  return httpClient.get(`/admin/user/findByRole?role=${role}`);
};
