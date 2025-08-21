import axios from "axios";

// Використовуємо прямий URL до зовнішнього API
export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
