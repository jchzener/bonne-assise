'use client';

import { useEffect, useState } from 'react';
import { type Locale } from '@/lib/i18n';

const KEY = 'bonne-assise:journey:v1';

export default function JourneyIndicator({ locale: _locale, className = '' }: { locale: Locale; className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      try {
        const items = JSON.parse(localStorage.getItem(KEY) || '[]');
        setCount(Array.isArray(items) ? items.length : 0);
      } catch {
        setCount(0);
      }
    };
    sync();
    window.addEventListener('bonne-assise:journey', sync);
    return () => window.removeEventListener('bonne-assise:journey', sync);
  }, []);

  return (
    <span className={`journey-indicator ${count ? 'has-items' : ''} ${className}`} aria-hidden={count === 0 ? true : undefined}>
      {count > 0 && <span className="journey-indicator-dot" aria-hidden="true" />}
      {count > 0 && <span className="journey-indicator-count">{count}</span>}
    </span>
  );
}
