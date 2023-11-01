import httpClient from "../../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const createBillOffLine = (idAccount) => {
  return httpClient.get(
    `/admin/bill-offline/create-bill?idAccount=${idAccount}`
  );
};

export const checkAccount = (idAccount) => {
  return httpClient.get(
    `/admin/bill-offline/check-account?idAccount=${idAccount}`
  );
};

// export const checkRolesAccount = (idAccount) => {
//   return httpClient.get(
//     `/admin/bill-offline/check-role-account?idAccount=${idAccount}`
//   );
// };

export const addOrUpdateBillDetail = (addBillOffLineRequest) => {
  return httpClient.post(
    `/admin/bill-offline/add-bill-detail`,
    addBillOffLineRequest
  );
};

export const getBillDetailOfBill = (codeBill) => {
  return httpClient.get(
    `/admin/bill-offline/get-bill-detail?codeBill=${codeBill}`
  );
};

//lấy ra danh sách imei của sku được chọn
export const getImeisOfSku = (idSKU) => {
  return httpClient.get(`/admin/bill-offline/get-imeis?idSKU=${idSKU}`);
};

//lấy ra sku được chọn
export const getOneSkuSelected = (idSKU) => {
  return httpClient.get(`/admin/bill-offline/get-sku?idSKU=${idSKU}`);
};

//lấy ra list imei đã bán của sku trong bill_detail được chọn
export const getListImeiDaBanOfSku = (idBillDetail, idSKU) => {
  return httpClient.get(
    `/admin/bill-offline/get-imei-da-ban?idBillDetail=${idBillDetail}&idSKU=${idSKU}`
  );
};

//add imei vvào billDetail ( vào bảng imei_da_ban)
export const addImeiDaBan = (imeiDaBanOffLineRequest) => {
  return httpClient.post(
    `/admin/bill-offline/add-imei-da-ban`,
    imeiDaBanOffLineRequest
  );
};

//delete imei_da_ban
export const deleteImeiDaBan = (idImeiDaBan) => {
  return httpClient.delete(
    `/admin/bill-offline/delete-imei-da-ban?idImeiDaBan=${idImeiDaBan}`
  );
};

export const getListImeiThatLac = (codeImei) => {
  return httpClient.get(
    `/admin/bill-offline/get-imei-that-lac?codeImei=${codeImei}`
  );
};

export const getBillChoThanhToan = (id) => {
  return httpClient.get(`http://localhost:8080/manager/bill/getBillCTT/${id}`);
};

export const updateQuantitySellOff = (id, newQuantity) => {
  return httpClient.put(
    `/admin/billDetail/update-quantity/${id}?quantity=${newQuantity}`
  );
};

export const getBillCTTByCodeBill = (codeBill) => {
  return httpClient.get(`/admin/bill-offline/get-bill-CTT/${codeBill}`);
};

export const getBillCTTByCodeBillS2 = (codeBill) => {
  return httpClient.get(`/admin/bill-offline/get-bill-CTT-S2/${codeBill}`);
};

export const doneBill = (data) => {
  return httpClient.put(`/admin/bill-offline/done-bill`, data);
};

export const listImeiDaBanByIdBillDetail = (idBillDetail) => {
  return httpClient.get(
    `/admin/bill-offline/get-code-imei-da-ban?idBillDetail=${idBillDetail}`
  );
};
