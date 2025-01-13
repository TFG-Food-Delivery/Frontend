import axios from "axios";

export const restaurantAPI = axios.create({
    baseURL: "http://localhost:3000/api/restaurants",
    withCredentials: true,
});
