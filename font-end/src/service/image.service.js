import httpClient from "../api/http-comons";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const readAll = (page) => {
    return httpClient.get(`/image/getAll?${page}`);
};

export const returnDeleteAll = (page) => {
    return httpClient.get(`/image/displayDelete?${page}`);
};

export const add = (image) => {
    return httpClient.post(`/image/save`, image, config);
};

export const update = (id, image) => {
    return httpClient.put(`/image/update/${id}`, image);
};

export const detail = (id) => {
    return httpClient.get(`/image/${id}`);
};

export const deleteImage = (id) => {
    return httpClient.delete(`/image/delete/${id}`);
};

export const returnImage = (id) => {
    return httpClient.put(`/image/return/${id}`);
};