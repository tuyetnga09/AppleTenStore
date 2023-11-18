import httpClient from "../../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const getOne = () => {
  return httpClient.get(`/admin/point`);
};

export const updateMoney = (money) => {
  return httpClient.put(`/admin/point/update?money=${money}`);
};
