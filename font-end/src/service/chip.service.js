import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/chip/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/chip/displayDelete?${page}`);
};

export const add = (chip) => {
  return httpClient.post(`/chip/add`, chip);
};

export const update = (id, chip) => {
  return httpClient.put(`/chip/update/${id}`, chip);
};

export const detail = (id) => {
  return httpClient.get(`/chip/${id}`);
};

export const deleteChip = (id) => {
  return httpClient.delete(`/chip/delete/${id}`);
};

export const returnChip = (id) => {
  return httpClient.put(`/chip/return/${id}`);
};

export const importChip = (form) => {
  return httpClient.post("/chip/import", form, config);
};
