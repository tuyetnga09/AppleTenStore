import httpClient from "../api/http-comons";
export const readAll = (page) => {
  return httpClient.get(`/battery/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/battery/displayDelete?${page}`);
};

export const add = (battery) => {
  return httpClient.post(`/battery/add`, battery);
};

export const update = (id, battery) => {
  return httpClient.put(`/battery/update/${id}`, battery);
};

export const detail = (id) => {
  return httpClient.get(`/battery/${id}`);
};

export const deleteBattery = (id) => {
  return httpClient.delete(`/battery/delete/${id}`);
};

export const returnBattery = (id) => {
  return httpClient.put(`/battery/return/${id}`);
};
