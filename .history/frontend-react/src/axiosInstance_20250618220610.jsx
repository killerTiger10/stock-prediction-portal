import axios from "axios";

const basURL = import.meta.env.VITE_BACKEND_BASE_API;
const axiosInstance = axios.create({
  baseURL: basURL,
});

// Request Interceptor
axios.interceptors.request.use(function (config) {
  console.log("request==>", config);
  return config;
});

export default axiosInstance;

// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });
