import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/color/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/color/displayDelete?${page}`);
};

export const add = (color) => {
  return httpClient.post(`/color/add`, color);
};

export const update = (id, color) => {
  return httpClient.put(`/color/update/${id}`, color);
};

export const detail = (id) => {
  return httpClient.get(`/color/${id}`);
};

export const deleteColor = (id) => {
  return httpClient.delete(`/color/delete/${id}`);
};

export const returnColor = (id) => {
  return httpClient.put(`/color/return/${id}`);
};

export const importColor = (form) => {
  return httpClient.post("/color/import", form, config);
};