"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormValues } from "@/types/note";

type NoteStoreState = {
  draft: FormValues;
  setDraft: (note: FormValues) => void;
  clearDraft: () => void;
};

export const initialDraft: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStoreState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft", // localStorage key
      version: 1,
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);

