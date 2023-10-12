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
