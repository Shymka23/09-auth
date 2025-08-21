"use client";

import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id,
  });

  if (!id || id.trim() === "") {
    return (
      <div className={css.errorContainer}>
        <p className={css.errorMessage}>Invalid note ID</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={css.loadingContainer}>
        <p className={css.loadingText}>Loading, please wait...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className={css.errorContainer}>
        <p className={css.errorMessage}>Something went wrong.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {formatDate(note.createdAt)}
          {note.updatedAt !== note.createdAt && (
            <span className={css.updated}>
              {" "}
              • Updated: {formatDate(note.updatedAt)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
