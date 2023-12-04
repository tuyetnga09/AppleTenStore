import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/ram/display?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/ram/displayDelete?${page}`);
};

export const createRam = (ram) => {
  return httpClient.post("/admin/ram/save", ram);
};

export const update = (id, ram) => {
  return httpClient.put(`/admin/ram/update/${id}`, ram);
};

export const detail = (id) => {
  return httpClient.get(`/admin/ram/${id}`);
};

export const deleteRam = (id) => {
  return httpClient.put(`/admin/ram/delete/${id}`);
};

export const returnRam = (id) => {
  return httpClient.put(`/admin/ram/return/${id}`);
};

export const importRam = (form) => {
  return httpClient.post("/admin/ram/import", form, config);
};

export const search = (page, search) => {
  return httpClient.get(`/admin/ram/search?${page}`, search);
};

export const getCodeRam = () => {
  return httpClient.get(`admin/ram/getCode`)
}
