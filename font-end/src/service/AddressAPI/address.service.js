import httpClient from "../../api/http-comons";

export const readAllByIdUser = (id) => {
  return httpClient.get(`/customer/address?id=${id}`);
};

export const add = (addAddress) => {
  return httpClient.post(`/customer/address/add`, addAddress);
};

export const deleteAddress = (id) => {
  return httpClient.delete(`/customer/address/delete/${id}`);
};
