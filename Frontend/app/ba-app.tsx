"use client";

import { useEffect, useState } from "react";

type Page =
  | "home"
  | "explore"
  | "place"
  | "food"
  | "experience"
  | "trip"
  | "saved"
  | "story";

const photos = {
  market:
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=85",
  street:
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=85",
  cook: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=85",
  women:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
  grill:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
  coast:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
  boats:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85",
  fisherman:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85",
  city: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=85",
};

const pages: Page[] = [
  "home",
  "explore",
  "place",
  "food",
  "experience",
  "trip",
  "saved",
  "story",
];

const editionSets = [
  [
    [
      "Explore · Littoral",
      "COTO|NOU",
      "City of movement",
      "place",
      "edition-blue",
    ],
    [
      "Explore · Ouémé",
      "PORTO|—NOVO",
      "City of layers",
      "place",
      "edition-red",
    ],
    [
      "Taste · North",
      "WA|GASSI",
      "A food with a territory",
      "food",
      "edition-yellow",
    ],
    [
      "Experience · Atacora",
      "NORTH|BOUND",
      "Take the red road",
      "experience",
      "edition-cyan",
    ],
  ],
  [
    [
      "Place · Mono",
      "GRAND|POPO",
      "Where river meets sea",
      "place",
      "edition-cyan",
    ],
    ["Food · South", "AMI|WO", "Red rice, many tables", "food", "edition-red"],
    [
      "People · Cotonou",
      "MARKET|NAMES",
      "Meet the people behind the place",
      "story",
      "edition-yellow",
    ],
    [
      "Guide · Ouidah",
      "OUI|DAH",
      "History still in motion",
      "place",
      "edition-blue",
    ],
  ],
  [
    ["Place · Nokoué", "GAN|VIÉ", "Life on the water", "place", "edition-blue"],
    [
      "Experience · Cotonou",
      "AFTER|DARK",
      "Follow the smoke",
      "experience",
      "edition-red",
    ],
    [
      "Food · Everywhere",
      "FIVE|MEALS",
      "Start with the table",
      "food",
      "edition-yellow",
    ],
    [
      "Story · Atacora",
      "RED|ROAD",
      "A slower way north",
      "story",
      "edition-cyan",
    ],
  ],
  [
    [
      "Guide · Porto-Novo",
      "EARLY|LIGHT",
      "Meet the city before breakfast",
      "story",
      "edition-yellow",
    ],
    [
      "Food · Markets",
      "BUY|LOCAL",
      "Take it home, make it together",
      "food",
      "edition-cyan",
    ],
    [
      "Experience · Mono",
      "ON THE|WATER",
      "Two quiet hours with a local",
      "experience",
      "edition-blue",
    ],
    [
      "Place · Abomey",
      "ROYAL|GROUND",
      "Memory in the red earth",
      "place",
      "edition-red",
    ],
  ],
];

const foodCycles = [
  {
    label: "Fresh Peulh Cheese",
    title: "Wagassi",
    image: photos.cook,
    intro: "One taste, many paths",
    paths: ["From the north", "Made by hand", "Taste it here", "Go further"],
    detail: "Borgou & Alibori",
    link: "Follow the story of Wagassi",
  },
  {
    label: "Five meals to begin with",
    title: "Start at the table",
    image: photos.market,
    intro: "A first taste of Benin",
    paths: [
      "Amiwo at noon",
      "Akassa by the water",
      "Grilled fish at dusk",
      "Pâte with a local sauce",
    ],
    detail: "Across the country",
    link: "Explore Beninese food",
  },
  {
    label: "Buy with a local",
    title: "Cook. Sit down.",
    image: photos.women,
    intro: "The market is the beginning",
    paths: [
      "Choose what is fresh",
      "Learn the ingredients",
      "Cook together",
      "Eat without rushing",
    ],
    detail: "Cotonou · Porto-Novo",
    link: "Meet the people behind the table",
  },
  {
    label: "A taste of the north",
    title: "The red road",
    image: photos.grill,
    intro: "Food can be a direction",
    paths: [
      "Follow the ingredients",
      "Meet a maker",
      "Eat where it comes from",
      "Keep going north",
    ],
    detail: "Atacora · Borgou",
    link: "Take the food trail",
  },
];

const peopleEntries = [
  [
    "Cook · Cotonou",
    "Rosine sees a market as a kitchen without walls.",
    photos.women,
  ],
  ["Fisherman · Lake Nokoué", "Koffi, keeper of the water.", photos.fisherman],
  ["Maker · Natitingou", "Aïssatou works the old way, by hand.", photos.cook],
  [
    "Guide · Ouidah",
    "Désiré knows where the road changes character.",
    photos.street,
  ],
];

