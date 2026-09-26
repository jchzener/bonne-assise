import Link from 'next/link';
import { getExperienceCatalog } from '@/lib/api';
import { isLocale, locales, pageCopy } from '@/lib/i18n';
import LocaleDocument from '@/components/LocaleDocument';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return locale === 'fr'
    ? { title: 'Expériences — Bonne Assise', description: 'Des expériences pensées autour des personnes, des lieux et des détails qui restent.' }
    : { title: 'Experiences — Bonne Assise', description: 'Experiences built around people, places and details that stay with you.' };
}

export default async function ExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const fr = locale === 'fr';
  const c = pageCopy[locale].experiences;
  const experiences = await getExperienceCatalog(locale);

  return <LocaleDocument locale={locale}>
    <main className="experiences-index">
      <header className="experiences-index-nav">
        <Link className="brand" href={`/${locale}`}>BONNE<br />ASSISE</Link>
        <span>{c.chapter}</span>
        <Link href={`/${locale}`}>{c.back} ↗</Link>
      </header>

      <section className="experiences-index-hero">
        <p className="eyebrow dark">{c.chapter}</p>
        <h1>{fr ? <>Des expériences pour<br /><em>rencontrer le Bénin.</em></> : <>Experiences to<br /><em>meet Benin.</em></>}</h1>
        <p>{c.lede}</p>
      </section>

      <section className="experiences-index-list">
        {experiences.map((experience, index) => (
          <Link key={experience.id} href={`/${locale}/experiences/${experience.id}`} className={`experience-index-item experience-index-item--${index % 2 ? 'reverse' : 'normal'}`}>
            <div className="experience-index-media" style={{ backgroundImage: `url(${experience.hero})` }} />
            <div className="experience-index-copy">
              <p className="eyebrow dark">{experience.type.replace('_', ' ')} · {experience.place}</p>
              <h2>{experience.name}</h2>
              <p className="experience-index-promise">{experience.title}</p>
              <p className="experience-index-intro">{experience.promise}</p>
              <div className="experience-index-meta"><span>{experience.duration}</span><span>{experience.format}</span></div>
              <span className="text-link">{c.discover} <b>↗</b></span>
            </div>
          </Link>
        ))}
      </section>

      <section className="experiences-index-note">
        <p className="eyebrow dark">{c.note}</p>
        <h2>{c.noteTitle}</h2>
      </section>

      <footer className="experience-footer"><Link href={`/${locale}`}>BONNE ASSISE</Link><span>{fr ? 'Bénin · Prendre Place' : 'Benin · Prendre Place'}</span><span>© 2026 Bonne Assise</span></footer>
    </main>
  </LocaleDocument>;
}
