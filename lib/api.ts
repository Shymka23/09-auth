// Re-export functions from clientApi for backward compatibility
export {
  loginUser,
  registerUser,
  logoutUser,
  checkSession,
  getCurrentUser,
  updateUser,
} from "./api/clientApi";

// Note-related API functions
export const fetchNotes = async (search = "", page = 1, tag = "") => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  if (tag) params.append("tag", tag);
  params.append("perPage", "12");

  const response = await fetch(`/api/notes?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch notes");
  const data = await response.json();
  // API повертає { notes: Note[], totalPages: number }
  return data;
};

export const fetchNoteById = async (id: string) => {
  const response = await fetch(`/api/notes/${id}`);
  if (!response.ok) throw new Error("Failed to fetch note");
  return response.json();
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!response.ok) throw new Error("Failed to create note");
  return response.json();
};

export const deleteNote = async (id: string) => {
  const response = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete note");
  return response.json();
};

// Tags API function
export const getAllTags = async () => {
  const response = await fetch("/api/notes");
  if (!response.ok) {
    if (response.status === 401) {
      // Return empty array for unauthorized users
      return [];
    }
    throw new Error("Failed to fetch tags");
  }
  const data = await response.json();
  // API повертає { notes: Note[], totalPages: number }
  const notes = data.notes || [];
  const tags = new Set(
    notes.map((note: { tag?: string }) => note.tag).filter(Boolean)
  );

  // Додаємо "All" на початок списку
  const tagsArray = Array.from(tags);
  return ["All", ...tagsArray];
};
