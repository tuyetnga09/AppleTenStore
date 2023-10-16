import httpClient from "../../api/http-comons";

export const readAllDistrict = (province_id) => {
  return httpClient.get(`/public/district/?province_id=${province_id}`);
};
