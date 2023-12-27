import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8080/api" });

export const userChats = (id) => API.get(`/chat/${id}`);
