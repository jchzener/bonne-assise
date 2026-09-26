'use client';

import type { ExperienceProduct, HomeResponse } from './api';

export type InterestId = 'culture' | 'nature' | 'food' | 'history' | 'spirituality';
type SignalMap = Partial<Record<InterestId, number>>;

type StoredSignals = {
  weights: SignalMap;
  events: Array<{ type: string; id?: string; at: number }>;
};

const KEY = 'bonne-assise:signals:v1';
const defaultSignals: StoredSignals = { weights: {}, events: [] };

const interestAliases: Record<string, InterestId> = {
  culture: 'culture', nature: 'nature', food: 'food', history: 'history', spirituality: 'spirituality',
};

export function readSignals(): StoredSignals {
  if (typeof window === 'undefined') return defaultSignals;
  try { return JSON.parse(localStorage.getItem(KEY) || '') as StoredSignals; } catch { return defaultSignals; }
}

function writeSignals(signals: StoredSignals) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(signals));
  window.dispatchEvent(new CustomEvent('bonne-assise:signals'));
}

export function recordInterest(id: string) {
  const interest = interestAliases[id];
  if (!interest) return;
  const current = readSignals();
  const weights = { ...current.weights, [interest]: Math.min(5, (current.weights[interest] || 0) + 1) };
  writeSignals({ weights, events: [...current.events.slice(-39), { type: 'interest_selected', id, at: Date.now() }] });
}

export function recordContentSignal(id: string, interests: InterestId[], type = 'open') {
  const current = readSignals();
  const weights = { ...current.weights };
  const increment = type === 'save' ? .5 : type === 'journey_add' ? .7 : type === 'read' ? .15 : .08;
  interests.forEach((interest) => { weights[interest] = Math.min(5, (weights[interest] || 0) + increment); });
  writeSignals({ weights, events: [...current.events.slice(-39), { type, id, at: Date.now() }] });
}

export function ranked<T extends { id: string }>(items: T[], getInterests: (item: T) => InterestId[], weights: SignalMap) {
  return [...items].sort((a, b) => score(b, getInterests(b), weights) - score(a, getInterests(a), weights));
}

function score<T>(item: T, interests: InterestId[], weights: SignalMap) {
  return interests.reduce((sum, interest) => sum + (weights[interest] || 0), 0);
}

export function interestForExperience(item: ExperienceProduct): InterestId[] {
  const text = `${item.id} ${item.name} ${item.title} ${item.promise}`.toLowerCase();
  const result: InterestId[] = [];
  if (/food|table|market|cook|meal|fire/.test(text)) result.push('food');
  if (/water|lake|ganvi|nature/.test(text)) result.push('nature');
  if (/history|memory|first-table/.test(text)) result.push('history');
  if (/culture|host|place|trad/.test(text)) result.push('culture');
  if (/spirit|vodun|sacred/.test(text)) result.push('spirituality');
  return result.length ? result : ['culture'];
}

export function interestForStory(story: HomeResponse['stories'][number]): InterestId[] {
  const text = `${story.title} ${story.description} ${story.eyebrow}`.toLowerCase();
  const result: InterestId[] = [];
  if (/food|table|fire|market/.test(text)) result.push('food');
  if (/water|lake|nature/.test(text)) result.push('nature');
  if (/history|memory/.test(text)) result.push('history');
  if (/people|culture|trad/.test(text)) result.push('culture');
  if (/spirit|vodun|sacred/.test(text)) result.push('spirituality');
  return result.length ? result : ['culture'];
}
