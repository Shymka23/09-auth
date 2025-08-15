import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub - Personal Note Management App",
  description:
    "A modern and efficient application for managing personal notes with search functionality and organized structure.",
  keywords: ["notes", "productivity", "organization", "personal", "management"],
  authors: [{ name: "Yevhen Shymka" }],
  openGraph: {
    title: "NoteHub - Personal Note Management App",
    description:
      "A modern and efficient application for managing personal notes with search functionality and organized structure.",
    url: "/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${roboto.variable}`}>
        <TanStackProvider>
          <Header />

          <main>{children}</main>
          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
