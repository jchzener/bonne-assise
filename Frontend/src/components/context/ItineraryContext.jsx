import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const KEY = "ba_itinerary_v1";
const ItineraryContext = createContext({
  items: [],
  add: () => {},
  remove: () => {},
  has: () => false,
  clear: () => {},
  count: 0,
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function ItineraryProvider({ children }) {
  const [items, setItems] = useState(() => load());
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((entry) => {
    setItems((prev) => {
      if (prev.some((x) => x.kind === entry.kind && x.slug === entry.slug))
        return prev;
      return [...prev, { ...entry, addedAt: Date.now() }];
    });
  }, []);

  const remove = useCallback((kind, slug) => {
    setItems((prev) =>
      prev.filter((x) => !(x.kind === kind && x.slug === slug))
    );
  }, []);

  const has = useCallback(
    (kind, slug) => items.some((x) => x.kind === kind && x.slug === slug),
    [items]
  );

  const clear = useCallback(() => setItems([]), []);

  return (
    <ItineraryContext.Provider
      value={{ items, add, remove, has, clear, count: items.length }}
    >
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary() {
  return useContext(ItineraryContext);
}
