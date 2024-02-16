import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://doodleinc-task-server.vercel.app/api/v1",
  headers: {
    "Content-type": "application/json",

    Authorization: "Bearer " + localStorage.getItem("token"),
    credentials: "include",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
