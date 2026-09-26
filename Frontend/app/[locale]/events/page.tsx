import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHome } from '@/lib/api';
import { isLocale, locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const data = await getHome(locale);
  const fr = locale === 'fr';
  return (
    <main className="events-index-page">
      <header className="events-index-nav">
        <Link href={`/${locale}`} className="destination-brand">BONNE<br />ASSISE</Link>
        <Link href={`/${locale}`}>{fr ? 'Retour au Bénin' : 'Back to Benin'} ↗</Link>
      </header>
      <section className="events-index-intro">
        <p className="eyebrow dark">{fr ? 'LE BÉNIN, EN CE MOMENT' : 'BENIN, RIGHT NOW'}</p>
        <h1>{fr ? <>Ce qui se passe<br /><em>maintenant.</em></> : <>What is happening<br /><em>now.</em></>}</h1>
        <p>{fr ? 'Festivals, rencontres, musique et rendez-vous qui donnent au pays son rythme du moment.' : 'Festivals, gatherings, music and cultural moments that give the country its current rhythm.'}</p>
      </section>
      <section className="events-index-grid">
        {data.events.map((event) => (
          <a className="events-index-card" href={event.href} target="_blank" rel="noreferrer" key={event.id}>
            <div className="events-index-image" style={{ backgroundImage: `url(${event.image})` }} />
            <div className="events-index-copy">
              <span>{event.dateLabel} · {event.place}</span>
              <p>{event.category}</p>
              <h2>{event.title}</h2>
              <div>{fr ? 'Voir l’événement' : 'See the event'} ↗</div>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
