import axios from "axios";
import { FormValues, Note, NotesResponse } from "@/types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api/notes";

const getAuthHeaders = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error("API token is not configured");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  try {
    const params = {
      ...(search && { search }),
      ...(tag && tag !== "All" && { tag }),
      page,
      perPage: 12,
    };

    const response = await axios.get<NotesResponse>(API_BASE_URL, {
      params,
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Invalid token - please check your API configuration");
      }
      throw new Error(
        `Failed to fetch notes: ${error.response?.data?.message || error.message}`
      );
    }
    throw new Error("An unexpected error occurred while fetching notes");
  }
};

export const createNote = async (note: FormValues): Promise<Note> => {
  try {
    const response = await axios.post<Note>(API_BASE_URL, note, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to create note: ${error.response?.data?.message || error.message}`
      );
    }
    throw new Error("An unexpected error occurred while creating note");
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to delete note: ${error.response?.data?.message || error.message}`
      );
    }
    throw new Error("An unexpected error occurred while deleting note");
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await axios.get<Note>(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch note details: ${error.response?.data?.message || error.message}`
      );
    }
    throw new Error("An unexpected error occurred while fetching note details");
  }
};

export const getAllTags = (): string[] => {
  return ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
};
