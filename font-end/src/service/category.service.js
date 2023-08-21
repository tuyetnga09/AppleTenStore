import httpClient from "../api/http-comons";
export const readAll = () =>{
    return  httpClient.get("/category/getAll")
}