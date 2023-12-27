import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

export const getTimelinePostOfUser = (id) => API.get(`/post/timeline/${id}`);
export const likePost = (id, userId) =>
  API.put(`/post/like/${id}`, { userId: userId });
