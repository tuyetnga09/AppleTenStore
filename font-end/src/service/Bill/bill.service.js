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

export const returnStatusBill = (id) => {
  return httpClient.put(`/customer/bill/return-status/${id}`);
};

export const findBillByCode = (code, phoneNumber) => {
  return httpClient.get(
    `/customer/bill/search/${code}?phoneNumber=${phoneNumber}`
  );
};

export const deleteBillById = (id, noteReturn, idAccount) => {
  return httpClient.delete(
    `/customer/bill/delete/${id}?noteReturn=${noteReturn}&idAccount=${idAccount}`
  );
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

export const getAllBillOFFLINECXN = () => {
  return httpClient.get("/manager/bill/getAll-billOffline-detail-CXN");
};

export const getCountBillChoXacNhan = () => {
  return httpClient.get("/manager/bill/getAccountBillCXN");
};

export const acceptReturn = (acceptReturn) => {
  return httpClient.put(`/manager/bill/acceptReturn`, acceptReturn);
};

export const noAcceptReturn = (acceptReturn) => {
  return httpClient.put(`/manager/bill/noAcceptReturn`, acceptReturn);
};

export const deliveryFailed = (idAccount, idBill, note) => {
  return httpClient.put(
    `/customer/bill/deliveryFailed/${idBill}?idAccount=${idAccount}&note=${note}`
  );
};

export const searchBillByCode = (id) => {
  return httpClient.get(`manager/bill/searchBillByCode/${id}`);
};

export const voucherTruocUpdate = (idHoaDon) => {
  return httpClient.get(
    `manager/bill/find-voucher/truoc-update?idHoaDon=${idHoaDon}`
  );
};

export const soDiemTruocUpdate = (idBill) => {
  return httpClient.get(
    `manager/bill/find-so-diem/truoc-update?idBill=${idBill}`
  );
};
