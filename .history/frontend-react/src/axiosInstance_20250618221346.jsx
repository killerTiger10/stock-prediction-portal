import axios from "axios";

const basURL = import.meta.env.VITE_BACKEND_BASE_API;
const axiosInstance = axios.create({
  baseURL: basURL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(function (config) {
  console.log("request==>", config);
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
