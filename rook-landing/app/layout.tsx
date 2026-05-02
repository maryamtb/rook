import { jakarta, jetbrains, spaceMono } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import "./globals.css";

export { metadata, viewport } from "./_metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${jakarta.variable} ${jetbrains.variable} ${spaceMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
