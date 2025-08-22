import axios from "axios";

// Використовуємо один налаштований інстанс Axios, який звертається до локальних Route Handlers
// База формується як `${NEXT_PUBLIC_API_URL}/api` відповідно до вимог
const baseURL = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
