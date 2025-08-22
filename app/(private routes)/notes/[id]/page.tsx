import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getServerNoteById } from "@/lib/api/serverApi";
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
      queryFn: () => getServerNoteById(id),
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
    const note = await getServerNoteById(id);
    const title = `Note: ${note.title}`;
    const description = note.content
      ? note.content.slice(0, 160).replace(/\s+/g, " ").trim()
      : `View details for note: ${note.title}`;
    const url = `/notes/${encodeURIComponent(id)}`;
    const imageUrl =
      "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

    return {
      title,
      description,
      keywords: ["note", "details", note.title, "NoteHub"],
      openGraph: {
        type: "article",
        title,
        description,
        url,
        siteName: "NoteHub",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `Note: ${note.title}`,
            type: "image/jpeg",
          },
        ],
        // publishedTime and modifiedTime are optional; omit if not required by spec
        authors: ["NoteHub User"],
        tags: [note.tag],
      },
      twitter: {
        card: "summary_large_image",
        site: "@notehub",
        creator: "@notehub",
        title,
        description: description.slice(0, 200),
        images: [imageUrl],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    // Fallback metadata for error cases
    const fallbackTitle = "Note Details - NoteHub";
    const fallbackDescription = "View details of your note on NoteHub.";
    const url = `/notes/${encodeURIComponent(id)}`;
    const imageUrl =
      "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        type: "article",
        title: fallbackTitle,
        description: fallbackDescription,
        url,
        siteName: "NoteHub",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: "Note Details",
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@notehub",
        creator: "@notehub",
        title: fallbackTitle,
        description: fallbackDescription,
        images: [imageUrl],
      },
      alternates: {
        canonical: url,
      },
    };
  }
}
