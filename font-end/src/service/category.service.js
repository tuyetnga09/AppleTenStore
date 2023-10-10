import httpClient from "../api/http-comons";
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
export const readAll = (page) => {
  return httpClient.get(`/category/display?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/category/displayDelete?${page}`);
};

export const createCategory = (category) => {
  return httpClient.post("/category/save", category);
};

export const update = (id, category) => {
  return httpClient.put(`/category/update/${id}`, category);
};

export const detail = (id) => {
  return httpClient.get(`/category/${id}`);
};

export const deleteCategory = (id) => {
  return httpClient.put(`/category/delete/${id}`);
};

export const returnCategory = (id) => {
  return httpClient.put(`/category/return/${id}`);
};
export const importCategory = (form) => {
  return httpClient.post("/category/import", form, config);
};

export const search = (page, search) => {
  return httpClient.get(`/category/search?${page}`, search);
};

export const readAllDashboard = (page) => {
  return httpClient.get(`/category/displayDashboard?${page}`);
};
