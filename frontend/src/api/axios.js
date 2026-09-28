// import axios from "axios";

// // Local vs Production (Render) URL dynamic handle karne ke liye
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Auto attach Token to every request (Fallback to both localStorage & sessionStorage)
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;





import axios from "axios";

// Environment variable se URL lekar trailing slash cleanup
const rawBaseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const cleanBaseURL = rawBaseURL.replace(/\/+$/, ""); // Base URL ke end ka '/' hataiega agar galti se lag gaya ho

const API = axios.create({
  baseURL: cleanBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto attach Token to every request (Safe for both localStorage & sessionStorage)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      // Modern Axios-safe header assignment
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;