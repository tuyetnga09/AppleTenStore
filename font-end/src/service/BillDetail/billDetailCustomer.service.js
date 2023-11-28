import httpClient from "../../api/http-comons";

export const readAll = (id) => {
  return httpClient.get(`/customer/billDetail/getAll?id=${id}`);
};

export const readAllByCustomer = (id) => {
  return httpClient.get(`/customer/billDetail/getAllByCustomer?id=${id}`);
};

export const getAllBillDetail = (id) => {
  return httpClient.get(`/customer/billDetail/get-all-bill-detail?id=${id}`);
};
