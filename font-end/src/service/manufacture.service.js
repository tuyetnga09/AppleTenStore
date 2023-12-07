import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/manufacture/display?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/manufacture/displayDelete?${page}`);
};

export const createManufacture = (manufacture) => {
  return httpClient.post("/admin/manufacture/save", manufacture);
};

export const update = (id, manufacture) => {
  return httpClient.put(`/admin/manufacture/update/${id}`, manufacture);
};

export const detail = (id) => {
  return httpClient.get(`/admin/manufacture/${id}`);
};

export const deleteManufacture = (id) => {
  return httpClient.put(`/admin/manufacture/delete/${id}`);
};

export const returnManufacture = (id) => {
  return httpClient.put(`/admin/manufacture/return/${id}`);
};

export const importManufacture = (form) => {
  return httpClient.post("/admin/manufacture/import", form, config);
};

export const search = (page, search) => {
  return httpClient.get(`/admin/manufacture/search?${page}`, search);
};

export const getCodeManufacture = () => {
  return httpClient.get(`admin/manufacture/getCode`);
}
