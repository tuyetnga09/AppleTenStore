import httpClient from "../../api/http-comons";

export const readAllProvince = () => {
  return httpClient.get(`/public/province/`);
};
