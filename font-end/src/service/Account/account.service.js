import httpClient from "../../api/http-comons";

export const numberOfCustomersLastMonth = () => {
  return httpClient.get(`/account/numberOfCustomersLastMonth`);
};

export const numberOfCustomersThisMonth = () => {
  return httpClient.get(`/account/numberOfCustomersThisMonth`);
};
