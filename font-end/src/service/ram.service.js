import httpClient from "../api/http-comons";
export const readAll = () =>{
    return  httpClient.get("/ram/display")
}

export const createRam = () =>{
  return  httpClient.get("/ram/save")
}

export const deleteRam = (id) =>{
  return  httpClient.get(`/ram/delete/${id}`)
}
