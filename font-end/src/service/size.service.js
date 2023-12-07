import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/size/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/size/displayDelete?${page}`);
};

export const add = (size) => {
  return httpClient.post(`/admin/size/add`, size);
};

export const update = (id, size) => {
  return httpClient.put(`/admin/size/update/${id}`, size);
};

export const detail = (id) => {
  return httpClient.get(`/admin/size/${id}`);
};

export const deleteSize = (id) => {
  return httpClient.delete(`/admin/size/delete/${id}`);
};

export const returnSize = (id) => {
  return httpClient.put(`/admin/size/return/${id}`);
};

export const importSize = (form) => {
  return httpClient.post("/admin/size/import", form, config);
};

export const getCodeSize = () => {
  return httpClient.get(`admin/size/getCode`);
}
