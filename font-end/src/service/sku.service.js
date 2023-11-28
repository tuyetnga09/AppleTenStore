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

export const getListSkuProduct = (idProduct) => {
  return httpClient.get(`/admin/sku/get-list-product/${idProduct}`);
};
export const getSKUProductFormSell = (page) => {
  return httpClient.get(`/admin/sku/getSkuProduct?${page}`);
};
export const getSKUProductFormSellByCateogory = (page) => {
  return httpClient.get(`/admin/sku/getSkuProductByCategory?${page}`);
};
export const priceMinAndMaxBySKU = (idProduct) => {
  return httpClient.get(`/admin/sku/getPriceMinAndMax?idProduct=${idProduct}`);
};
