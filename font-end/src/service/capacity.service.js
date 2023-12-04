import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/capacity/display?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/capacity/displayDelete?${page}`);
};

export const createCapacity = (capacity) => {
  return httpClient.post("/admin/capacity/save", capacity);
};

export const update = (id, capacity) => {
  return httpClient.put(`/admin/capacity/update/${id}`, capacity);
};

export const detail = (id) => {
  return httpClient.get(`/admin/capacity/${id}`);
};

export const deleteCapacity = (id) => {
  return httpClient.put(`/admin/capacity/delete/${id}`);
};

export const returnCapacity = (id) => {
  return httpClient.put(`/admin/capacity/return/${id}`);
};

export const importCapacity = (form) => {
  return httpClient.post("/admin/capacity/import", form, config);
};

export const search = (page, search) => {
  return httpClient.get(`/admin/capacity/search?${page}`, search);
};

export const findCapacitisByIdProduct = (id) => {
  return httpClient.get(`/admin/capacity/find-capacity-by-id-product/${id}`);
};

export const getCodeCapacity = () => {
  return httpClient.get(`admin/capacity/getCode`);
}
