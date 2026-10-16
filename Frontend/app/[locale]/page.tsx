import { notFound } from "next/navigation";
import BAApp from "../ba-app";

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "fr") notFound();
  return <BAApp locale={locale as "en" | "fr"} />;
}
