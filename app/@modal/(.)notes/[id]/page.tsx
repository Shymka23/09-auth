import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import NotePreviewClient from "./NotePreview.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: PageProps) {
  const { id } = await params;

  // Створюємо Query Client для серверного префетчу
  const queryClient = new QueryClient();

  // Префетчимо дані нотатки на сервері
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}
