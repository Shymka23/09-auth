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
  } catch {
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

// Notes API
export const fetchNotes = async (search = "", page = 1, tag = "") => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  if (tag) params.append("tag", tag);
  params.append("perPage", "12");

  const { data } = await clientApi.get(`/notes?${params.toString()}`);
  return data; // { notes, totalPages }
};

export const fetchNoteById = async (id: string) => {
  const { data } = await clientApi.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const { data } = await clientApi.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await clientApi.delete(`/notes/${id}`);
  return data;
};

export const getAllTags = async () => {
  try {
    const { data } = await clientApi.get("/notes");
    const notes = data.notes || [];
    const tags = new Set(
      notes.map((note: { tag?: string }) => note.tag).filter(Boolean)
    );
    const tagsArray = Array.from(tags);
    return ["All", ...tagsArray];
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) return [];
    throw error;
  }
};
