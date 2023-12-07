import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/color/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/color/displayDelete?${page}`);
};

export const add = (color) => {
  return httpClient.post(`/admin/color/add`, color);
};

export const update = (id, color) => {
  return httpClient.put(`/admin/color/update/${id}`, color);
};

export const detail = (id) => {
  return httpClient.get(`/admin/color/${id}`);
};

export const deleteColor = (id) => {
  return httpClient.delete(`/admin/color/delete/${id}`);
};

export const returnColor = (id) => {
  return httpClient.put(`/admin/color/return/${id}`);
};

export const importColor = (form) => {
  return httpClient.post("/admin/color/import", form, config);
};

export const findColorByIdProduct = (id) => {
  return httpClient.get(`/admin/color/find-color-by-product/${id}`);
};

export const getCodeColor = () => {
  return httpClient.get(`admin/color/getCode`);
}
