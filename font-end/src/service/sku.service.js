import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/sku/display?${page}`);
};
export const readAllProductNew = () => {
  return httpClient.get(`/sku/get-all`);
};

export const getSKUProduct = (page) => {
  return httpClient.get(`/sku/getSKU?${page}`);
};
