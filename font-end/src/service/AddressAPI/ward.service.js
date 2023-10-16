import httpClient from "../../api/http-comons";

export const readAllWard = (district_id) => {
  return httpClient.get(`/public/ward/?district_id=${district_id}`);
};
