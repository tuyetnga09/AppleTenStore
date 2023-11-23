import httpClient from "../../api/http-comons";

export const searchNoDate = (page) => {
  return httpClient.get(`/manager/bill/searchNoDate?${page}`);
};

export const searchWithDate = (page) => {
  return httpClient.get(`/manager/bill/searchWithDate?${page}`);
};

export const createBill = (bill) => {
  return httpClient.post(`/customer/bill`, bill);
};
export const createBillAccount = (billAccount) => {
  return httpClient.post(`/customer/bill/account`, billAccount);
};

export const updateStatusBill = (idAccount, id, noteReturn) => {
  return httpClient.put(
    `/customer/bill/update-status/${id}?idAccount=${idAccount}&?noteReturn=${noteReturn}`
  );
};

export const findBillByCode = (code) => {
  return httpClient.get(`/customer/bill/search/${code}`);
};

export const deleteBillById = (id) => {
  return httpClient.delete(`/customer/bill/delete/${id}`);
};

export const returnBillById = (id, idAccount, noteReturn) => {
  return httpClient.delete(
    `/customer/bill/return/${id}?idAccount=${idAccount}&noteReturn=${noteReturn}`
  );
};

export const updateAllCVC = (personUpdate) => {
  return httpClient.put(`/manager/bill/updateAll/${personUpdate}`);
};

export const getAllBillCXN = () => {
  return httpClient.get("/manager/bill/getAll-bill-detail-CXN");
};

export const getCountBillChoXacNhan = () => {
  return httpClient.get("/manager/bill/getAccountBillCXN");
};
