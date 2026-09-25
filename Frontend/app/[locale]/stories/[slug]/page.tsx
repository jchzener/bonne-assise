import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDestination } from '@/lib/api';
import { isLocale, locales, type Locale } from '@/lib/i18n';

const storyAliases: Record<string, string> = { 'ouidah-history': 'two-traditions-one-street', 'afro-brazilian-ouidah': 'two-traditions-one-street', 'door-of-no-return': 'route-to-the-door-of-no-return', 'living-traditions-ouidah': 'living-vodun' };

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const destination = await getDestination('ouidah', locale);
    destination.stories.forEach((story) => params.push({ locale, slug: story.href.split('/').pop() || story.id }));
    Object.keys(storyAliases).forEach((slug) => params.push({ locale, slug }));
  }
  return params;
}

export default async function StoryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const data = await getDestination('ouidah', locale as Locale);
  const resolvedSlug = storyAliases[slug] || slug;
  const story = data.stories.find((item) => item.href.endsWith(`/${resolvedSlug}`));
  if (!story) notFound();
  return <main className="simple-editorial-page"><header><Link href={`/${locale}`} className="destination-brand">BONNE<br />ASSISE</Link><Link href={`/${locale}/destinations/ouidah`}>Back to Ouidah ↗</Link></header><section className="simple-editorial-hero"><div className="simple-editorial-image" style={{ backgroundImage:`url(${story.image})` }} /><div><p className="eyebrow dark">{story.eyebrow}</p><h1>{story.title}</h1><p>{story.description}</p></div></section><section className="simple-editorial-body"><p>{locale === 'fr' ? 'Cette note fait partie du monde éditorial de Ouidah. Le contenu long, les sources et les contributions locales seront développés dans la prochaine couche de Stories.' : 'This note belongs to the editorial world of Ouidah. Long-form context, sources and local contributions will be developed in the next Stories layer.'}</p><Link className="text-link" href={`/${locale}/destinations/ouidah`}>Return to Ouidah <span>↗</span></Link></section></main>;
}
