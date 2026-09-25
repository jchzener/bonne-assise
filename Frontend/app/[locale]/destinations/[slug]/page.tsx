import { notFound } from 'next/navigation';
import { getDestination, destinationSlugs } from '@/lib/api';
import DestinationExperience from '@/components/DestinationExperience';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.flatMap((locale) => destinationSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !destinationSlugs.includes(slug as typeof destinationSlugs[number])) return {};
  const data = await getDestination(slug, locale as Locale);
  return {
    title: `${data.name} — Bonne Assise`,
    description: data.hero.subtitle,
    alternates: {
      canonical: `/${locale}/destinations/${slug}`,
      languages: { en: `/en/destinations/${slug}`, fr: `/fr/destinations/${slug}` },
    },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !destinationSlugs.includes(slug as typeof destinationSlugs[number])) notFound();
  const data = await getDestination(slug, locale as Locale);
  return <DestinationExperience data={data} locale={locale as Locale} />;
}
