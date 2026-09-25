import Link from 'next/link';
import { getDestination, destinationSlugs } from '@/lib/api';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const destinations = await Promise.all(destinationSlugs.map((slug) => getDestination(slug, locale as Locale)));
  const title = locale === 'fr' ? 'Des lieux où rester un peu plus longtemps.' : 'Places worth staying with a little longer.';
  const lede = locale === 'fr' ? 'Pas une liste de villes. Des mondes à parcourir, reliés aux expériences, aux histoires, à la table et à votre voyage.' : 'Not a list of cities. Worlds to move through, connected to experiences, stories, food and your journey.';
  return <main className="destinations-index"><header><Link href={`/${locale}`} className="destination-brand">BONNE<br />ASSISE</Link><Link href={`/${locale}/experiences`}>All experiences ↗</Link></header><section className="destinations-index-hero"><p className="eyebrow dark">DESTINATIONS</p><h1>{title}</h1><p>{lede}</p></section><section className="destinations-index-list">{destinations.map((destination, index) => <Link className="destination-index-card" href={`/${locale}/destinations/${destination.id}`} key={destination.id}><div className="destination-index-image" style={{ backgroundImage: `url(${destination.hero.image})` }} /><div className="destination-index-copy"><span>0{index + 1} · {destination.region}</span><h2>{destination.name}</h2><p>{destination.hero.subtitle}</p><b>Enter the place ↗</b></div></Link>)}</section><footer><Link href={`/${locale}`}>BONNE ASSISE</Link><span>© 2026 Bonne Assise</span></footer></main>;
}
