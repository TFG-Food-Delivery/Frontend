import axios from "axios";

export const orderAPI = axios.create({
    baseURL: "http://localhost:3000/api/orders",
    withCredentials: true,
});
