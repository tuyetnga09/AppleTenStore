import httpClient from "../../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const add = (customer) => {
  return httpClient.post(`/admin/customer/create`, customer);
};


export const addCustomerOffline = (customer) => {
  return httpClient.post(`/admin/customer/add`, customer);
};
