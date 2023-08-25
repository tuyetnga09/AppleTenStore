import httpClient from "../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const readAll = (page) =>{
    return  httpClient.get(`/ram/display?${page}`);
}

export const returnDeleteAll = (page) =>{
  return  httpClient.get(`/ram/displayDelete?${page}`);
}

export const createRam = (ram) =>{
  return  httpClient.post("/ram/save", ram);
}

export const update = (id, ram) => {
  return httpClient.put(`/ram/update/${id}`, ram);
};

export const detail = (id) => {
  return httpClient.get(`/ram/${id}`);
};

export const deleteRam = (id) =>{
  return  httpClient.put(`/ram/delete/${id}`);
}

export const returnRam = (id) =>{
  return  httpClient.put(`/ram/return/${id}`);
}

export const importRam = (form) =>{
  return  httpClient.post("/ram/import", form, config);
}
