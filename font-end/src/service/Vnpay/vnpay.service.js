import httpClient from "../../api/http-comons";

export const getPay = () => {
  return httpClient.get(`/pay`);
};
