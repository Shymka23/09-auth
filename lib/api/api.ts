import axios from "axios";

// Для клієнтських запитів використовуємо локальні API routes
const baseURL = "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
