import NotesClient from "./Notes.client";
import { getServerNotes } from "@/lib/api/serverApi";
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

  // Серверна функція тепер не викидає помилки, а повертає порожні дані
  const initialData = await getServerNotes("", 1, tag);

  return <NotesClient initialData={initialData} tag={tag} />;
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
