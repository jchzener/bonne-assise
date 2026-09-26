'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const KEY = 'bonne-assise:journey:v1';
type Item = { id: string; label: string; href: string };

export default function JourneySavedItems({ locale }: { locale: 'en' | 'fr' }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const sync = () => {
      try {
        const value = JSON.parse(localStorage.getItem(KEY) || '[]');
        setItems(Array.isArray(value) ? value : []);
      } catch { setItems([]); }
    };
    sync();
    window.addEventListener('bonne-assise:journey', sync);
    return () => window.removeEventListener('bonne-assise:journey', sync);
  }, []);

  if (!items.length) return null;

  const remove = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    localStorage.setItem(KEY, JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new CustomEvent('bonne-assise:journey'));
  };

  return (
    <section className="journey-saved-items">
      <div className="journey-saved-head">
        <span>{locale === 'fr' ? 'VOS CHOIX' : 'YOUR PICKS'}</span>
        <strong>{items.length}</strong>
      </div>
      <div className="journey-saved-list">
        {items.map((item, index) => (
          <article key={item.id} className="journey-saved-item">
            <span>0{index + 1}</span>
            <Link href={item.href}>{item.label} ↗</Link>
            <button type="button" onClick={() => remove(item.id)} aria-label={locale === 'fr' ? `Retirer ${item.label}` : `Remove ${item.label}`}>×</button>
          </article>
        ))}
      </div>
    </section>
  );
}
