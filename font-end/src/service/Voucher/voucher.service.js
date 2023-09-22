import httpClient from "../../api/http-comons";

// const config = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// };

export const readAll = () => {
  return httpClient.get(`/voucher/vouchers`);
};

// export const returnDeleteAll = (page) => {
//   return httpClient.get(`/battery/displayDelete?${page}`);
// };

// export const add = (battery) => {
//   return httpClient.post(`/battery/add`, battery);
// };

// export const update = (id, battery) => {
//   return httpClient.put(`/battery/update/${id}`, battery);
// };

// export const detail = (id) => {
//   return httpClient.get(`/battery/${id}`);
// };

// export const deleteBattery = (id) => {
//   return httpClient.delete(`/battery/delete/${id}`);
// };

// export const returnBattery = (id) => {
//   return httpClient.put(`/battery/return/${id}`);
// };

// export const importBattery = (form) => {
//   return httpClient.post("/battery/import", form, config);
// };
