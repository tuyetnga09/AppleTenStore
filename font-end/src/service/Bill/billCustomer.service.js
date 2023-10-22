import httpClient from "../../api/http-comons";

export const readAllById = (id) => {
  return httpClient.get(`/customer/bill/getAll?id=${id}`);
};

export const readAllByIdAndCXN = (id) => {
  return httpClient.get(`/customer/bill/CXN?id=${id}`);
};

export const readAllByIdAndVC = (id) => {
  return httpClient.get(`/customer/bill/VC?id=${id}`);
};

export const readAllByIdAndDTT = (id) => {
  return httpClient.get(`/customer/bill/DTT?id=${id}`);
};

export const readAllByIdAndDH = (id) => {
  return httpClient.get(`/customer/bill/DH?id=${id}`);
};
