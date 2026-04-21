import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://userook.app"),
  title: "Rook: The note-taking app for developers",
  description:
    "Rich text and code blocks, syntax highlighting, and various themes. Available for macOS.",
  icons: {
    icon: "/icon-128.png",
    apple: "/icon-256.png",
  },
  openGraph: {
    title: "Rook: The note-taking app for developers",
    description:
      "Rich text and code blocks, syntax highlighting, and various themes. Available for macOS.",
    type: "website",
    url: "https://userook.app",
    images: [
      {
        url: "/og.png",
        width: 2134,
        height: 1147,
        alt: "Rook, a native macOS note-taking app for developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rook: The note-taking app for developers",
    description:
      "Rich text and code blocks, syntax highlighting, and various themes. Available for macOS.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jakarta.variable} ${jetbrains.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
