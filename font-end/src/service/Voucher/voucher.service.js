import httpClient from "../../api/http-comons";

// const config = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// };

export const readAll = () => {
  return httpClient.get(`/voucher/vouchers`);
};

export const getVoucher = () => {
  return httpClient.get(`/voucher/getVoucher`);
};

// export const returnDeleteAll = (page) => {
//   return httpClient.get(`/battery/displayDelete?${page}`);
// };

export const add = (voucher) => {
  return httpClient.post(`/voucher/addVoucher`, voucher);
};

export const update = (id, voucher) => {
  return httpClient.put(`/voucher/updateVoucher/${id}`, voucher);
};

export const detail = (id) => {
  return httpClient.get(`/voucher/detail/${id}`);
};

export const deleteVoucher = (id) => {
  return httpClient.delete(`/voucher/deleteVoucher/${id}`);
};

// export const returnBattery = (id) => {
//   return httpClient.put(`/battery/return/${id}`);
// };

// export const importBattery = (form) => {
//   return httpClient.post("/battery/import", form, config);
// };
export const searchNoDate = (page) => {
  return httpClient.get(`/voucher/searchNoDate?${page}`);
};

export const searchWithDate = (page) => {
  return httpClient.get(`/voucher/searchWithDate?${page}`);
};
