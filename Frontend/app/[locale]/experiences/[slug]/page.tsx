import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getExperience } from '@/lib/api';
import { isLocale, locales } from '@/lib/i18n';
import LocaleDocument from '@/components/LocaleDocument';

const slugs = ['market-to-fire', 'life-on-the-water', 'the-first-table'];

export function generateStaticParams() {
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const data = await getExperience(locale, slug);
  return data ? { title: `${data.name} — Bonne Assise`, description: data.title } : {};
}

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !slugs.includes(slug)) notFound();
  const data = await getExperience(locale, slug);
  if (!data) notFound();
  const fr = locale === 'fr';
  const t = fr ? {
    explore: 'Explorer', why: 'Pourquoi cette expérience compte', host: 'Rencontrez la personne qui vous accueille', journey: "L'expérience", includes: 'Votre place comprend', not: 'Non compris', practical: 'Avant de venir', reserve: 'Votre place', price: 'Prix', availability: 'Disponibilité', related: 'Continuez à explorer', back: 'Toutes les expériences'
  } : {
    explore: 'Explore', why: 'Why this experience matters', host: 'Meet the person behind the experience', journey: 'The experience', includes: 'Your place includes', not: 'Not included', practical: 'Before you come', reserve: 'Your place', price: 'Price', availability: 'Availability', related: 'Keep exploring', back: 'All experiences'
  };
  const cta = data.type === 'EVENT' ? (fr ? 'Rejoindre la liste d’attente' : 'Join the waiting list') : (fr ? 'Réserver votre place' : 'Reserve your place');
  return <LocaleDocument locale={locale}>
    <main className="experience-page">
      <header className="experience-nav">
        <Link className="brand" href={`/${locale}`}>BONNE<br/>ASSISE</Link>
        <div className="experience-nav-right"><span>PRENDRE PLACE</span><Link href={`/${locale}`}>{t.back}</Link></div>
      </header>

      <section className="experience-hero">
        <div className="experience-hero-media" style={{ backgroundImage: `url(${data.hero})` }} />
        <div className="experience-hero-overlay" />
        <div className="experience-hero-content">
          <p className="eyebrow">{data.eyebrow} · {data.type.replace('_', ' ')}</p>
          <h1>{data.name}</h1>
          <p className="hero-promise">{data.title}</p>
          <div className="experience-hero-meta"><span>{data.place}</span><span>{data.duration}</span><span>{data.format}</span></div>
        </div>
      </section>

      <section className="experience-intro section-narrow">
        <div><p className="eyebrow dark">{fr ? "L'EXPÉRIENCE" : 'THE EXPERIENCE'}</p><span className="experience-intro-number">01</span></div>
        <div><h2>{data.promise}</h2><p>{data.intro}</p></div>
      </section>

      <section className="experience-meaning section-narrow">
        <div className="meaning-label"><p className="eyebrow dark">{t.why}</p></div>
        <div className="meaning-copy"><p>{data.why_it_matters}</p></div>
      </section>

      <section className="experience-steps">
        <div className="section-narrow steps-head"><p className="eyebrow dark">02 · {t.journey}</p><h2>{fr ? 'Un moment à vivre, pas un programme à cocher.' : 'A moment to enter, not a checklist to complete.'}</h2></div>
        <div className="steps-list">
          {data.steps.map((step, i) => <article className="step" key={step.time}>
            <div className="step-time">{step.time}</div><div className="step-index">0{i + 1}</div><div className="step-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
          </article>)}
        </div>
      </section>

      <section className="experience-host section-narrow">
        <div className="host-image" style={{ backgroundImage: `url(${data.host.image})` }} />
        <div className="host-copy"><p className="eyebrow dark">03 · {t.host}</p><h2>{data.host.name}</h2><p className="host-role">{data.host.role}</p><p>{data.host.bio}</p></div>
      </section>

      <section className="experience-details section-narrow">
        <div className="details-column"><p className="eyebrow dark">04 · {t.includes}</p><ul>{data.included.map(x => <li key={x}>✓ {x}</li>)}</ul></div>
        <div className="details-column"><p className="eyebrow dark">{t.not}</p><ul className="muted-list">{data.not_included.map(x => <li key={x}>— {x}</li>)}</ul></div>
        <div className="details-column"><p className="eyebrow dark">{t.practical}</p><ul className="muted-list">{data.practical.map(x => <li key={x}>· {x}</li>)}</ul></div>
      </section>

      <section className="experience-booking">
        <div className="booking-inner section-narrow">
          <div><p className="eyebrow">{t.reserve}</p><h2>{data.name}</h2><p>{data.availability_note}</p></div>
          <div className="booking-card"><div><span>{t.price}</span><strong>{data.price_note}</strong></div><div><span>{t.availability}</span><strong>{data.availability_note}</strong></div><button>{cta} <span>↗</span></button></div>
        </div>
      </section>

      <section className="experience-related section-narrow">
        <div className="related-head"><p className="eyebrow dark">{t.related}</p><h2>{fr ? 'Continuez le voyage.' : 'Keep going.'}</h2></div>
        <div className="related-grid">{data.related.map(item => <Link key={item.id} href={`/${locale}${item.href.startsWith('/') ? item.href : `/${item.href}`}`} className="related-card"><span>{item.label}</span><b>↗</b></Link>)}</div>
      </section>

      <footer className="experience-footer"><Link href={`/${locale}`}>BONNE ASSISE</Link><span>© 2026 Bonne Assise</span></footer>
    </main>
  </LocaleDocument>;
}
