import axios from "axios";

export const authAPI = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});
