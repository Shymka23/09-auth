import axios from "axios";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  UpdateUserData,
} from "@/types/user";

// Створюємо axios інстанс для клієнтських запитів
const clientApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Auth API
export const loginUser = async (
  credentials: LoginCredentials
): Promise<User> => {
  const response = await clientApi.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const response = await clientApi.post("/auth/register", credentials);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await clientApi.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const response = await clientApi.get("/auth/session");
    return response.data;
  } catch (error) {
    return null;
  }
};

// User API
export const getCurrentUser = async (): Promise<User> => {
  const response = await clientApi.get("/users/me");
  return response.data;
};

export const updateUser = async (userData: UpdateUserData): Promise<User> => {
  const response = await clientApi.patch("/users/me", userData);
  return response.data;
};

// Upload API - Завантажуємо файл на сервер і отримуємо URL
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await clientApi.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.url;
};
