import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) =>{
    return  httpClient.get(`/capacity/display?${page}`);
}

export const returnDeleteAll = (page) =>{
  return  httpClient.get(`/capacity/displayDelete?${page}`);
}

export const createCapacity = (capacity) =>{
  return  httpClient.post("/capacity/save", capacity);
}

export const update = (id, capacity) => {
  return httpClient.put(`/capacity/update/${id}`, capacity);
};

export const detail = (id) => {
  return httpClient.get(`/capacity/${id}`);
};

export const deleteCapacity = (id) =>{
  return  httpClient.put(`/capacity/delete/${id}`);
}

export const returnCapacity = (id) =>{
  return  httpClient.put(`/capacity/return/${id}`);
}

export const importCapacity = (form) =>{
  return  httpClient.post("/capacity/import", form, config);
}

export const search = (page, search) =>{
  return  httpClient.get(`/capacity/search?${page}`, search);
}

export const findCapacitisByIdProduct = (id) => {
    return httpClient.get(`/capacity/find-capacity-by-id-product/${id}`);
}