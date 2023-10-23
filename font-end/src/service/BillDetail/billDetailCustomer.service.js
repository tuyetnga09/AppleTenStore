import httpClient from "../../api/http-comons";

export const readAll = (id) => {
  return httpClient.get(`/customer/billDetail/getAll?id=${id}`);
};
