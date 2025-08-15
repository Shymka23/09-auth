"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Modal } from "@/components/Modal/Modal";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotePreview.module.css";
interface NotePreviewProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.previewContainer}>
        {isLoading && <Loader />}

        {isError && (
          <div className={css.errorWrapper}>
            <ErrorMessage />
          </div>
        )}

        {note && (
          <>
            <div className={css.header}>
              <h2 className={css.title}>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>
            <div className={css.scrollableContent}>
              <div className={css.content}>
                <p>{note.content}</p>
              </div>
            </div>
            <div className={css.footer}>
              <div className={css.dates}>
                <span className={css.date}>
                  Created: {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <span className={css.date}>
                  Updated: {new Date(note.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
