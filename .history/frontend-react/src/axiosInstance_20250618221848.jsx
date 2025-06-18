import axios from "axios";

// Axios instance configured with request interceptor

const basURL = import.meta.env.VITE_BACKEND_BASE_API;
const axiosInstance = axios.create({
  baseURL: basURL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    console.log("request==>", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
