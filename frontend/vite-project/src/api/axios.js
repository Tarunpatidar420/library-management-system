// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     config.headers["Content-Type"] = "application/json";
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, "");

const api = axios.create({
  baseURL: normalizedBaseUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;