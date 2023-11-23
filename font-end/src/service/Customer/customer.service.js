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

export const getCustomer = () => {
  return httpClient.get(`/admin/customer/get-all-customer`);
};

export const getOne = (id) => {
  return httpClient.get(`/admin/customer/getOne/${id}`);
};
