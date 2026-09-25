"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { DestinationResponse } from "@/lib/api";

export default function DestinationExperience({
  data,
}: {
  data: DestinationResponse;
}) {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 850], [1, 1.09]);
  const heroY = useTransform(scrollY, [0, 850], ["0%", "10%"]);

  return (
    <main className="destination-shell">
      <header className="destination-nav">
        <a className="wordmark dark-wordmark" href="/">
          BONNE
          <br />
          ASSISE
        </a>
        <div className="destination-nav-center">
          <a href="#experiences">Experiences</a>
          <a href="#food">Food</a>
          <a href="#stories">Stories</a>
          <a href="#practical">Practical</a>
        </div>
        <a className="destination-back" href="/">
          Back to Benin <span>↗</span>
        </a>
      </header>

      <section className="destination-hero">
        <motion.div
          className="destination-hero-media"
          style={{
            backgroundImage: `url(${data.hero.image})`,
            scale: heroScale,
            y: heroY,
          }}
        />
        <div className="destination-hero-overlay" />
        <div className="destination-hero-content">
          <p className="eyebrow">{data.hero.eyebrow}</p>
          <h1>{data.hero.title}</h1>
          <p>{data.hero.subtitle}</p>
        </div>
        <div className="destination-coordinates">
          06°21′N
          <br />
          02°05′E
        </div>
      </section>

      <section className="destination-intro section">
        <div>
          <p className="eyebrow dark">01 · UNDERSTAND THE PLACE</p>
        </div>
        <div className="destination-intro-copy">
          <h2>
            A city you
            <br />
            <em>read slowly.</em>
          </h2>
          <p>{data.intro}</p>
          <a className="text-link" href="#experiences">
            Explore Ouidah <span>↘</span>
          </a>
        </div>
      </section>

      <section className="destination-threads section">
        <div className="destination-threads-head">
          <div>
            <p className="eyebrow dark">02 · READ OUIDAH</p>
            <h2>
              More than
              <br />
              <em>one story.</em>
            </h2>
          </div>
          <p className="lede">
            The city becomes clearer when you follow a few connected threads
            instead of a checklist of sights.
          </p>
        </div>
        <div className="thread-grid">
          {data.threads.map((thread, index) => (
            <motion.article
              key={thread.id}
              className={`thread-card thread-${index + 1}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <span>{thread.label}</span>
              <h3>{thread.title}</h3>
              <p>{thread.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="destination-explore section" id="experiences">
        <div className="split-heading">
          <div>
            <p className="eyebrow dark">03 · SIGNATURE EXPERIENCES</p>
            <h2>
              Start with
              <br />
              <em>what matters.</em>
            </h2>
          </div>
          <p className="lede">
            Don't collect sights. Follow a thread through the city and let each
            experience reveal another layer of Ouidah.
          </p>
        </div>
        <div className="destination-experience-list">
          {data.experiences.map((item, index) => (
            <motion.article
              key={item.id}
              className={`destination-experience-card ${index % 2 ? "reverse" : ""}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="destination-experience-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <span>{item.category}</span>
              </div>
              <div className="destination-experience-copy">
                <p className="eyebrow dark">{item.duration}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="text-link">
                  Explore this experience <span>↗</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="destination-food" id="food">
        <div className="section food-inner">
          <div className="food-heading">
            <p className="eyebrow">04 · TASTE OUIDAH</p>
            <h2>
              Another way
              <br />
              <em>to know a place.</em>
            </h2>
            <p>
              Food is geography too. Start with the southern table, then follow
              the people, markets and kitchens behind it.
            </p>
          </div>
          <div className="food-grid">
            {data.foods.map((food, i) => (
              <motion.article
                key={food.name}
                className={`food-card food-${i + 1}`}
                whileHover={{ y: -6 }}
              >
                <div style={{ backgroundImage: `url(${food.image})` }} />
                <p>{food.name}</p>
                <span>{food.description}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="destination-stories section" id="stories">
        <div className="stories-head">
          <p>Read Ouidah before you travel it.</p>
          <div>
            <p className="eyebrow dark">05 · FIELD NOTES</p>
            <h2>
              Stories that
              <br />
              <em>open doors.</em>
            </h2>
          </div>
        </div>
        <div className="destination-story-grid">
          {data.stories.map((story, i) => (
            <article
              key={story.id}
              className={`destination-story-card story-${i + 1}`}
            >
              <div
                className="destination-story-image"
                style={{ backgroundImage: `url(${story.image})` }}
              />
              <div>
                <p className="eyebrow dark">{story.eyebrow}</p>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <button className="text-link">
                  Read story <span>↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="destination-practical" id="practical">
        <div className="section practical-grid">
          <div>
            <p className="eyebrow">06 · GO DEEPER</p>
            <h2>
              Useful,
              <br />
              <em>when you need it.</em>
            </h2>
          </div>
          <div className="practical-list">
            {data.practical.map((item, i) => (
              <div key={item}>
                <span>0{i + 1}</span>
                <p>{item}</p>
              </div>
            ))}
            <a
              className="pill-button"
              href="https://www.google.com/maps/search/?api=1&query=Ouidah%2C%20Benin"
              target="_blank"
              rel="noreferrer"
            >
              Open Ouidah on map <span>↗</span>
            </a>
            <p className="content-note">
              Editorial direction informed by Bénin Tourisme, Laure Wanders and
              Unseen Benin. Facts should be verified against authoritative local
              sources before publication.
            </p>
          </div>
        </div>
      </section>

      <section className="destination-nearby section">
        <div className="split-heading">
          <div>
            <p className="eyebrow dark">07 · KEEP MOVING</p>
            <h2>
              Nearby,
              <br />
              <em>but different.</em>
            </h2>
          </div>
          <p className="lede">
            Ouidah works best as part of a southern journey. Keep the map open
            and let the next place emerge.
          </p>
        </div>
        <div className="nearby-list">
          {data.nearby.map((place, i) => (
            <a key={place} href="#" className="nearby-item">
              <span>0{i + 1}</span>
              <strong>{place}</strong>
              <i>Explore ↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className="destination-journey">
        <div className="destination-journey-bg" />
        <div className="destination-journey-content">
          <p className="eyebrow">YOUR JOURNEY</p>
          <h2>
            Make Ouidah
            <br />
            <em>part of yours.</em>
          </h2>
          <p>
            Save this destination and we'll help turn your curiosity into a
            journey you can actually use.
          </p>
          <button className="pill-button">
            Add Ouidah to my journey <span>→</span>
          </button>
        </div>
      </section>

      <footer className="footer destination-footer">
        <div className="footer-top">
          <div className="footer-brand">
            BONNE
            <br />
            ASSISE
          </div>
          <div className="footer-note">
            A new way to discover Benin.
            <br />
            Built around places, people and stories.
          </div>
          <nav className="footer-links">
            <a href="/">Discover</a>
            <a href="/">Places</a>
            <a href="#stories">Stories</a>
            <a href="#food">Food</a>
            <a href="#">Your journey</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bonne Assise</span>
          <span>Ouidah · Benin</span>
        </div>
      </footer>
    </main>
  );
}
