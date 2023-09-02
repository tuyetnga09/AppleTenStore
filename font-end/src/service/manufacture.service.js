import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) =>{
    return  httpClient.get(`/manufacture/display?${page}`);
}

export const returnDeleteAll = (page) =>{
  return  httpClient.get(`/manufacture/displayDelete?${page}`);
}

export const createManufacture = (manufacture) =>{
  return  httpClient.post("/manufacture/save", manufacture);
}

export const update = (id, manufacture) => {
  return httpClient.put(`/manufacture/update/${id}`, manufacture);
};

export const detail = (id) => {
  return httpClient.get(`/manufacture/${id}`);
};

export const deleteManufacture = (id) =>{
  return  httpClient.put(`/manufacture/delete/${id}`);
}

export const returnManufacture  = (id) =>{
  return  httpClient.put(`/manufacture/return/${id}`);
}

export const importManufacture  = (form) =>{
  return  httpClient.post("/manufacture/import", form, config);
}

export const search = (page, search) =>{
  return  httpClient.get(`/manufacture/search?${page}`, search);
}