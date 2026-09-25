'use client';

import { useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import type { DestinationResponse } from '@/lib/api';
import type { Locale } from '@/lib/i18n';

const COTONOU: [number, number] = [6.3703, 2.3912];

function haversineKm(a: [number, number], b: [number, number]) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export default function DestinationExperience({ data, locale }: { data: DestinationResponse; locale: Locale }) {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 850], [1, 1.07]);
  const heroY = useTransform(scrollY, [0, 850], ['0%', '8%']);
  const home = `/${locale}`;
  const [userOrigin, setUserOrigin] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);

  const localPath = (href: string) => { if (!href.startsWith('/')) return href; if (/^\/(en|fr)(\/|$)/.test(href)) return href; return `/${locale}${href}`; };
  const destinationDistance = Math.round(haversineKm(COTONOU, data.hero.coordinates));
  const userDistance = useMemo(() => userOrigin ? Math.round(haversineKm(userOrigin, data.hero.coordinates)) : null, [userOrigin, data.hero.coordinates]);
  const displayedDistance = userDistance ?? destinationDistance;
  const estimatedMinutes = Math.max(15, Math.round((displayedDistance / 42) * 60));

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserOrigin([position.coords.latitude, position.coords.longitude]);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };


  const storyCards = data.stories.slice(0, 3);
  const foodCards = data.foods.slice(0, 3);

  return (
    <main className="destination-world">
      <header className="destination-world-nav">
        <Link className="destination-brand" href={home} aria-label="Bonne Assise home">BONNE<br />ASSISE</Link>
        <nav aria-label="Destination navigation">
          <a href="#place">The place</a>
          <a href="#experiences">Experiences</a>
          <a href="#food">Food</a>
          <a href="#stories">Stories</a>
        </nav>
        <div className="destination-world-actions">
          <Link href={`/${locale}/experiences`}>All experiences</Link>
          <Link href={home}>Benin ↗</Link>
        </div>
      </header>

      <section className="destination-world-hero" id="top">
        <motion.div className="destination-world-hero-media" style={{ backgroundImage: `url(${data.hero.image})`, scale: heroScale, y: heroY }} />
        <div className="destination-world-hero-wash" />
        <div className="destination-world-hero-content">
          <p className="eyebrow">{data.hero.eyebrow}</p>
          <h1>{data.hero.title}</h1>
          <p className="destination-world-subtitle">{data.hero.subtitle}</p>
        </div>
        <div className="destination-world-coordinates">{data.hero.coordinates[0].toFixed(2)}°N<br />{data.hero.coordinates[1].toFixed(2)}°E</div>
        <a className="destination-world-enter" href="#place">Enter the place <span>↓</span></a>
      </section>

      <section className="destination-orientation section" id="place">
        <div className="destination-orientation-label"><p className="eyebrow dark">A PLACE TO FOLLOW</p><span>{data.name} · {data.region}</span></div>
        <div className="destination-orientation-main">
          <h2>{locale === 'fr' ? <>Une ville que l’on<br /><em>lit lentement.</em></> : <>A city you<br /><em>read slowly.</em></>}</h2>
          <div className="destination-orientation-copy">
            <p>{data.intro}</p>
            <div className="destination-place-facts">
              <span><b>{userDistance ? 'FROM YOU' : locale === 'fr' ? 'DEPUIS COTONOU' : 'FROM COTONOU'}</b>{displayedDistance} km</span>
              <span><b>{locale === 'fr' ? 'TEMPS DE ROUTE' : 'ROAD TIME'}</b>≈ {Math.floor(estimatedMinutes / 60) > 0 ? `${Math.floor(estimatedMinutes / 60)}h ` : ''}{estimatedMinutes % 60} min</span>
              <span><b>{locale === 'fr' ? 'POUR Y ALLER' : 'GETTING THERE'}</b>Car · taxi</span>
            </div>
            {!userDistance && <button className="destination-location-link" type="button" onClick={requestLocation}>{locating ? 'Locating…' : locale === 'fr' ? 'Utiliser ma position ↗' : 'Use my location ↗'}</button>}
          </div>
        </div>
      </section>

      <section className="destination-threads-world section" id="stories">
        <div className="destination-section-head destination-read-head">
          <div><p className="eyebrow dark">READ THE PLACE</p><h2>More than<br /><em>one story.</em></h2></div>
          <p className="lede">Three ways into Ouidah — history, memory and living traditions. Read one, then follow the thread into the city.</p>
        </div>
        <div className="destination-read-grid">
          {storyCards.map((story, index) => (
            <Link href={localPath(story.href)} key={story.id} className={`destination-read-card read-card-${index + 1}`}>
              <div className="destination-read-image" style={{ backgroundImage: `url(${story.image})` }} />
              <div className="destination-read-copy">
                <p className="eyebrow dark">{story.eyebrow}</p>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <span>Read the story ↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="destination-world-experiences section" id="experiences">
        <div className="destination-section-head destination-section-head-tight">
          <div><p className="eyebrow dark">EXPERIENCES</p><h2>Don't just see it.<br /><em>Enter it.</em></h2></div>
          <p className="lede">Places become memorable through what you do there. These are the ways Bonne Assise helps you move from looking to taking part.</p>
        </div>
        <div className="destination-experience-world-list">
          {data.experiences.map((item, index) => (
            <motion.article key={item.id} className={`destination-experience-world-item collage-item collage-${index + 1}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7 }}>
              <Link href={localPath(item.href)} className="destination-experience-world-image" style={{ backgroundImage: `url(${item.image})` }}>
                <span>{item.category}</span><i>↗</i>
              </Link>
              <div className="destination-experience-world-copy">
                <p className="eyebrow dark">{item.duration}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link className="text-link" href={localPath(item.href)}>Explore the experience <span>↗</span></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="destination-food-world" id="food">
        <div className="section destination-food-world-inner">
          <div className="destination-food-world-copy">
            <p className="eyebrow">TASTE THE PLACE</p>
            <h2>Food is another<br /><em>way in.</em></h2>
            <p>Start with the table. Then follow the market, the ingredients, the people and the places behind it.</p>
            <Link className="text-link light" href={`/${locale}/experiences/five-first-tables`}>Start with five tables <span>↗</span></Link>
          </div>
          <div className="destination-food-world-constellation">
            {foodCards.map((food, index) => <Link href={localPath(food.href)} className={`food-constellation-item food-constellation-${index + 1}`} key={food.name}><div style={{ backgroundImage: `url(${food.image})` }} /><span>{food.name}</span><p>{food.description}</p></Link>)}
            <div className="food-constellation-note">Three tastes.<br />One place.</div>
          </div>
        </div>
      </section>

      <section className="destination-practical-world" id="field-notes">
        <div className="section destination-practical-world-inner">
          <div><p className="eyebrow">FIELD NOTES</p><h2>Read before<br /><em>you arrive.</em></h2></div>
          <div className="destination-practical-prose">{data.practical.slice(0, 4).map((item) => <p key={item}>{item}</p>)}<a className="pill-button" href="https://www.google.com/maps/search/?api=1&query=Ouidah%2C%20Benin" target="_blank" rel="noreferrer">Open the place on map <span>↗</span></a></div>
        </div>
      </section>

      <section className="destination-nearby-world section">
        <div className="destination-chapter-line">
          <div><p className="eyebrow dark">KEEP MOVING</p><h2>Ouidah is a chapter.<br /><em>Keep reading.</em></h2></div>
          <p>Follow the southern route or change rhythm completely. The next place is part of the story too.</p>
        </div>
        <div className="destination-nearby-world-list">{data.nearby.map((place) => <Link href={localPath(place.href)} key={place.id}><span>{place.region}</span><strong>{place.name}</strong><i>Explore ↗</i></Link>)}</div>
      </section>

      <section className="destination-journey-world">
        <div className="destination-journey-world-bg" />
        <div className="destination-journey-world-content"><p className="eyebrow">YOUR JOURNEY</p><h2>{locale === 'fr' ? <>Gardez Ouidah<br /><em>dans votre voyage.</em></> : <>Keep Ouidah<br /><em>in your journey.</em></>}</h2><p>{data.journeyText}</p><Link className="pill-button" href={`/${locale}#journey`}>{locale === 'fr' ? 'Ajouter à mon voyage' : 'Add to my journey'} <span>→</span></Link></div>
      </section>

      <footer className="destination-world-footer"><div><Link href={home}>BONNE<br />ASSISE</Link><p>A new way to discover Benin.<br />Built around places, people and stories.</p></div><nav><Link href={`/${locale}/destinations`}>Places</Link><Link href={`/${locale}/experiences`}>Experiences</Link><a href="#stories">Stories</a><a href="#food">Food</a><a href="#top">Top ↑</a></nav><span>© 2026 Bonne Assise · {data.name}</span></footer>
    </main>
  );
}
