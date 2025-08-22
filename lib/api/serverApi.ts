import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { User } from "@/types/user";
import { Note, NotesResponse } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as User;
};

export const updateServerUser = async (userData: {
  username?: string;
  email?: string;
}): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.patch("/users/me", userData, {
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

  const { data } = await api.get(`/notes?${params.toString()}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as NotesResponse;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as Note;
};
