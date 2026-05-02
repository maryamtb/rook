import type { Metadata, Viewport } from "next";

const TITLE = "Rook: Notes that speak code";
const DESCRIPTION =
  "A native Mac notes app for the code you write, paste, and keep around.";
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
        alt: "Rook, a native Mac notes app for the code you write, paste, and keep around",
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
