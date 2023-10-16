import httpClient from "../../api/http-comons";

export const getFee = (transportationFeeDTO) => {
  return httpClient.post(`/public/transportationFee/`, transportationFeeDTO);
};
