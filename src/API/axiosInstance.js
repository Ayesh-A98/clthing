import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://eco1-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to outgoing requests automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Clean up local storage if token expires or is invalid
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userFallbackProfile");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;