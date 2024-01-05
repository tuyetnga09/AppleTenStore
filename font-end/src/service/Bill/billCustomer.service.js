import httpClient from "../../api/http-comons";

export const readAllById = (id) => {
  return httpClient.get(`/customer/bill/getAll?id=${id}`);
};

export const readAllByIdAndStatus = (id, status) => {
  return httpClient.get(
    `/customer/bill/getAllByStatus?id=${id}&status=${status}`
  );
};

export const readByCodeBill = (code, phoneNumber) => {
  return httpClient.get(
    `/customer/bill/search/${code}?phoneNumber=${phoneNumber}`
  );
};
