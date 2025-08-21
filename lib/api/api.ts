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
  timeout: 10000, // 10 секунд timeout
});

// Додаємо interceptor для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
