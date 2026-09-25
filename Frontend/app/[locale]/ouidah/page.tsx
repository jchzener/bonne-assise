import { notFound } from 'next/navigation';
import { getDestination } from '@/lib/api';
import DestinationExperience from '@/components/DestinationExperience';
import { isLocale, locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OuidahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const data = await getDestination('ouidah');
  return <DestinationExperience data={data} />;
}
