import httpClient from "../../api/http-comons";

export const getPay = (soTienThanhToan) => {
  return httpClient.get(`/pay?soTienThanhToan=${soTienThanhToan}`);
};
