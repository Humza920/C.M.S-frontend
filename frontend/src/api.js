import axios from "axios";

export const api = axios.create({
    baseURL:"https://c-m-s-backend.vercel.app",
    withCredentials: true
})