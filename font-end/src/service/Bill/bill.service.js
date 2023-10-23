import httpClient from "../../api/http-comons";

export const searchNoDate = (page) => {
  return httpClient.get(`/manager/bill/searchNoDate?${page}`);
};

export const searchWithDate = (page) => {
  return httpClient.get(`/manager/bill/searchWithDate?${page}`);
};

export const createBill = (bill) => {
  return httpClient.post(`/customer/bill`, bill);
}

export const updateStatusBill = (id) => {
  return httpClient.put(`/customer/bill/update-status/${id}`);
}

export const findBillByCode = (code) => {
  return httpClient.get(`/customer/bill/search/${code}`);
}