import { redirect } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OuidahRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect('/en/destinations/ouidah');
  redirect(`/${locale as Locale}/destinations/ouidah`);
}
