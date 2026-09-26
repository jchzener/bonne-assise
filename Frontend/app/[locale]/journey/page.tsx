import Link from 'next/link';
import JourneySavedItems from '@/components/JourneySavedItems';
import { isLocale, locales } from '@/lib/i18n';
import LocaleDocument from '@/components/LocaleDocument';

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function JourneyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const fr = locale === 'fr';
  return <LocaleDocument locale={locale}>
    <main className="journey-editorial-page">
      <header className="simple-page-nav"><Link href={`/${locale}`} className="destination-brand">BONNE<br />ASSISE</Link><Link href={`/${locale}/experiences`}>{fr ? 'Expériences' : 'Experiences'} ↗</Link></header>
      <section className="journey-editorial-hero"><p className="eyebrow dark">YOUR JOURNEY</p><h1>{fr ? <>Ne faites pas que<br /><em>visiter.</em></> : <>Don't just<br /><em>visit.</em></>}</h1><p>{fr ? 'Gardez les lieux, expériences, histoires et tables qui vous attirent. Votre voyage se construira au fil de vos découvertes.' : 'Keep the places, experiences, stories and tables that pull you in. Your journey will take shape as you discover.'}</p></section>
      <JourneySavedItems locale={locale as 'en' | 'fr'} />
      <section className="journey-editorial-body"><div><span>01</span><h2>{fr ? 'Une mémoire de vos choix.' : 'A memory of what pulls you in.'}</h2></div><p>{fr ? 'Cette première version prépare l’espace où vos choix pourront devenir un itinéraire utilisable. Pour l’instant, commencez par explorer et laissez vos signaux affiner les propositions.' : 'This first version prepares the space where your choices can become a useful itinerary. For now, explore and let your signals quietly refine what we put in front of you.'}</p><Link className="pill-button" href={`/${locale}/destinations`}>{fr ? 'Continuer à découvrir' : 'Keep discovering'} <span>→</span></Link></section>
    </main>
  </LocaleDocument>;
}
