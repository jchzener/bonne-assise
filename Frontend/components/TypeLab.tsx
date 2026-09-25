'use client';

const specimens = [
  { rank: '01', name: 'Manrope', family: 'Manrope', role: 'Primary system — display + UI', line: 'Come closer to the stories.' },
  { rank: '02', name: 'Georgia', family: 'Georgia', role: 'Editorial voice — warm contrast', line: 'Where memory becomes a journey.' },
  { rank: '03', name: 'DM Sans', family: 'DM Sans', role: 'Neutral UI alternative', line: 'Discover Benin through places, people and stories.' },
  { rank: '04', name: 'Playfair Display', family: 'Playfair Display', role: 'Editorial alternative — more classical', line: 'A slower, more cinematic voice.' },
  { rank: '05', name: 'Arial', family: 'Arial', role: 'System benchmark / control', line: 'A useful control sample for evaluating character.' },
];

export default function TypeLab() {
  return <main className="type-lab">
    <div className="type-lab-head">
      <p>BONNE ASSISE · TYPE LAB · PASS 01</p>
      <h1>One voice.<br /><em>Two temperatures.</em></h1>
      <p>We are locking the direction around Manrope as the primary typeface and Georgia as the editorial counterpoint. The remaining candidates stay here as benchmarks until the design system is fully tested.</p>
      <div className="type-rank"><strong>01</strong> Manrope primary <span>+</span> <strong>02</strong> Georgia editorial</div>
    </div>
    <div className="type-list">{specimens.map((s) => <section key={s.name} className="type-specimen">
      <div><span>{s.rank}</span><strong>{s.name}</strong><small>{s.role}</small></div>
      <p style={{ fontFamily: s.family }}>{s.line}</p>
    </section>)}</div>
  </main>;
}
