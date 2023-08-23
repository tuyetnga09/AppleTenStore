import httpClient from "../api/http-comons";
export const readAll = (page) =>{
    return  httpClient.get(`/screen/display?${page}`);
}

export const readAllDelete = (page) =>{
  return  httpClient.get(`/screen/displayDelete?${page}`);
}

export const create = (screen) =>{
  return  httpClient.post("/screen/save", screen);
}

export const update = (id, screen) => {
  return httpClient.put(`/screen/update/${id}`, screen);
};

export const detail = (id) => {
  return httpClient.get(`/screen/${id}`);
};

export const deleteScreen = (id) =>{
  return  httpClient.put(`/screen/delete/${id}`);
}

export const returnScreen = (id) =>{
  return  httpClient.put(`/screen/return/${id}`);
}