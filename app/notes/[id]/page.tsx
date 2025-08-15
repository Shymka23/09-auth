import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  if (!id || id.trim() === "") {
    throw new Error("Invalid note ID");
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch {
    // Prefetch error will be handled by the client component
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    const title = `${note.title} - NoteHub`;
    const description = note.content
      ? note.content.slice(0, 120)
      : `View details for note: ${note.title}`;
    const url = `/notes/${encodeURIComponent(id)}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note details - NoteHub",
      description: "View details of your note on NoteHub.",
      openGraph: {
        title: "Note details - NoteHub",
        description: "View details of your note on NoteHub.",
        url: `/notes/${encodeURIComponent(id)}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          },
        ],
      },
    };
  }
}
