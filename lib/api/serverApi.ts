import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note, NotesResponse } from "@/types/note";

export const checkServerSession = async (cookieHeader: string | null) => {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "";
  const res = await fetch(`${base}/api/auth/session`, {
    headers: { Cookie: cookieHeader ?? "" },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { api } = await import("@/lib/api/api");
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
  const { api } = await import("@/lib/api/api");
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

  const { api } = await import("@/lib/api/api");
  const { data } = await api.get(`/notes?${params.toString()}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as NotesResponse;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { api } = await import("@/lib/api/api");
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data as Note;
};
