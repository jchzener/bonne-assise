import { notFound } from 'next/navigation';
import { getHome } from '@/lib/api';
import HomeExperience from '@/components/HomeExperience';
import { isLocale, locales } from '@/lib/i18n';
import LocaleDocument from '@/components/LocaleDocument';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const fr = locale === 'fr';
  return { title: fr ? 'Bonne Assise — Découvrir le Bénin' : 'Bonne Assise — Discover Benin', description: fr ? 'Une nouvelle façon de découvrir le Bénin par les lieux, les histoires et les rencontres.' : 'A new way to discover Benin through places, stories and encounters.' };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const data = await getHome(locale);
  return <LocaleDocument locale={locale}><HomeExperience data={data} locale={locale} /></LocaleDocument>;
}
