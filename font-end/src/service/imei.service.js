import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/imei/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/imei/displayDelete?${page}`);
};

export const add = (imei) => {
  return httpClient.post(`/admin/imei/add`, imei);
};

export const update = (id, imei) => {
  return httpClient.put(`/admin/imei/update/${id}`, imei);
};

export const detail = (id) => {
  return httpClient.get(`/admin/imei/${id}`);
};

export const deleteImei = (id) => {
  return httpClient.delete(`/admin/imei/delete/${id}`);
};

export const returnImei = (id) => {
  return httpClient.put(`/admin/imei/return/${id}`);
};

export const importImei = (form) => {
  return httpClient.post("/admin/imei/import", form, config);
};

export const readImportImei = (form, idSku) => {
  return httpClient.post(`/admin/imei/importimei?idSku=${idSku}`, form, config);
};
// import imei excel and check trung imei
export const ImportImeiExcel = (form, idSku) => {
  return httpClient.post(
    `/admin/imei/importimei-excel?idSku=${idSku}`,
    form,
    config
  );
};
