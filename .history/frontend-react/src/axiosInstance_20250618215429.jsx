import axios from "axios";

const basURL = import.meta.env.VITE_BACKEND_BASE_API;
const axiosInstance = axios.create({
  baseURL: basURL,
});

export default axiosInstance;
