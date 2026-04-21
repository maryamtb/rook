import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Space_Mono } from "next/font/google";
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
  title: "Rook: The note-taking app for developers",
  description:
    "Rich text, code blocks, syntax highlighting, and themes that actually look good. A native macOS note-taking app built for the way you work.",
  icons: {
    icon: "/icon-128.png",
    apple: "/icon-256.png",
  },
  openGraph: {
    title: "Rook: The note-taking app for developers",
    description:
      "Rich text, code blocks, syntax highlighting, and themes that actually look good. A native macOS app built for the way you work.",
    type: "website",
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
      </body>
    </html>
  );
}
