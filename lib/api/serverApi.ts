import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note, NotesResponse } from "@/types/note";
import axios from "axios";

// Серверний API інстанс для звернення до зовнішнього API
const createServerApi = () => {
  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_URL ?? "https://notehub-api.goit.study",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const serverApi = createServerApi();
  const res = await serverApi.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const serverApi = createServerApi();
  const { data } = await serverApi.get("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as User;
};

export const updateServerUser = async (userData: {
  username?: string;
  email?: string;
}): Promise<User> => {
  const cookieStore = await cookies();
  const serverApi = createServerApi();
  const { data } = await serverApi.patch("/users/me", userData, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as User;
};

export const getServerNotes = async (
  search = "",
  page = 1,
  tag = ""
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  if (tag && tag !== "All") params.append("tag", tag);
  params.append("perPage", "12");

  const serverApi = createServerApi();
  const { data } = await serverApi.get(`/notes?${params.toString()}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as NotesResponse;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const serverApi = createServerApi();
  const { data } = await serverApi.get(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as Note;
};
