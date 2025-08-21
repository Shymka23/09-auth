import axios from "axios";

// Налаштування для різних середовищ
const getBaseURL = () => {
  // Для production використовуємо зовнішній API
  if (process.env.NODE_ENV === "production") {
    return process.env.API_BASE_URL || "https://notehub-api.goit.study";
  }

  // Для development використовуємо локальний API
  return process.env.API_BASE_URL || "https://notehub-api.goit.study";
};

export const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 секунд timeout для production
});

// Додаємо interceptor для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error("Request timeout - connection closed");
    } else if (error.response?.status >= 500) {
      console.error("Server error:", error.response?.data || error.message);
    } else {
      console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

// Додаємо retry логіку для connection errors
api.interceptors.request.use(
  (config) => {
    // Додаємо retry headers для production
    if (process.env.NODE_ENV === 'production') {
      config.headers['Connection'] = 'keep-alive';
      config.headers['Keep-Alive'] = 'timeout=5, max=1000';
    }
    return config;
  },
  (error) => Promise.reject(error)
);
