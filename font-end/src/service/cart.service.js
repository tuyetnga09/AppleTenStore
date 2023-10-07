import httpClient from "../api/http-comons";

export const readAll = (idAccount) => {
  return httpClient.get(`/cart/${idAccount}`);
};

export const readQuantityInCart = (idAccount) => {
  return httpClient.get(`/cart/quantityInCart/${idAccount}`);
};

export const deleteCartDetail = (id) => {
  return httpClient.delete(`/cart-detail/${id}`);
};

export const updateQuantity = (quantity) => {
  return httpClient.post(`/cart-detail/change-quantity`, quantity);
};

export const update = (id, newQuantity) => {
  return httpClient.put(`/cart-detail/update-quantity/${id}?quantity=${newQuantity}`);
};

export const addToCart = (newCart) => {
  return httpClient.post("/cart/addToCart", newCart);
};



