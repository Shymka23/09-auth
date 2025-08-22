import { api } from "@/lib/api/api";
import { User } from "@/types/user";
import { Note, NotesResponse } from "@/types/note";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface UpdateUserData {
  username?: string;
  email?: string;
}

// Auth API
export const loginUser = async (
  credentials: LoginCredentials
): Promise<User> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const response = await api.post("/auth/register", credentials);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const response = await api.get("/auth/session");
    return response.data;
  } catch {
    return null;
  }
};

// User API
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/me");
  return response.data;
};

export const updateUser = async (userData: UpdateUserData): Promise<User> => {
  const response = await api.patch("/users/me", userData);
  return response.data;
};

// Notes API
export const fetchNotes = async (
  search = "",
  page = 1,
  tag = ""
): Promise<NotesResponse> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  if (tag) params.append("tag", tag);
  params.append("perPage", "12");

  const { data } = await api.get(`/notes?${params.toString()}`);
  return data as NotesResponse;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data as Note;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await api.post("/notes", note);
  return data as Note;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data as Note;
};
