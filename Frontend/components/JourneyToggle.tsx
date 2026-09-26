'use client';

import { useEffect, useState } from 'react';
import { recordContentSignal } from '@/lib/recommendations';
import type { InterestId } from '@/lib/recommendations';

const KEY = 'bonne-assise:journey:v1';
type JourneyItem = { id: string; label: string; href: string };

export default function JourneyToggle({ item, interests = ['culture'], locale }: { item: JourneyItem; interests?: InterestId[]; locale: 'en' | 'fr' }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem(KEY) || '[]');
      setSaved(Array.isArray(items) && items.some((entry) => entry.id === item.id));
    } catch {}
  }, [item.id]);

  const toggle = () => {
    try {
      const items: JourneyItem[] = JSON.parse(localStorage.getItem(KEY) || '[]');
      const next = items.some((entry) => entry.id === item.id)
        ? items.filter((entry) => entry.id !== item.id)
        : [...items, item];
      localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(next.some((entry) => entry.id === item.id));
      recordContentSignal(item.id, interests, 'journey_add');
      window.dispatchEvent(new CustomEvent('bonne-assise:journey'));
    } catch {}
  };

  return (
    <button className={`journey-toggle ${saved ? 'is-saved' : ''}`} type="button" onClick={toggle} aria-pressed={saved}>
      <span className="journey-toggle-mark" aria-hidden="true">{saved ? '●' : '+'}</span>
      {saved ? (locale === 'fr' ? 'Ajouté au voyage' : 'Added to journey') : (locale === 'fr' ? 'Ajouter au voyage' : 'Add to journey')}
    </button>
  );
}
