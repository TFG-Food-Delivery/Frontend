import axios from "axios";

export const customerAPI = axios.create({
    baseURL: "http://localhost:3000/api/customers",
    withCredentials: true,
});
