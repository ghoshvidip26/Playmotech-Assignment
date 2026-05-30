import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
})

API.interceptors.request.use((req) => {
    if (typeof window === "undefined") {
        return req;
    }

    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
})

export default API;
