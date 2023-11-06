import httpClient from "../../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

// export const add = (employee, role) => {
//   return httpClient.post(`/admin/employee/create?role=${role}`, employee);
// };

export const add = (employee) => {
  return httpClient.post(`/admin/employee/create`, employee);
};
