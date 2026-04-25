import type { Metadata, Viewport } from "next";

const TITLE = "Rook: The note-taking app for developers";
const DESCRIPTION =
  "Rich text and code blocks, syntax highlighting, and various themes. Available for macOS.";
const SITE_URL = "https://userook.app";

export const viewport: Viewport = {
  themeColor: "#E8962E",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Maryam TB", url: "https://maryamtb.com" }],
  creator: "Maryam TB",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/icon-128.png",
    apple: "/icon-256.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
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
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};
