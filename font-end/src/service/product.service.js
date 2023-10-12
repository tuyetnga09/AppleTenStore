import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) => {
  return httpClient.get(`/admin/product/display?${page}`);
};

// hiển thị comboobox
export const readAllColor = () => {
  return httpClient.get(`/admin/color/get-all-color`);
};
export const readAllChip = () => {
  return httpClient.get(`/admin/chip/get-all-chip`);
};
export const readAllBattery = () => {
  return httpClient.get(`/admin/battery/get-all-battery`);
};
export const readAllCapacity = () => {
  return httpClient.get(`/admin/capacity/get-all-capacity`);
};
export const readAllCategory = () => {
  return httpClient.get(`/admin/category/get-all-category`);
};
export const readAllManufacture = () => {
  return httpClient.get(`/admin/manufacture/get-all-manufacture`);
};
export const readAllRam = () => {
  return httpClient.get(`/admin/ram/get-all-ram`);
};
export const readAllScreen = () => {
  return httpClient.get(`/admin/screen/get-all-screen`);
};
export const readAllSize = () => {
  return httpClient.get(`/admin/size/get-all-size`);
};
export const returnDeleteAll = (page) => {
  return httpClient.get(`/admin/product/displayDelete?${page}`);
};

export const add = (product) => {
  return httpClient.post(`/admin/product/save`, product);
};

export const update = (id, product) => {
  return httpClient.put(`/admin/product/update/${id}`, product);
};

export const detail = (id) => {
  return httpClient.get(`/admin/product/${id}`);
};
export const detailCreateProduct = (id) => {
  return httpClient.get(`/admin/product/detail/${id}`);
};


export const deleteProduct = (id) => {
  return httpClient.delete(`/admin/product/delete/${id}`);
};

export const returnProduct = (id) => {
  return httpClient.put(`/admin/product/return/${id}`);
};

export const newProduct = () => {
  return httpClient.get(`/admin/product/new-product`);
};

export const chipProduct = () => {
  return httpClient.get(`/admin/product/chip-product`);
};

export const findProductById = (id) => {
  return httpClient.get(`/admin/product/search/${id}`);
};

// export const importChip = (form) => {
//   return httpClient.post("/chip/import", form, config);
// };

export const readProductNew = (page) => {
  return httpClient.get(`/admin/product/display/productNew?${page}`);
};

export const readProductCheap = (page) => {
  return httpClient.get(`/admin/product/display/productCheap?${page}`);
};

export const readFilterProductByPrice = (page) => {
  return httpClient.get(`/admin/product/display/filterProductbyPrice?${page}`);
};

export const readFilterProductByCategory = (page) => {
  return httpClient.get(
    `/admin/product/display/filterProductbyCategory?${page}`
  );
};

export const readFilterProductByAscendingPrice = (page) => {
  return httpClient.get(
    `/admin/product/display/filterProductByAscendingPrice?${page}`
  );
};

export const readFilterProductByDecreasePrice = (page) => {
  return httpClient.get(
    `/admin/product/display/filterProductByDecreasePrice?${page}`
  );
};

export const listProductByCategories = (page) => {
  return httpClient.get(
    `/admin/product/display/listProductByCategories?${page}`
  );
};
