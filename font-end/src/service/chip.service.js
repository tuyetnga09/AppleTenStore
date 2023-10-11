import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/chip/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/chip/displayDelete?${page}`);
};

export const add = (chip) => {
  return httpClient.post(`/admin/chip/add`, chip);
};

export const update = (id, chip) => {
  return httpClient.put(`/admin/chip/update/${id}`, chip);
};

export const detail = (id) => {
  return httpClient.get(`/admin/chip/${id}`);
};

export const deleteChip = (id) => {
  return httpClient.delete(`/admin/chip/delete/${id}`);
};

export const returnChip = (id) => {
  return httpClient.put(`/admin/chip/return/${id}`);
};

export const importChip = (form) => {
  return httpClient.post("/admin/chip/import", form, config);
};
