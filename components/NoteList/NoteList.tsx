import css from "./NoteList.module.css";

import Link from "next/link";
import toast from "react-hot-toast";
import { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`Note "${data.title}" deleted successfully.`);
    },
    onError: (error) => {
      toast.error(`Failed to delete note: ${error.message}`);
    },
  });

  const handleDelete = (note: Note) => {
    if (window.confirm(`Are you sure you want to delete "${note.title}"?`)) {
      mutation.mutate(note.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <div className={css.header}>
            <Link
              href={`/notes/${note.id}`}
              className={css.titleLink}
              scroll={false}
            >
              <h2 className={css.title}>{note.title}</h2>
            </Link>
            <span className={css.date}>{formatDate(note.createdAt)}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.actions}>
              <Link
                href={`/notes/${note.id}`}
                className={css.viewButton}
                scroll={false}
              >
                View details
              </Link>
              <button
                className={css.deleteButton}
                onClick={() => handleDelete(note)}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
