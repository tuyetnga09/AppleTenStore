import httpClient from "../../../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

//ấy ra tất cả product
export const readAllProduct = () => {
  return httpClient.get(`/admin/product-detail/get-all-product-detail`);
};

//lấy ra tất cả sku theo idProduct
export const readAllSku = (idProduct) => {
  return httpClient.get(
    `/admin/product-detail/get-all-sku?idProduct=${idProduct}`
  );
};

//lấy ra list imei theo idSku
export const getAllImeisWhereIdSku = (idSku) => {
  return httpClient.get(`/admin/product-detail/find-all-imeis?idSku=${idSku}`);
};

//lấy ra list imei theo idSku and status
export const getAllImeiWhereIdSkuAndStatus = (idSku, status) => {
  return httpClient.get(
    `/admin/product-detail/find-imeis-status?idSku=${idSku}&status=${status}`
  );
};

//delete Product theo idProduct
export const deleteProduct = (idProduct) => {
  return httpClient.delete(
    `/admin/product-detail/delete-product?idProduct=${idProduct}`
  );
};

//return Product theo idProduct
export const returnProduct = (idProduct) => {
  return httpClient.get(
    `/admin/product-detail/return-product?idProduct=${idProduct}`
  );
};

//xoá sku theo idSku and idProduct
export const deleteSku = (idSku, idProduct) => {
  return httpClient.delete(
    `/admin/product-detail/delete-sku?idSku=${idSku}&idProduct=${idProduct}`
  );
};

//khôi phục sku theo idSku and idProduct
export const returnSku = (idSku, idProduct) => {
  return httpClient.get(
    `/admin/product-detail/return-sku?idSku=${idSku}&idProduct=${idProduct}`
  );
};

//delete imei (cập nhật status imei =1)
export const deleteImei = (idImei) => {
  return httpClient.delete(
    `/admin/product-detail/delete-imei?idImei=${idImei}`
  );
};

//return imei (cập nhật status imei =1)
export const returnImei = (idImei) => {
  return httpClient.get(`/admin/product-detail/return-imei?idImei=${idImei}`);
};

//add 1 imei
export const addOneImei = (imeiRequest) => {
  return httpClient.post(`/admin/product-detail/add-imei`, imeiRequest);
};

//check gia sku đã tồn tại chưa
export const checkGiaSku = (idSku) => {
  return httpClient.get(`/admin/product-detail/check-gia-sku?idSku=${idSku}`);
};

//lấy ra đối tượng SkuIonAdmin
export const getSkuIonAdmin = (idSku) => {
  return httpClient.get(`/admin/product-detail/get-skuionadmin?idSku=${idSku}`);
};

// cập nhật các imei đã được chọn thành status =1 (đã xoá)
export const deleteImeiCheckbox = (listImei) => {
  return httpClient.put(
    `/admin/product-detail/delete-imeis?listImei=${listImei}`
  );
};

// cập nhật các imei đã được chọn thành status =0 (hoat dong)
export const updateImeiCheckbox = (listImei) => {
  return httpClient.put(
    `/admin/product-detail/update-imeis?listImei=${listImei}`
  );
};

//cập nhật all imei hoạt động -> xoá
export const deleteAllImei = (idSku) => {
  return httpClient.put(`/admin/product-detail/delete-all-imei?idSku=${idSku}`);
};

//cập nhật all imei   xoá ->  hoạt động
export const returnAllImei = (idSku) => {
  return httpClient.put(`/admin/product-detail/return-all-imei?idSku=${idSku}`);
};

//seach imei (codeImei , status)
export const seachImeis = (codeImei, status, idSku) => {
  return httpClient.get(
    `/admin/product-detail/seach-imeis?codeImei=${codeImei}&status=${status}&idSku=${idSku}`
  );
};

//seach imei thất lạc(tìm kiêm trên all imei)
export const seachImeiThatLac = (codeImei) => {
  return httpClient.get(
    `/admin/product-detail/seach-imei-that-lac?codeImei=${codeImei}`
  );
};
