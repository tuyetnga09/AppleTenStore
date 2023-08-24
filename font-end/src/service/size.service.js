import httpClient from "../api/http-comons";
export const readAll = (page) => {
  return httpClient.get(`/size/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/size/displayDelete?${page}`);
};

export const add = (size) => {
  return httpClient.post(`/size/add`, size);
};

export const update = (id, size) => {
  return httpClient.put(`/size/update/${id}`, size);
};

export const detail = (id) => {
  return httpClient.get(`/size/${id}`);
};

export const deleteSize = (id) => {
  return httpClient.delete(`/size/delete/${id}`);
};

export const returnSize = (id) => {
  return httpClient.put(`/size/return/${id}`);
};
