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
export const deleteImeiDaBan = (idImeiDaBan, codeImeiDaBan) => {
  return httpClient.delete(
    `/admin/bill-offline/delete-imei-da-ban?idImeiDaBan=${idImeiDaBan}&codeImeiDaBan=${codeImeiDaBan}`
  );
};

//check imei that lac
export const getListImeiThatLac = (codeImei) => {
  return httpClient.get(
    `/admin/bill-offline/get-imei-that-lac?codeImei=${codeImei}`
  );
};

export const getBillChoThanhToan = (id) => {
  return httpClient.get(`/admin/bill-offline/getBillCTT/${id}`);
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

//seach Imei Da Ban
export const seachImeisDaBan = (idBillDetail, idSKU, codeImei) => {
  return httpClient.get(
    `/admin/bill-offline/get-seach-imei-da-ban?idBillDetail=${idBillDetail}&idSKU=${idSKU}&codeImei=${codeImei}`
  );
};

//seach imei theo codeImei
export const seachImeis = (idSKU, codeImei) => {
  return httpClient.get(
    `/admin/bill-offline/get-seach-imeis?idSKU=${idSKU}&codeImei=${codeImei}`
  );
};

//delete imei_da_ban - xoá danh sách imei đã bán được chọn (checkbox)
export const deleteImeisDaBanOffLineCheckBox = (codeImeis) => {
  return httpClient.delete(
    `/admin/bill-offline/delete-imeis-da-ban-check-box?codeImeis=${codeImeis}`
  );
};

//delete imei_da_ban - xoá all imei đã bán  where idbillDetail
export const deleteAllImeisDaBanOffLine = (idBillDetail) => {
  return httpClient.delete(
    `/admin/bill-offline/delete-all-imeis-da-ban?idBillDetail=${idBillDetail}`
  );
};

//all imei da ban cua bill_detail
export const getAllImeisDaBanOffLine = (idBillDetail) => {
  return httpClient.get(
    `/admin/bill-offline/get-all-imeis-da-ban?idBillDetail=${idBillDetail}`
  );
};

//xoá bill_detail -> xoá các imei_da_ban trong bảng imei_da_ban của bill_detail đó và hoàn lại status các của các imei
//chỉ xoá được các bill_detail của bill chưa hoàn thành
export const deleteBillOneDetail = (idBillDetail) => {
  return httpClient.delete(
    `/admin/bill-offline/delete-bill-detail?idBillDetail=${idBillDetail}`
  );
};

//seach Imei Da Ban
export const searchBillCTT = (idAccount, codeBill) => {
  return httpClient.get(
    `/admin/bill-offline/searchBill-CTT?idAccount=${idAccount}&codeBill=${codeBill}`
  );
};
