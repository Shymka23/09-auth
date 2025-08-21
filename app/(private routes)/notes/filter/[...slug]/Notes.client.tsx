"use client";

import css from "./NotePage.module.css";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";

import { NotesResponse } from "@/types/note";
import Pagination from "@/components/Pagination/Pagination";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { ErrorMessageEmpty } from "@/components/ErrorMessageEmpty/ErrorMessageEmpty";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";
import { SearchBox } from "@/components/SearchBox/SearchBox";

interface NotesClientProps {
  initialData?: NotesResponse;
  tag: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["notes", query, currentPage, tag],
    queryFn: () => fetchNotes(query, currentPage, tag),
    placeholderData: keepPreviousData,
    // Використовуємо initialData тільки для початкового запиту
    initialData:
      query === "" && currentPage === 1 && initialData
        ? initialData
        : undefined,
    refetchOnMount: false,
    // Якщо немає initialData, завантажуємо дані одразу
    enabled: true,
    retry: 3, // Повторити запит 3 рази при помилці
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setCurrentPage(1);
    },
    1000
  );

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={(page: number) => {
              setCurrentPage(page);
            }}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

      {isLoading && <Loader />}

      {isError && (
        <div className={css.errorContainer}>
          <ErrorMessage />
          <button onClick={handleRetry} className={css.retryButton}>
            Try again
          </button>
        </div>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      {isSuccess && notes.length === 0 && <ErrorMessageEmpty />}

      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
