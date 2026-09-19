import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import { LangProvider } from "./components/context/LangContext.jsx";
import { ItineraryProvider } from "./components/context/ItineraryContext.jsx";
import { Home } from "./components/home/Home.jsx";
import { Detail } from "./components/pages/Detail.jsx";
import { Listing } from "./components/pages/Listing.jsx";
import { PlanPage } from "./components/pages/Plan.jsx";
import { Search } from "./components/pages/Search.jsx";
import { BoutiquePage } from "./components/pages/Boutique.jsx";
import { PostcardPage } from "./components/postcard/PostcardStudio.jsx";
import { Editor } from "./components/cms/Editor.jsx";
import { Shell } from "./components/layout/Shell.jsx";
import { PageHero } from "./components/ui/PageHero.jsx";
import { getStory } from "./data/content.js";

function StoryDetail({ slug }) {
  const story = getStory(slug);
  if (!story) return <Listing type="stories" />;
  return (
    <Shell>
      <PageHero
        kicker={`HISTOIRE · ${story.season}`}
        title={story.title}
        text={story.desc}
        img={story.img}
      />
      <section className="section article-body">
        {(story.body || []).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
    </Shell>
  );
}

function App() {
  const [path, setPath] = useState(
    () => location.hash.replace(/^#/, "") || "/"
  );

  useEffect(() => {
    const onHash = () => setPath(location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const parts = path.split("/").filter(Boolean);
  const q = path.includes("?") ? path.split("?")[1] : "";

  if (parts[0] === "edit") return <Editor />;
  if (parts[0] === "postcard") return <PostcardPage />;
  if (parts[0] === "boutique") return <BoutiquePage />;
  if (parts[0] === "search") return <Search />;
  if (parts[0] === "stories" && parts[1])
    return <StoryDetail slug={parts[1].split("?")[0]} />;
  if (parts[0] === "places" && parts[1])
    return <Detail kind="place" slug={parts[1].split("?")[0]} />;
  if (parts[0] === "food" && parts[1])
    return <Detail kind="dish" slug={parts[1].split("?")[0]} />;
  if (parts[0] === "plan") return <PlanPage />;
  if (["places", "food", "events", "stories"].includes(parts[0]))
    return <Listing type={parts[0]} />;

  return <Home />;
}

function Root() {
  return (
    <LangProvider>
      <ItineraryProvider>
        <App />
      </ItineraryProvider>
    </LangProvider>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
