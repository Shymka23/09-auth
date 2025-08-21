import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Roboto, Inter, Poppins } from "next/font/google";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { LanguageProvider } from "@/lib/context/LanguageContext";

// Основний шрифт для тексту
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Шрифт для заголовків
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Шрифт для інтерфейсу
const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    default: "NoteHub - Personal Note Management App",
    template: "%s | NoteHub",
  },
  description:
    "A modern and efficient application for managing personal notes with search functionality and organized structure. Create, organize, and find your notes easily.",
  keywords: [
    "notes",
    "productivity",
    "organization",
    "personal",
    "management",
    "task management",
    "note taking",
  ],
  authors: [{ name: "Yevhen Shymka" }],
  creator: "Yevhen Shymka",
  publisher: "NoteHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://notehub.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://notehub.com",
    siteName: "NoteHub",
    title: "NoteHub - Personal Note Management App",
    description:
      "A modern and efficient application for managing personal notes with search functionality and organized structure. Create, organize, and find your notes easily.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Personal Note Management App",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@notehub",
    creator: "@notehub",
    title: "NoteHub - Personal Note Management App",
    description:
      "A modern and efficient application for managing personal notes with search functionality and organized structure.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#667eea" },
    { media: "(prefers-color-scheme: dark)", color: "#4a5568" },
  ],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${roboto.variable} ${poppins.variable} ${inter.variable}`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <TanStackProvider>
              <AuthProvider>
                <Header />

                <main>{children}</main>
                {modal}

                <Footer />
              </AuthProvider>
            </TanStackProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
