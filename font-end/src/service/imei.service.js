import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/imei/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/imei/displayDelete?${page}`);
};

export const add = (imei) => {
  return httpClient.post(`/imei/add`, imei);
};

export const update = (id, imei) => {
  return httpClient.put(`/imei/update/${id}`, imei);
};

export const detail = (id) => {
  return httpClient.get(`/imei/${id}`);
};

export const deleteImei = (id) => {
  return httpClient.delete(`/imei/delete/${id}`);
};

export const returnImei = (id) => {
  return httpClient.put(`/imei/return/${id}`);
};

export const importImei = (form) => {
  return httpClient.post("/imei/import", form, config);
};

export const readImportImei = (form, idSku) => {
  return httpClient.post(`/imei/importimei?idSku=${idSku}`, form, config);
};
