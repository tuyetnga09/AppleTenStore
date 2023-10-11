import httpClient from "../../api/http-comons";

export const readAllUser = () => {
  return httpClient.get(`/manager/user`);
};
