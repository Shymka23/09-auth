"use client";

import { useId, useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { FormValues } from "@/types/note";
import css from "./NoteForm.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNoteStore, initialDraft } from "@/lib/store/noteStore";

interface NoteFormProps {
  onCancel?: () => void;
}

export function NoteForm({ onCancel }: NoteFormProps) {
  const fieldId = useId();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const { draft, setDraft, clearDraft } = useNoteStore((s) => ({
    draft: s.draft,
    setDraft: s.setDraft,
    clearDraft: s.clearDraft,
  }));

  const values: FormValues =
    draft?.title || draft?.content || draft?.tag ? draft : initialDraft;

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      toast.success(`Note "${data.title}" created.`);
      startTransition(() => router.back());
    },
    onError: () => {
      toast.error("Failed to create note.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const note: FormValues = {
      title: String(formData.get("title") || "").trim(),
      content: String(formData.get("content") || "").trim(),
      tag: String(formData.get("tag") || "Todo") as FormValues["tag"],
    };
    await mutation.mutateAsync(note);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value } as FormValues);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          value={values.title}
          onChange={handleChange}
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={values.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          value={values.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isPending || mutation.isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending || mutation.isPending}
        >
          {mutation.isPending ? "Submitting..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
