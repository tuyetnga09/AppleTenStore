import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/screen/display?${page}`);
};

export const readAllDelete = (page) => {
  return httpClient.get(`/admin/screen/displayDelete?${page}`);
};

export const create = (screen) => {
  return httpClient.post("/admin/screen/save", screen);
};

export const update = (id, screen) => {
  return httpClient.put(`/admin/screen/update/${id}`, screen);
};

export const detail = (id) => {
  return httpClient.get(`/admin/screen/${id}`);
};

export const deleteScreen = (id) => {
  return httpClient.put(`/admin/screen/delete/${id}`);
};

export const returnScreen = (id) => {
  return httpClient.put(`/admin/screen/return/${id}`);
};

export const importScreen = (form) => {
  return httpClient.post("/admin/screen/import", form, config);
};

export const getCodeScreen = () => {
  return httpClient.get(`admin/screen/getCode`);
}
