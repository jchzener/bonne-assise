import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bonne Assise — Benin, from inside",
  description: "Discover Benin through its food, places, people and local life.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
