import httpClient from "../api/http-comons";
export const readAll = (page) =>{
    return  httpClient.get(`/category/display?${page}`);
}

export const returnDeleteAll = (page) =>{
  return  httpClient.get(`/category/displayDelete?${page}`);
}

export const createCategory = (category) =>{
  return  httpClient.post("/category/save", category);
}

export const update = (id, category) => {
  return httpClient.put(`/category/update/${id}`, category);
};

export const detail = (id) => {
  return httpClient.get(`/category/${id}`);
};

export const deleteCategory = (id) =>{
  return  httpClient.put(`/category/delete/${id}`);
}

export const returnCategory = (id) =>{
  return  httpClient.put(`/category/return/${id}`);
}
