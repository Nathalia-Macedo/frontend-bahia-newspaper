import axios from "axios";

export const Api = axios.create({
    baseURL: "http://89.116.214.37:3333",
    timeout: 15000,
})