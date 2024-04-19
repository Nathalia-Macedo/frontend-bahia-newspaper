import axios from "axios";

export const Api = axios.create({
    baseURL: "http://34.125.197.110:3333",
    timeout: 15000,
})