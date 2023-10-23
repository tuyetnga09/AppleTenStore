import httpClient from "../api/http-comons";

export const readAll = (idAccount) => {
  return httpClient.get(`/customer/cart/${idAccount}`);
};

export const readQuantityInCart = (idAccount) => {
  return httpClient.get(`/customer/cart/quantityInCart/${idAccount}`);
};

export const deleteCartDetail = (id) => {
  return httpClient.delete(`/customer/cart-detail/${id}`);
};

export const updateQuantity = (quantity) => {
  return httpClient.post(`/customer/cart-detail/change-quantity`, quantity);
};

export const update = (id, newQuantity) => {
  return httpClient.put(`/customer/cart-detail/update-quantity/${id}?quantity=${newQuantity}`);
};

export const addToCart = (newCart) => {
  return httpClient.post("/customer/cart/addToCart", newCart);
};

export const getQuantityCartDetailBySku = (idsku,idAccount) => {
  return httpClient.get(`/customer/cart-detail/getCartDetail/${idsku}?idAccount=${idAccount}`);
};

export const addToCartOffline = (newCart) => {
  return httpClient.post("/admin/cart/addToCartOff", newCart);
};

export const readAllCartOff = (idAccount) => {
  return httpClient.get(`/admin/cart/${idAccount}`);
};

export const deleteCartDetailOff = (id) => {
  return httpClient.delete(`/admin/cart-detail/${id}`);
};

export const updateQuantityOff = (id, newQuantity) => {
  return httpClient.put(`/admin/cart-detail/update-quantity/${id}?quantity=${newQuantity}`);
};

export const getbysku = (idSku) => {
  return httpClient.get(`/customer/cart/session/${idSku}`);
};

//API add cart session
export const addToCartSession = (newCartSession) => {
  return httpClient.post("/customer/cart/addSession", newCartSession);
};

export const getCartSession = () => {
  return httpClient.get("/customer/cart/items");
};
