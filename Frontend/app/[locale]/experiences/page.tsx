import Link from 'next/link';
import { getExperienceCatalog } from '@/lib/api';
import { isLocale, locales } from '@/lib/i18n';
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
  const experiences = await getExperienceCatalog(locale);

  return <LocaleDocument locale={locale}>
    <main className="experiences-index">
      <header className="experiences-index-nav">
        <Link className="brand" href={`/${locale}`}>BONNE<br />ASSISE</Link>
        <span>PRENDRE PLACE</span>
        <Link href={`/${locale}`}>{fr ? 'Retour à l’accueil' : 'Back home'} ↗</Link>
      </header>

      <section className="experiences-index-hero">
        <p className="eyebrow dark">PRENDRE PLACE</p>
        <h1>{fr ? <>Des expériences pour<br /><em>rencontrer le Bénin.</em></> : <>Experiences to<br /><em>meet Benin.</em></>}</h1>
        <p>{fr ? 'Pas une liste d’activités. Des invitations pensées autour des personnes, des lieux, des gestes et des histoires qui donnent envie de rester un peu plus longtemps.' : 'Not a list of activities. Invitations built around people, places, gestures and stories that make you want to stay a little longer.'}</p>
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
              <span className="text-link">{fr ? 'Découvrir l’expérience' : 'Discover the experience'} <b>↗</b></span>
            </div>
          </Link>
        ))}
      </section>

      <section className="experiences-index-note">
        <p className="eyebrow dark">A DIFFERENT WAY IN</p>
        <h2>{fr ? 'Commencez par une expérience.<br /><em>Laissez le reste venir.</em>' : 'Start with one experience.<br /><em>Let the rest unfold.</em>'}</h2>
      </section>

      <footer className="experience-footer"><Link href={`/${locale}`}>BONNE ASSISE</Link><span>Benin · Prendre Place</span><span>© 2026 Bonne Assise</span></footer>
    </main>
  </LocaleDocument>;
}
