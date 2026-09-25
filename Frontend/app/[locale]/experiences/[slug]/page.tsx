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
  const copy = fr ? {
    back: 'Toutes les expériences',
    chapter: 'Prendre Place',
    context: 'Pourquoi cela compte',
    journey: "Le moment",
    host: "La personne derrière l'expérience",
    included: 'Votre place comprend',
    not: 'À prévoir',
    reserve: 'Votre place',
    related: 'Continuer le voyage',
    take: 'Prendre sa place',
    waiting: 'Rejoindre la liste d’attente',
    reserveCta: 'Réserver votre place',
    details: 'Infos essentielles',
    read: 'Lire',
  } : {
    back: 'All experiences',
    chapter: 'Prendre Place',
    context: 'Why this matters',
    journey: 'The moment',
    host: 'The person behind the experience',
    included: 'Your place includes',
    not: 'Before you come',
    reserve: 'Your place',
    related: 'Keep the journey going',
    take: 'Take your place',
    waiting: 'Join the waiting list',
    reserveCta: 'Reserve your place',
    details: 'Essential details',
    read: 'Read',
  };

  const cta = data.type === 'EVENT' ? copy.waiting : copy.reserveCta;
  const variant = data.id === 'the-first-table' ? 'journal' : data.id === 'life-on-the-water' ? 'water' : 'tactile';
  const image2 = data.steps[1] ? data.hero : data.host.image;
  const image3 = data.host.image;

  return <LocaleDocument locale={locale}>
    <main className={`experience-page experience-page--${variant}`}>
      <header className="experience-nav">
        <Link className="brand" href={`/${locale}`}>BONNE<br />ASSISE</Link>
        <div className="experience-nav-center"><span>PRENDRE PLACE</span><span className="nav-rule" /></div>
        <Link className="experience-nav-back" href={`/${locale}`}>{copy.back} <span>↗</span></Link>
      </header>

      <section className="experience-hero editorial-hero">
        <div className="experience-hero-media" style={{ backgroundImage: `url(${data.hero})` }} />
        <div className="experience-hero-overlay" />
        <div className="hero-side-note"><span>01</span><span>{data.place}</span><span>{data.duration}</span></div>
        <div className="experience-hero-content">
          <p className="eyebrow">{data.eyebrow} · {data.type.replace('_', ' ')}</p>
          <h1>{data.name}</h1>
          <p className="hero-promise">{data.title}</p>
        </div>
        <div className="hero-scroll-note"><span>SCROLL TO ENTER</span><i>↓</i></div>
      </section>

      <section className="experience-intro experience-editorial-block">
        <div className="chapter-mark"><span>02</span><p>{copy.chapter}</p></div>
        <div className="intro-main"><p className="editorial-kicker">{data.place} · {data.region}</p><h2>{data.promise}</h2><p className="intro-lede">{data.intro}</p></div>
      </section>

      <section className="experience-meaning experience-editorial-block">
        <div className="meaning-image" style={{ backgroundImage: `url(${image2})` }} />
        <div className="meaning-copy">
          <p className="eyebrow dark">03 · {copy.context}</p>
          <p className="meaning-lede">{data.why_it_matters}</p>
          <span className="editorial-caption">A Bonne Assise experience · {data.place}</span>
        </div>
      </section>

      <section className="experience-steps experience-editorial-block">
        <div className="steps-intro"><p className="eyebrow dark">04 · {copy.journey}</p><h2>{fr ? 'Entrez dans le rythme.' : 'Enter the rhythm.'}</h2><p>{fr ? 'Ce qui compte ici n’est pas de tout faire. C’est de laisser le moment prendre sa place.' : 'What matters is not completing a list. It is giving the moment enough room to unfold.'}</p></div>
        <div className="steps-list editorial-timeline">
          {data.steps.map((step, i) => <article className="step" key={`${step.time}-${step.title}`}>
            <div className="step-index">0{i + 1}</div>
            <div className="step-time">{step.time}</div>
            <div className="step-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
          </article>)}
        </div>
      </section>

      <section className="experience-image-break" aria-label={data.name}>
        <div className="image-break-main" style={{ backgroundImage: `url(${data.hero})` }} />
        <div className="image-break-caption"><span>05</span><p>{data.place}</p><em>{data.format}</em></div>
      </section>

      <section className="experience-host experience-editorial-block">
        <div className="host-copy">
          <p className="eyebrow dark">06 · {copy.host}</p>
          <p className="host-label">{data.host.role}</p>
          <h2>{data.host.name}</h2>
          <p className="host-bio">{data.host.bio}</p>
          <span className="editorial-caption">The experience is built around a person, not a performance.</span>
        </div>
        <div className="host-image-wrap"><div className="host-image" style={{ backgroundImage: `url(${image3})` }} /><span className="image-note">HOST / {data.place}</span></div>
      </section>

      <section className="experience-details experience-editorial-block">
        <div className="details-heading"><p className="eyebrow dark">07 · {copy.details}</p><h2>{fr ? 'Tout ce qu’il faut savoir.' : 'Everything you need to know.'}</h2></div>
        <div className="details-column"><p className="eyebrow dark">{copy.included}</p><ul>{data.included.map((x) => <li key={x}><span>+</span>{x}</li>)}</ul></div>
        <div className="details-column"><p className="eyebrow dark">{copy.not}</p><ul className="muted-list">{[...data.not_included, ...data.practical].map((x) => <li key={x}><span>—</span>{x}</li>)}</ul></div>
      </section>

      <section className="experience-booking" id="reserve">
        <div className="booking-art"><span>08</span><em>{data.place}</em></div>
        <div className="booking-inner">
          <div className="booking-copy"><p className="eyebrow">{copy.reserve}</p><h2>{copy.take}</h2><p>{data.availability_note}</p></div>
          <div className="booking-card">
            <div className="booking-card-top"><span>{data.type === 'EVENT' ? 'EVENT' : 'EXPERIENCE'}</span><strong>{data.name}</strong></div>
            <div className="booking-facts"><div><span>{fr ? 'Lieu' : 'Place'}</span><b>{data.place}</b></div><div><span>{fr ? 'Durée' : 'Duration'}</span><b>{data.duration}</b></div><div><span>{fr ? 'Tarif' : 'Price'}</span><b>{data.price_note}</b></div></div>
            <button>{cta}<span>↗</span></button>
          </div>
        </div>
      </section>

      <section className="experience-related experience-editorial-block">
        <div className="related-head"><p className="eyebrow dark">09 · {copy.related}</p><h2>{fr ? 'La suite peut être ailleurs.' : 'The next story can be somewhere else.'}</h2></div>
        <div className="related-grid">
          {data.related.map((item, i) => <Link key={item.id} href={`/${locale}${item.href.startsWith('/') ? item.href : `/${item.href}`}`} className="related-card"><span>0{i + 1}</span><div><small>{copy.read}</small><strong>{item.label}</strong></div><b>↗</b></Link>)}
        </div>
      </section>

      <footer className="experience-footer"><Link href={`/${locale}`}>BONNE ASSISE</Link><span>Benin · {data.place}</span><span>© 2026 Bonne Assise</span></footer>
    </main>
  </LocaleDocument>;
}
