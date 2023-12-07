import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/battery/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/battery/displayDelete?${page}`);
};

export const add = (battery) => {
  return httpClient.post(`/admin/battery/add`, battery);
};

export const update = (id, battery) => {
  return httpClient.put(`/admin/battery/update/${id}`, battery);
};

export const detail = (id) => {
  return httpClient.get(`/admin/battery/${id}`);
};

export const deleteBattery = (id) => {
  return httpClient.delete(`/admin/battery/delete/${id}`);
};

export const returnBattery = (id) => {
  return httpClient.put(`/admin/battery/return/${id}`);
};

export const importBattery = (form) => {
  return httpClient.post("/admin/battery/import", form, config);
};

export const getCodeBattery = () => {
  return httpClient.get("/admin/battery/getCode");
}
