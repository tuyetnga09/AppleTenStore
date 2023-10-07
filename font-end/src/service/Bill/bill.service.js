import httpClient from "../../api/http-comons";

export const searchNoDate = (page) => {
  return httpClient.get(`/manager/bill/searchNoDate?${page}`);
};

export const searchWithDate = (page) => {
  return httpClient.get(`/manager/bill/searchWithDate?${page}`);
};
