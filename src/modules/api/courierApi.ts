import axios from "axios";

export const courierAPI = axios.create({
    baseURL: "http://localhost:3000/api/couriers",
    withCredentials: true,
});
