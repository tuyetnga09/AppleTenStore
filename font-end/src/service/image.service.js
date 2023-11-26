import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/image/display?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/image/displayDelete?${page}`);
};

export const addImage = (image) => {
  return httpClient.post(`/admin/image/save`, image, config);
};

export const saveImageAccount = (image) => {
  return httpClient.post(`/admin/image/save/imgAccount`, image, config);
};

export const update = (id, image) => {
  return httpClient.put(`/admin/image/update/${id}`, image);
};

export const detail = (id) => {
  return httpClient.get(`/admin/image/${id}`);
};

export const deleteImage = (id) => {
  return httpClient.delete(`/admin/image/delete/${id}`);
};

export const returnImage = (id) => {
  return httpClient.put(`/admin/image/return/${id}`);
};

export const selectProduct = () => {
  return httpClient.get(`/admin/product/get-all-product`);
};

export const searchImage = (id) => {
  return httpClient.get(`/admin/image/search/${id}`);
};

export const getAllImage = (id) => {
  return httpClient.get(`/admin/image/getAll/${id}`);
};
