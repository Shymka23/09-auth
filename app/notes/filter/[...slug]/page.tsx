import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { Metadata } from "next";

// Робимо сторінку динамічною для уникнення проблем з пререндерингом
export const dynamic = "force-dynamic";

interface NotesPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Notes({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";

  try {
    const initialData = await fetchNotes("", 1, tag);

    return <NotesClient initialData={initialData} tag={tag} />;
  } catch (error) {
    console.error("Error fetching initial data:", error);

    // При помилці не передаємо initialData, щоб уникнути проблем з гідратацією
    return <NotesClient tag={tag} />;
  }
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";
  const title = `Notes filtered by: ${tag} - NoteHub`;
  const description = `Browse your notes filtered by tag: ${tag} on NoteHub.`;
  const url = `/notes/filter/${encodeURIComponent(tag)}`;

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
}
