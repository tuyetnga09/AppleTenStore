import httpClient from "../../api/http-comons";

export const readAll = () => {
  return httpClient.get(`/billDetail`);
};

export const findBillDetails = (idBill) => {
  return httpClient.get(`/admin/billDetail/findBillDetails?idBill=${idBill}`);
};

export const getAllBillDetailReturn = (status, idBill, codeImei) => {
  return httpClient.get(
    `/admin/billDetail/getAllBillDetailReturn?status=${status}&idBill=${idBill}&codeImei=${codeImei}`
  );
};
