import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bonne Assise — Benin, from inside",
  description: "Discover Benin through its food, places, people and local life.",
  metadataBase: new URL("https://bonne-assise-web.onrender.com"),
  openGraph: { title: "Bonne Assise — Benin, from inside", description: "A living guide to the places, tastes and people of Benin.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
