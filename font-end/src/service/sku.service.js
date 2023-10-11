import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/sku/display?${page}`);
};
export const readAllProductNew = () => {
  return httpClient.get(`/admin/sku/get-all`);
};

export const getSKUProduct = (page) => {
  return httpClient.get(`/admin/sku/getSKU?${page}`);
};

export const getOneSKU = (id) => {
  return httpClient.get(`/admin/sku/getOneSKU/${id}`);
};
