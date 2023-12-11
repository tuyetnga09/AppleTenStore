import httpClient from "../api/http-comons";
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/category/display?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/category/displayDelete?${page}`);
};

export const createCategory = (category) => {
  return httpClient.post("/admin/category/save", category);
};

export const update = (id, category) => {
  return httpClient.put(`/admin/category/update/${id}`, category);
};

export const detail = (id) => {
  return httpClient.get(`/admin/category/${id}`);
};

export const deleteCategory = (id) => {
  return httpClient.put(`/admin/category/delete/${id}`);
};

export const returnCategory = (id) => {
  return httpClient.get(`/admin/category/return/${id}`);
};
export const importCategory = (form) => {
  return httpClient.post("/admin/category/import", form, config);
};

export const search = (page, search) => {
  return httpClient.get(`/admin/category/search?${page}`, search);
};

export const readAllDashboard = () => {
  return httpClient.get(`/admin/category/displayDashboard`);
};

export const getCodeCategory = () => {
  return httpClient.get(`/admin/category/getCode`);
};
