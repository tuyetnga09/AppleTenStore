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


export const getBillChoThanhToan = (id) => {
  return httpClient.get(`http://localhost:8080/manager/bill/getBillCTT/${id}`)
}