import Link from 'next/link';
import { getDestination, destinationSlugs } from '@/lib/api';
import { isLocale, locales, type Locale, pageCopy } from '@/lib/i18n';
import { notFound } from 'next/navigation';
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  const destinations = await Promise.all(destinationSlugs.map((slug) => getDestination(slug, locale as Locale)));
  const c = pageCopy[locale].destinations;
  return <main className="destinations-index"><header><Link href={`/${locale}`} className="destination-brand">BONNE<br />ASSISE</Link><Link href={`/${locale}/experiences`}>{c.allExperiences} ↗</Link></header><section className="destinations-index-hero"><p className="eyebrow dark">{c.eyebrow}</p><h1>{c.title}</h1><p>{c.lede}</p></section><section className="destinations-index-list">{destinations.map((destination, index) => <Link className="destination-index-card" href={`/${locale}/destinations/${destination.id}`} key={destination.id}><div className="destination-index-image" style={{ backgroundImage: `url(${destination.hero.image})` }} /><div className="destination-index-copy"><span>0{index + 1} · {destination.region}</span><h2>{destination.name}</h2><p>{destination.hero.subtitle}</p><b>{c.enter} ↗</b></div></Link>)}</section><footer><Link href={`/${locale}`}>BONNE ASSISE</Link><span>© 2026 Bonne Assise</span></footer></main>;
}
