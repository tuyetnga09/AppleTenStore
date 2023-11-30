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

export const yeuCauTraHang = (idBillReturn, noteBillReturn, idImeiDaBans) => {
  return httpClient.get(
    `/customer/billDetail/yeu-cau-tra-hang?idBillReturn=${idBillReturn}&noteBillReturn=${noteBillReturn}&idImeiDaBans=${idImeiDaBans}`
  );
};

export const checkBillTraHang = (id) => {
  return httpClient.get(`/customer/billDetail/check-bill-tra-hang?id=${id}`);
};

export const traTatCaSanPham = (idBillReturn, noteBillReturn, idImeiDaBans) => {
  return httpClient.get(
    `/customer/billDetail/yeu-cau-tra-tat-ca?idBillReturn=${idBillReturn}&noteBillReturn=${noteBillReturn}&idImeiDaBans=${idImeiDaBans}`
  );
};