function Icon({
  name,
  size = 20,
}: {
  name:
    | "search"
    | "heart"
    | "menu"
    | "close"
    | "arrow"
    | "plus"
    | "user"
    | "share"
    | "check";
  size?: number;
}) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    menu: (
      <>
        <path d="M4 7h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m5 5 14 14M19 5 5 19" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.6-4.1 3.3-6 8-6s7.4 1.9 8 6" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="m8.2 10.8 7.5-4.4M8.2 13.3l7.5 4.4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Button({
  children,
  onClick,
  variant = "dark",
  ariaLabel,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "dark" | "light" | "line" | "icon";
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function Link({
  children,
  to,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  to: Page;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a href={`#${to}`} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

function ExternalLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return <a href={href}>{children}</a>;
}

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

function FilterButton({
  children,
  active = false,
  className = "",
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <button className={`${active ? "active" : ""} ${className}`}>
      {children}
    </button>
  );
}

function Heading({
  level = 2,
  children,
  className = "",
}: {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return <Tag className={className}>{children}</Tag>;
}

function Image({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return <img className={className} src={src} alt={alt} loading="lazy" />;
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>
  );
}

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className={`header ${page === "home" ? "header-home" : ""}`}>
      <Link to="home" className="logo" onClick={close}>
        <span>BONNE</span>
        <span>ASSISE</span>
      </Link>
      <nav
        className={`nav ${open ? "nav-open" : ""}`}
        aria-label="Main navigation"
      >
        <Link to="explore" onClick={close}>
          Explore
        </Link>
        <Link to="place" onClick={close}>
          Places
        </Link>
        <Link to="food" onClick={close}>
          Food
        </Link>
        <Link to="experience" onClick={close}>
          Experiences
        </Link>
        <Link to="story" onClick={close}>
          Guides
        </Link>
      </nav>
      <div className="utilities">
        <Link to="explore" aria-label="Search">
          <Icon name="search" />
        </Link>
        <Link to="saved" aria-label="Saved">
          <Icon name="heart" />
        </Link>
        <span className="lang">EN</span>
        <Button variant="icon" ariaLabel="Account">
          <Icon name="user" />
        </Button>
      </div>
      <Button
        variant="icon"
        className="menu-button"
        ariaLabel={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "close" : "menu"} size={24} />
      </Button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-word">Bonne Assise</div>
      <div className="footer-grid">
        <div>
          <Eyebrow light>From Benin, with care</Eyebrow>
          <p>
            A living guide to the places, tastes and people that make Benin
            alive.
          </p>
        </div>
        <div>
          <Link to="explore">Explore</Link>
          <Link to="food">Food</Link>
          <Link to="experience">Experiences</Link>
          <Link to="story">Stories</Link>
        </div>
        <div>
          <Link to="trip">Plan a trip</Link>
          <Link to="saved">Saved places</Link>
          <ExternalLink href="mailto:hello@bonneassise.bj">
            Work with us
          </ExternalLink>
          <ExternalLink href="mailto:hello@bonneassise.bj">
            Contact
          </ExternalLink>
        </div>
        <div className="newsletter">
          <Eyebrow light>Notes from Benin</Eyebrow>
          <p>Occasional stories and places worth knowing.</p>
          <label>
            <span className="sr-only">Email address</span>
            <Input type="email" placeholder="Your email address" />
            <Button variant="light" ariaLabel="Subscribe">
              <Icon name="arrow" />
            </Button>
          </label>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Bonne Assise</span>
        <span>Cotonou · Porto-Novo · Everywhere in between</span>
      </div>
    </footer>
  );
}

function SaveActions({
  saved,
  toggleSaved,
  addTrip,
  added,
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
}) {
  return (
    <div className="actions">
      <Button variant="line" onClick={toggleSaved}>
        <Icon name={saved ? "check" : "heart"} /> {saved ? "Saved" : "Save"}
      </Button>
      <Button onClick={addTrip}>
        <Icon name={added ? "check" : "plus"} />{" "}
        {added ? "Added to trip" : "Add to trip"}
      </Button>
      <Button variant="icon" ariaLabel="Share">
        <Icon name="share" />
      </Button>
    </div>
  );
}

function Home({
  saved,
  toggleSaved,
  addTrip,
  added,
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
}) {
  const [editionIndex, setEditionIndex] = useState(0);
  const [foodIndex, setFoodIndex] = useState(0);
  const [editionPaused, setEditionPaused] = useState(false);
  const [foodPaused, setFoodPaused] = useState(false);

  useEffect(() => {
    if (editionPaused) return;
    const timer = window.setInterval(
      () => setEditionIndex((i) => (i + 1) % editionSets.length),
      8000,
    );
    return () => window.clearInterval(timer);
  }, [editionPaused]);

  useEffect(() => {
    if (foodPaused) return;
    const timer = window.setInterval(
      () => setFoodIndex((i) => (i + 1) % foodCycles.length),
      9000,
    );
    return () => window.clearInterval(timer);
  }, [foodPaused]);

  const food = foodCycles[foodIndex];

  return (
    <main>
      <section className="home-hero">
        <Image src={photos.market} alt="A lively market street in Benin" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <Heading level={1}>
            <span>BENIN</span>
            <span>
              <em>FROM INSIDE</em>
            </span>
          </Heading>
          <div className="hero-bottom">
            <p>
              Places. Food. People.
              <br />
              <span>BA.LAS.BA</span>
            </p>
            <Link to="explore" className="hero-discover">
              Explore Benin <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <p className="photo-note">Dantokpa wakes early — Cotonou</p>
      </section>

      <section
        className="city-editions"
        aria-label="Explore Bonne Assise"
        onMouseEnter={() => setEditionPaused(true)}
        onMouseLeave={() => setEditionPaused(false)}
        onFocus={() => setEditionPaused(true)}
        onBlur={() => setEditionPaused(false)}
      >
        {editionSets[editionIndex].map(([label, title, sub, to, tone], i) => (
          <Link
            key={`${editionIndex}-${i}`}
            to={to as Page}
            className={`edition ${tone} edition-cycle`}
          >
            <span>{label}</span>
            <Heading level={3}>
              {title.split("|").map((line, lineIndex) => (
                <span key={lineIndex}>{line}</span>
              ))}
            </Heading>
            <small>{sub}</small>
          </Link>
        ))}
        <Link to="explore" className="edition edition-index">
          <span>Bonne Assise index</span>
          <Heading level={3}>
            SEE
            <br />
            ALL
          </Heading>
          <small>Places · tastes · people →</small>
        </Link>
      </section>

      <div className="news-ticker">
        <span>NEW /</span>
        <p>48 hours in Porto-Novo — A guide by people who live there</p>
        <Link to="story">Read the field note ↗</Link>
      </div>

      <section className="intent section-pad">
        <Eyebrow>Choose your way in</Eyebrow>
        <div className="intent-row">
          <span>I want to</span>
          <div className="intent-links">
            <Link to="food">taste something local</Link>
            <Link to="story">meet the people</Link>
            <Link to="place">understand a place</Link>
            <Link to="experience">go somewhere unexpected</Link>
          </div>
        </div>
      </section>

      <section className="feature-place section-pad">
        <div className="feature-grid">
          <div className="feature-copy">
            <Heading level={2}>
              THE CITY
              <br />
              BEFORE
              <br />
              <em>BREAKFAST.</em>
            </Heading>
            <p>
              At first light, Ouando is already in conversation: baskets
              changing hands, zemidjans passing, breakfast ladled from enamel
              pots. This is a city best met before it has settled into the day.
            </p>
            <Link to="place" className="text-link">
              Walk through Porto-Novo <Icon name="arrow" />
            </Link>
          </div>
          <div className="feature-image-wrap">
            <Image src={photos.street} alt="A busy street in Porto-Novo" />
            <span>Morning, Porto-Novo</span>
          </div>
        </div>
      </section>

      <section
        className="food-gateway"
        onMouseEnter={() => setFoodPaused(true)}
        onMouseLeave={() => setFoodPaused(false)}
        onFocus={() => setFoodPaused(true)}
        onBlur={() => setFoodPaused(false)}
      >
        <div className="food-intro section-pad">
          <div>
            <Eyebrow light>Food is a map</Eyebrow>
            <Heading level={2}>
              TASTE THE
              <br />
              PLACE FIRST.
            </Heading>
          </div>
          <p>
            Every dish carries a landscape, a memory and the hands that made it.
            Begin with one taste, and see where it leads.
          </p>
        </div>
        <div className="food-story section-pad food-cycle" key={foodIndex}>
          <div className="food-portrait">
            <Image src={food.image} alt={food.label} />
          </div>
          <div className="food-word">
            <small>{food.label}</small>
            <span>{food.title}</span>
          </div>
          <div className="food-connections">
            <Eyebrow light>{food.intro}</Eyebrow>
            <div className="food-path-list">
              {food.paths.map((path, i) => (
                <div className="food-path" key={path}>
                  <strong>{path}</strong>
                  {i === 0 && <small>{food.detail}</small>}
                </div>
              ))}
            </div>
            <Link to="food" className="text-link light-link">
              {food.link} <Icon name="arrow" />
            </Link>
            <div className="cycle-dots" aria-label="Food feature selector">
              {foodCycles.map((_, i) => (
                <button
                  key={i}
                  className={i === foodIndex ? "active" : ""}
                  onClick={() => setFoodIndex(i)}
                  aria-label={`Show food feature ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="people section-pad">
        <div className="people-heading">
          <div>
            <Eyebrow>People to know</Eyebrow>
            <Heading level={2}>
              NO PLACE
              <br />
              WITHOUT <em>PEOPLE.</em>
            </Heading>
          </div>
          <p>
            Meet the cooks, guides, makers and storytellers who open doors to
            another way of seeing Benin.
          </p>
        </div>
        <div className="people-layout">
          <Link to="story" className="person-main">
            <Image src={peopleEntries[0][2]} alt={peopleEntries[0][1]} />
            <div>
              <Eyebrow>{peopleEntries[0][0]}</Eyebrow>
              <Heading level={3}>{peopleEntries[0][1]}</Heading>
              <span className="text-link">
                Meet Rosine <Icon name="arrow" />
              </span>
            </div>
          </Link>
          <div className="person-side-list">
            {peopleEntries.slice(1).map(([meta, title, image]) => (
              <Link to="story" className="person-side" key={title}>
                <Image src={image} alt={title} />
                <Eyebrow>{meta}</Eyebrow>
                <Heading level={3}>{title}</Heading>
              </Link>
            ))}
            <Link to="story" className="text-link people-all">
              See all people <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="whats-on section-pad">
        <div className="section-top">
          <div>
            <Eyebrow>What's on now</Eyebrow>
            <Heading level={2}>
              THIS WEEK
              <br />
              IN <em>BENIN.</em>
            </Heading>
          </div>
          <Link to="explore" className="text-link">
            See all events <Icon name="arrow" />
          </Link>
        </div>
        <div className="whats-tabs">
          <span className="active">Eat & drink</span>
          <span>Arts & culture</span>
          <span>Festivals & events</span>
          <span>Activities & itineraries</span>
        </div>
        <div className="event-grid">
          <Link to="experience" className="event-feature">
            <Image src={photos.grill} alt="Food being grilled in Cotonou" />
            <div>
              <Eyebrow>Tonight · Cotonou</Eyebrow>
              <Heading level={3}>
                Follow the smoke through the city after dark.
              </Heading>
              <span className="text-link">
                Discover the experience <Icon name="arrow" />
              </span>
            </div>
          </Link>
          <Link to="story" className="event-card">
            <Eyebrow>This weekend · Ouidah</Eyebrow>
            <Heading level={3}>Music, food and stories by the coast.</Heading>
            <span>Ouidah · 18–20 Oct</span>
          </Link>
          <Link to="place" className="event-card event-card-blue">
            <Eyebrow>All week · Porto-Novo</Eyebrow>
            <Heading level={3}>
              Markets, makers and morning streets worth getting up for.
            </Heading>
            <span>Porto-Novo · Open daily</span>
          </Link>
        </div>
      </section>

      <section className="experience-band">
        <Image
          src={photos.coast}
          alt="A wooden fishing boat on the Beninese coast"
        />
        <div className="experience-overlay">
          <Eyebrow light>Do this · Grand-Popo</Eyebrow>
          <Heading level={2}>
            Walk with the fishermen
            <br />
            at first light.
          </Heading>
          <p>
            Two quiet hours along the Mono estuary with local guide Désiré.
            Learn how the tides shape work, meals and memory here.
          </p>
          <div className="experience-meta">
            <span>2 hours</span>
            <span>From 12,000 CFA</span>
            <span>Up to 6 people</span>
          </div>
          <SaveActions
            saved={saved}
            toggleSaved={toggleSaved}
            addTrip={addTrip}
            added={added}
          />
        </div>
      </section>

      <section className="plan section-pad">
        <div className="plan-collage">
          <Image src={photos.city} alt="Aerial view of Cotonou" />
          <Image src={photos.cook} alt="Cook at a local market" />
          <div className="saved-stamp">
            <Icon name="heart" />
            <span>
              7 discoveries
              <br />
              saved
            </span>
          </div>
        </div>
        <div className="plan-copy">
          <Eyebrow>Make it yours</Eyebrow>
          <Heading level={2}>
            A journey,
            <br />
            built from
            <br />
            <em>curiosity.</em>
          </Heading>
          <p>
            Keep the places that stay with you. Add a meal, a person, a story.
            Then shape them into a trip that feels entirely your own.
          </p>
          <Link to="trip" className="btn btn-dark">
            Start planning <Icon name="arrow" />
          </Link>
        </div>
      </section>

      <section className="latest section-pad">
        <div className="section-top">
          <div>
            <Eyebrow>Read slowly</Eyebrow>
            <Heading level={2}>Stories from here.</Heading>
          </div>
          <Link to="story" className="text-link">
            All stories <Icon name="arrow" />
          </Link>
        </div>
        <Link to="story" className="story-row">
          <div>
            <Eyebrow>Food story · 8 min</Eyebrow>
            <Heading level={3}>What the morning market knows</Heading>
          </div>
          <Image src={photos.market} alt="The busy morning market" />
          <Icon name="arrow" />
        </Link>
        <Link to="story" className="story-row">
          <div>
            <Eyebrow>Portrait · 6 min</Eyebrow>
            <Heading level={3}>Rosine cooks without recipes</Heading>
          </div>
          <Image src={photos.women} alt="Market cooks" />
          <Icon name="arrow" />
        </Link>
      </section>
    </main>
  );
}

const resultItems = [
  {
    type: "Place",
    title: "Ganvié",
    sub: "Lake Nokoué · Atlantique",
    image: photos.boats,
    to: "place" as Page,
  },
  {
    type: "Food",
    title: "Wagassi",
    sub: "Fresh Peulh cheese · Northern Benin",
    image: photos.cook,
    to: "food" as Page,
  },
  {
    type: "Experience",
    title: "Cotonou after dark",
    sub: "Food walk · 3 hours",
    image: photos.grill,
    to: "experience" as Page,
  },
  {
    type: "Story",
    title: "What the market knows",
    sub: "Field notes from Dantokpa",
    image: photos.market,
    to: "story" as Page,
  },
];

function Explore() {
  const [query, setQuery] = useState("");
  const filtered = resultItems.filter((item) =>
    `${item.title} ${item.type} ${item.sub}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <main className="page-top explore-page section-pad">
      <div className="explore-head">
        <Eyebrow>Find your way in</Eyebrow>
        <Heading level={1}>
          What are you
          <br />
          <em>curious about?</em>
        </Heading>
        <label className="search-field">
          <Icon name="search" size={26} />
          <span className="sr-only">
            Search places, food, people and stories
          </span>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="A place, a taste, a person..."
          />
        </label>
      </div>
      <div className="filters">
        <FilterButton active>Everything</FilterButton>
        <FilterButton>Places</FilterButton>
        <FilterButton>Food</FilterButton>
        <FilterButton>Experiences</FilterButton>
        <FilterButton>People</FilterButton>
        <FilterButton>Stories</FilterButton>
        <FilterButton className="filter-more">More filters +</FilterButton>
      </div>
      <div className="results-label">
        <span>{filtered.length} discoveries</span>
        <span>Curated for now</span>
      </div>
      <div className="results">
        {filtered.map((item, i) => (
          <Link
            to={item.to}
            className={`result result-${i + 1}`}
            key={item.title}
          >
            <div className="result-image">
              <Image src={item.image} alt={item.title} />
              <Button variant="icon" ariaLabel={`Save ${item.title}`}>
                <Icon name="heart" />
              </Button>
            </div>
            <div>
              <Eyebrow>{item.type}</Eyebrow>
              <Heading level={2}>{item.title}</Heading>
              <p>{item.sub}</p>
              <span className="text-link">
                Discover <Icon name="arrow" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <Heading level={2}>Nothing by that name—yet.</Heading>
          <p>Try a region, a dish, or simply “unexpected”.</p>
        </div>
      )}
    </main>
  );
}

function DetailHero({
  type,
  title,
  location,
  intro,
  image,
  children,
}: {
  type: string;
  title: string;
  location: string;
  intro: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="detail-hero">
        <Image src={image} alt={`${title}, ${location}`} />
        <div className="detail-shade" />
        <div className="detail-title">
          <Eyebrow light>
            {type} · {location}
          </Eyebrow>
          <Heading level={1}>{title}</Heading>
        </div>
        <span className="scroll-note">Scroll to discover ↓</span>
      </section>
      <section className="detail-intro section-pad">
        <p className="lede">{intro}</p>
        {children}
      </section>
    </>
  );
}

function InfoRail({ items }: { items: [string, string][] }) {
  return (
    <div className="info-rail">
      {items.map(([label, value]) => (
        <div key={label}>
          <Eyebrow>{label}</Eyebrow>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

function Place({
  saved,
  toggleSaved,
  addTrip,
  added,
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
}) {
  return (
    <main>
      <DetailHero
        type="Place"
        title="Ganvié"
        location="Lake Nokoué · Atlantique"
        image={photos.boats}
        intro="A city held above water, where canoes are streets and every crossing carries a story. Ganvié is not a spectacle—it is home."
      >
        <SaveActions
          saved={saved}
          toggleSaved={toggleSaved}
          addTrip={addTrip}
          added={added}
        />
      </DetailHero>
      <section className="detail-body section-pad">
        <InfoRail
          items={[
            ["Best time", "Early morning"],
            ["Allow", "Half a day"],
            ["From Cotonou", "45 min + boat"],
            ["Go gently", "Visit with a local guide"],
          ]}
        />
        <article className="article-copy">
          <Eyebrow>The story of the place</Eyebrow>
          <Heading level={2}>
            Life follows the
            <br />
            <em>rhythm of water.</em>
          </Heading>
          <p>
            Ganvié began as refuge. In the seventeenth century, Tofinu
            communities moved onto Lake Nokoué, beyond the reach of raiders
            whose beliefs prevented them from entering the water. Generations
            later, the lake remains road, market, playground and pantry.
          </p>
          <p>
            Come early, when the floating market gathers almost without
            ceremony. Women steer low canoes piled with peppers, cassava and
            fish. Schoolchildren pass in pressed uniforms. The city is already
            moving.
          </p>
          <blockquote>
            “We don’t live beside the lake. We live with it.”
            <small>— Koffi, fisherman and guide</small>
          </blockquote>
        </article>
      </section>
      <section className="wide-image">
        <Image
          src={photos.fisherman}
          alt="A fisherman casting his net across Lake Nokoué"
        />
        <span>Net fishing on Lake Nokoué</span>
      </section>
      <Related
        title="Around the lake"
        items={[
          ["Taste", "Smoked fish at the morning market", photos.grill, "food"],
          ["Meet", "Koffi, keeper of the water", photos.fisherman, "story"],
          ["Do", "Cross the lake at daybreak", photos.boats, "experience"],
        ]}
      />
    </main>
  );
}

function Food({
  saved,
  toggleSaved,
  addTrip,
  added,
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
}) {
  return (
    <main>
      <DetailHero
        type="Food"
        title="Wagassi"
        location="Borgou · Northern Benin"
        image={photos.cook}
        intro="Soft, fresh and gently salted, wagassi is the cheese of Fulani pastoral life—and an edible path into the landscapes of northern Benin."
      >
        <SaveActions
          saved={saved}
          toggleSaved={toggleSaved}
          addTrip={addTrip}
          added={added}
        />
      </DetailHero>
      <section className="detail-body food-detail section-pad">
        <InfoRail
          items={[
            ["Made from", "Fresh cow’s milk"],
            ["In season", "All year"],
            ["Taste", "Mild, milky, delicate"],
            ["Try it", "Grilled or in tomato sauce"],
          ]}
        />
        <article className="article-copy">
          <Eyebrow>More than a cheese</Eyebrow>
          <Heading level={2}>
            A landscape,
            <br />
            <em>held together.</em>
          </Heading>
          <p>
            Wagassi begins with fresh milk and the leaves of the calotropis
            plant, whose sap gently separates curds from whey. The method
            travels through families—measured less by recipe than by touch,
            sound and attention.
          </p>
          <p>
            In markets across Benin you will see ivory rounds stacked neatly,
            sometimes stained rust-red with sorghum leaves. Grilled over
            charcoal or simmered in sauce, it becomes a bridge between pastoral
            north and coastal table.
          </p>
        </article>
      </section>
      <section className="maker-section section-pad">
        <div>
          <Eyebrow>Who makes it</Eyebrow>
          <Heading level={2}>
            Aïssatou knows
            <br />
            when milk is ready
            <br />
            by the way it <em>moves.</em>
          </Heading>
          <p>
            Near Parakou, Aïssatou Bio turns the morning’s milk into wagassi as
            her mother taught her. Visit her small cooperative, taste the cheese
            warm, and understand why patience is its first ingredient.
          </p>
          <Link to="story" className="text-link">
            Meet Aïssatou <Icon name="arrow" />
          </Link>
        </div>
        <Image
          src={photos.women}
          alt="Women working together at a food market"
        />
      </section>
      <Related
        title="Follow the taste"
        items={[
          ["Where to taste", "Chez Maman Bénin, Ganhi", photos.grill, "place"],
          ["Experience", "From market to table", photos.market, "experience"],
          ["Read", "The women who carry wagassi south", photos.women, "story"],
        ]}
      />
    </main>
  );
}

function Experience({
  saved,
  toggleSaved,
  addTrip,
  added,
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
}) {
  return (
    <main>
      <DetailHero
        type="Experience"
        title="Cotonou after dark"
        location="Zongo → Ganhi"
        image={photos.grill}
        intro="Follow the smoke, the music and the evening crowd on a food walk through the city’s most generous street kitchens."
      >
        <SaveActions
          saved={saved}
          toggleSaved={toggleSaved}
          addTrip={addTrip}
          added={added}
        />
      </DetailHero>
      <section className="booking-bar section-pad">
        <div>
          <Eyebrow>Next departure</Eyebrow>
          <p>Friday, 18:30</p>
        </div>
        <div>
          <Eyebrow>Price</Eyebrow>
          <p>18,000 CFA / person</p>
        </div>
        <div>
          <Eyebrow>Group</Eyebrow>
          <p>2–8 people</p>
        </div>
        <Button>
          Request a place <Icon name="arrow" />
        </Button>
      </section>
      <section className="detail-body section-pad">
        <InfoRail
          items={[
            ["Duration", "3 hours"],
            ["Language", "French · English"],
            ["Meeting point", "Place Lénine, Akpakpa"],
            ["Accessibility", "Mostly step-free"],
          ]}
        />
        <article className="article-copy">
          <Eyebrow>Why go</Eyebrow>
          <Heading level={2}>
            Come hungry.
            <br />
            Leave knowing
            <br />
            <em>the city better.</em>
          </Heading>
          <p>
            Street food is Cotonou in miniature: fast-moving, deeply social and
            full of exacting opinions. With local cook Rosine, start with hot
            talé-talé, cross town for grilled wagassi, and finish over peppered
            fish near the lagoon.
          </p>
          <p>
            This isn’t a tasting checklist. Rosine introduces the people behind
            each fire and explains the ingredients, migrations and daily rituals
            held in every plate.
          </p>
          <Heading level={3}>How the evening unfolds</Heading>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <b>Meet in Akpakpa</b>
                <p>A cool bissap and a little context before setting out.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <b>Follow three fires</b>
                <p>Taste, talk and watch each dish being made.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <b>Finish by the lagoon</b>
                <p>Grilled fish, cold drinks and time to linger.</p>
              </div>
            </li>
          </ol>
        </article>
      </section>
      <Related
        title="Keep exploring"
        items={[
          ["Taste", "The story of Wagassi", photos.cook, "food"],
          ["Meet", "Rosine, cook and city guide", photos.women, "story"],
          ["Nearby", "Ganhi after sunset", photos.city, "place"],
        ]}
      />
    </main>
  );
}

function Related({
  title,
  items,
}: {
  title: string;
  items: [string, string, string, Page][];
}) {
  return (
    <section className="related section-pad">
      <div className="section-top">
        <div>
          <Eyebrow>Go further</Eyebrow>
          <Heading level={2}>{title}</Heading>
        </div>
      </div>
      <div className="related-grid">
        {items.map(([type, name, image, to], i) => (
          <Link to={to} key={name} className={i === 0 ? "related-main" : ""}>
            <Image src={image} alt={name} />
            <Eyebrow>{type}</Eyebrow>
            <Heading level={3}>{name}</Heading>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Trip({ added }: { added: boolean }) {
  const [days, setDays] = useState(2);
  return (
    <main className="page-top trip-page">
      <section className="trip-head section-pad">
        <div>
          <Eyebrow>Your journey</Eyebrow>
          <Heading level={1}>
            A few good days
            <br />
            <em>in the south.</em>
          </Heading>
        </div>
        <div className="trip-stats">
          <div>
            <b>{days}</b>
            <span>days</span>
          </div>
          <div>
            <b>{added ? 4 : 3}</b>
            <span>discoveries</span>
          </div>
          <Button variant="line">
            <Icon name="share" /> Share trip
          </Button>
        </div>
      </section>
      <section className="trip-workspace section-pad">
        <div className="day-list">
          {[1, 2].map((day) => (
            <div className="day" key={day}>
              <div className="day-title">
                <span>Day {day}</span>
                <p>
                  {day === 1
                    ? "Cotonou · Food & city life"
                    : "Lake Nokoué · On the water"}
                </p>
              </div>
              {(day === 1
                ? [
                    [
                      photos.market,
                      "Dantokpa before the crowds",
                      "Place · 08:00",
                    ],
                    [photos.grill, "Cotonou after dark", "Experience · 18:30"],
                  ]
                : [
                    [photos.boats, "Cross to Ganvié", "Place · 07:30"],
                    ...(added
                      ? [
                          [
                            photos.coast,
                            "Walk with the fishermen",
                            "Experience · 16:00",
                          ],
                        ]
                      : []),
                  ]
              ).map((item, i) => (
                <div className="trip-item" key={String(item[1])}>
                  <span className="drag">⠿</span>
                  <Image src={String(item[0])} alt={String(item[1])} />
                  <div>
                    <Eyebrow>{String(item[2])}</Eyebrow>
                    <Heading level={3}>{String(item[1])}</Heading>
                    <p>
                      {i
                        ? "Saved for later in the day"
                        : "A gentle place to begin"}
                    </p>
                  </div>
                  <Button variant="icon" ariaLabel="Item options">
                    •••
                  </Button>
                </div>
              ))}
            </div>
          ))}
          <Button variant="line" onClick={() => setDays(days + 1)}>
            <Icon name="plus" /> Add day {days + 1}
          </Button>
        </div>
        <aside className="trip-aside">
          <Eyebrow>A note for the road</Eyebrow>
          <Heading level={2}>
            Leave some
            <br />
            room for
            <br />
            <em>surprise.</em>
          </Heading>
          <p>
            The best discoveries rarely keep a schedule. Your trip is a thread,
            not a timetable.
          </p>
          <div className="trip-tip">
            <span>Local note</span>
            <p>
              Traffic through Cotonou builds after 17:00. Stay for an early
              dinner, then head across town.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Saved({ saved }: { saved: boolean }) {
  const items = saved ? resultItems : resultItems.slice(1);
  return (
    <main className="page-top saved-page section-pad">
      <div className="saved-head">
        <div>
          <Eyebrow>Your notebook</Eyebrow>
          <Heading level={1}>
            Things worth
            <br />
            <em>returning to.</em>
          </Heading>
        </div>
        <Button>
          <Icon name="plus" /> New collection
        </Button>
      </div>
      <div className="collection-strip">
        <div>
          <Heading level={3}>Weekend in Benin</Heading>
          <p>{items.length} discoveries</p>
        </div>
        <div>
          <Heading level={3}>Foods I want to try</Heading>
          <p>3 discoveries</p>
        </div>
        <div className="collection-new">
          <Icon name="plus" />
          <p>Create a collection</p>
        </div>
      </div>
      <div className="section-top">
        <div>
          <Eyebrow>Everything saved</Eyebrow>
          <Heading level={2}>{items.length} discoveries</Heading>
        </div>
        <div className="view-toggle">Grid &nbsp; / &nbsp; List</div>
      </div>
      <div className="saved-grid">
        {items.map((item) => (
          <Link to={item.to} key={item.title}>
            <div>
              <Image src={item.image} alt={item.title} />
              <Button variant="icon" ariaLabel={`Remove ${item.title}`}>
                <Icon name="heart" />
              </Button>
            </div>
            <Eyebrow>{item.type}</Eyebrow>
            <Heading level={3}>{item.title}</Heading>
            <p>{item.sub}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

function Story() {
  return (
    <main className="story-page">
      <section className="story-hero section-pad">
        <div>
          <Eyebrow>Portrait · Cotonou</Eyebrow>
          <Heading level={1}>
            Rosine cooks
            <br />
            without
            <br />
            <em>recipes.</em>
          </Heading>
          <p className="story-dek">
            At Dantokpa, one cook turns the morning market into a map of memory,
            instinct and extraordinary flavor.
          </p>
          <div className="byline">
            <span>Words by Afiavi Alladaye</span>
            <span>Photography by Ben Iwara</span>
            <span>8 min read</span>
          </div>
        </div>
        <Image
          src={photos.women}
          alt="Rosine and a fellow cook at their market stall"
        />
      </section>
      <article className="story-article section-pad">
        <p className="dropcap">
          By six in the morning, Rosine has already tasted the pepper twice. She
          does not measure it. She watches how the sauce holds to the back of
          her wooden spoon, adds a little salt, then turns to greet a customer
          she knows by voice.
        </p>
        <p>
          Her stall sits where the market begins to fold into the street.
          Plantains are stacked at one edge. A charcoal fire occupies the other.
          Between them, in a space no wider than her outstretched arms, Rosine
          makes breakfast for half a neighborhood.
        </p>
        <blockquote>
          “A recipe cannot tell you what the tomato did in the rain.”
        </blockquote>
        <Image
          src={photos.cook}
          alt="A market cook preparing the morning meal"
        />
        <small>Morning preparation at the edge of Dantokpa</small>
        <Heading level={2}>
          The market
          <br />
          as memory
        </Heading>
        <p>
          Rosine learned beside her aunt, first washing bowls, later tending the
          fire. What she remembers is not a list of ingredients but a sequence
          of gestures: the weight of a ripe tomato, the sound oil makes when it
          is ready, the exact moment to lower the flame.
        </p>
        <p>“You have to listen,” she says. “Food always says what it needs.”</p>
      </article>
      <section className="story-end section-pad">
        <Eyebrow>Continue the journey</Eyebrow>
        <Heading level={2}>
          Walk Cotonou
          <br />
          with Rosine.
        </Heading>
        <p>Join her evening food walk through Zongo and Ganhi.</p>
        <Link to="experience" className="btn btn-light">
          Discover the experience <Icon name="arrow" />
        </Link>
      </section>
    </main>
  );
}

export default function App() {
  const currentHash = () => {
    const value = window.location.hash.slice(1) as Page;
    return pages.includes(value) ? value : "home";
  };
  // Server render and first client render must match, so start on "home" and read the hash after mount.
  const [page, setPage] = useState<Page>("home");
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    setPage(currentHash());
    const change = () => {
      setPage(currentHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const props = {
    saved,
    toggleSaved: () => setSaved(!saved),
    addTrip: () => setAdded(true),
    added,
  };
  const content = {
    home: <Home {...props} />,
    explore: <Explore />,
    place: <Place {...props} />,
    food: <Food {...props} />,
    experience: <Experience {...props} />,
    trip: <Trip added={added} />,
    saved: <Saved saved={saved} />,
    story: <Story />,
  }[page];
  return (
    <>
      <Header page={page} />
      {content}
      <Footer />
    </>
  );
}
