import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/product/display?${page}`);
};

// hiển thị comboobox
export const readAllColor = () => {
  return httpClient.get(`/color/get-all-color`);
};
export const readAllChip = () => {
  return httpClient.get(`/chip/get-all-chip`);
};
export const readAllBattery = () => {
  return httpClient.get(`/battery/get-all-battery`);
};
export const readAllCapacity = () => {
  return httpClient.get(`/capacity/get-all-capacity`);
};
export const readAllCategory = () => {
  return httpClient.get(`/category/get-all-category`);
};
export const readAllManufacture = () => {
  return httpClient.get(`/manufacture/get-all-manufacture`);
};
export const readAllRam = () => {
  return httpClient.get(`/ram/get-all-ram`);
};
export const readAllScreen = () => {
  return httpClient.get(`/screen/get-all-screen`);
};
export const readAllSize = () => {
  return httpClient.get(`/size/get-all-size`);
};
export const returnDeleteAll = (page) => {
  return httpClient.get(`/product/displayDelete?${page}`);
};

export const add = (product) => {
  return httpClient.post(`/product/save`, product);
};

export const update = (id, product) => {
  return httpClient.put(`/product/update/${id}`, product);
};

export const detail = (id) => {
  return httpClient.get(`/product/${id}`);
};

export const deleteProduct = (id) => {
  return httpClient.delete(`/product/delete/${id}`);
};

export const returnProduct = (id) => {
  return httpClient.put(`/product/return/${id}`);
};

export const newProduct = () => {
  return httpClient.get(`/product/new-product`);
};

export const chipProduct = () => {
  return httpClient.get(`/product/chip-product`);
};

export const findProductById = (id) => {
  return httpClient.get(`/product/search/${id}`);
};

// export const importChip = (form) => {
//   return httpClient.post("/chip/import", form, config);
// };

export const readProductNew = (page) => {
  return httpClient.get(`/product/display/productNew?${page}`);
};

export const readProductCheap = (page) => {
  return httpClient.get(`/product/display/productCheap?${page}`);
};

export const readFilterProductByPrice = (page) => {
  return httpClient.get(`/product/display/filterProductbyPrice?${page}`);
};

export const readFilterProductByCategory = (page) => {
  return httpClient.get(`/product/display/filterProductbyCategory?${page}`);
};

export const readFilterProductByAscendingPrice = (page) => {
  return httpClient.get(
    `/product/display/filterProductByAscendingPrice?${page}`
  );
};

export const readFilterProductByDecreasePrice = (page) => {
  return httpClient.get(
    `/product/display/filterProductByDecreasePrice?${page}`
  );
};

export const listProductByCategories = (page) => {
  return httpClient.get(`/product/display/listProductByCategories?${page}`);
};
