'use client';

import React from 'react';
import {
  TweaksPanel,
  TweakSection,
  TweakSelect,
  TweakToggle,
  TweakRadio,
  TweakColor,
} from './TweaksPanel';

// ─── Theme / font / accent constants ────────────────────────────────────────

const THEMES = {
  paper: { bg: '#F7F5F0', fg: '#1A1A17', muted: '#79766E', soft: '#D9D5C8', invBg: '#1A1A17', invFg: '#F7F5F0' },
  ivory: { bg: '#FBFAF5', fg: '#222018', muted: '#86837A', soft: '#E5E1D4', invBg: '#222018', invFg: '#FBFAF5' },
  ink:   { bg: '#0E0E0C', fg: '#EDEAE0', muted: '#8A8880', soft: '#2A2A26', invBg: '#EDEAE0', invFg: '#0E0E0C' },
  cool:  { bg: '#F4F5F7', fg: '#15171B', muted: '#71757D', soft: '#DCDEE3', invBg: '#15171B', invFg: '#F4F5F7' },
} as const;

const FONT_PAIRS = {
  jetbrains: { mono: 'var(--font-jetbrains-mono), ui-monospace, monospace', sans: 'var(--font-jetbrains-mono), ui-monospace, monospace', name: 'JetBrains Mono' },
  geist:     { mono: 'var(--font-geist-mono), ui-monospace, monospace',     sans: 'var(--font-geist), system-ui, sans-serif',           name: 'Geist Mono + Geist' },
  ibm:       { mono: 'var(--font-ibm-plex-mono), ui-monospace, monospace',  sans: 'var(--font-ibm-plex-sans), system-ui, sans-serif',   name: 'IBM Plex Mono + Sans' },
  fira:      { mono: 'var(--font-fira-code), ui-monospace, monospace',      sans: 'var(--font-fira-code), ui-monospace, monospace',      name: 'Fira Code' },
} as const;

const ACCENTS: Record<string, string> = {
  amber: '#B8702A',
  sage:  '#5C7A5A',
  ink:   '#3D5A80',
  rust:  '#A04A2C',
  plum:  '#6B4978',
};

const DENSITIES = {
  compact: { pad: 36, hPad: 56, vGap: 64 },
  regular: { pad: 48, hPad: 72, vGap: 88 },
  airy:    { pad: 60, hPad: 96, vGap: 112 },
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

type Theme = typeof THEMES[keyof typeof THEMES];

interface TweakValues {
  theme: keyof typeof THEMES;
  fontPair: keyof typeof FONT_PAIRS;
  accent: string;
  customAccent: string;
  density: keyof typeof DENSITIES;
  hero: 'ascii' | 'minimal' | 'block';
  uppercase: boolean;
}

// ─── Hero variants ───────────────────────────────────────────────────────────

function HeroAscii({ t, c }: { t: Theme; c: string }) {
  return (
    <div>
      <pre style={{ margin: 0, fontSize: 13, color: t.muted, lineHeight: 1.5, marginBottom: 32, overflowX: 'auto' }}>
{`┌──────────────────────────────────────────────────────────────────┐
│ NAME    chew yuen xuen                                           │
│ ROLE    frontend developer · full stack capable                  │
│ BASED   singapore / malaysia                                     │
│ EMAIL   paulyx212@gmail.com                                      │
│ AVAIL   immediately                                              │
└──────────────────────────────────────────────────────────────────┘`}
      </pre>
      <h1 style={{ fontWeight: 400, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, marginBottom: 36 }}>
        I build clean,<br />
        maintainable,<br />
        well-tested<br />
        <span style={{ color: c }}>web applications.</span>
      </h1>
    </div>
  );
}

function HeroMinimal({ t, c }: { t: Theme; c: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: t.muted, letterSpacing: '0.06em', marginBottom: 40 }}>
        <span style={{ color: c }}>$</span> whoami
      </div>
      <h1 style={{ fontWeight: 400, fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 0.95, letterSpacing: '-0.04em', margin: 0, marginBottom: 24 }}>
        chew<br />yuen xuen<span style={{ color: c }}>_</span>
      </h1>
      <div style={{ fontSize: 14, color: t.muted, marginTop: 28, maxWidth: 560 }}>
        // frontend developer · full stack capable · 5 years · singapore / malaysia
      </div>
    </div>
  );
}

function HeroBlock({ t, c }: { t: Theme; c: string }) {
  return (
    <div style={{ background: t.fg, color: t.bg, padding: 'clamp(24px, 4vw, 48px)', marginBottom: 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.soft, marginBottom: 36, letterSpacing: '0.04em', flexWrap: 'wrap', gap: 8 }}>
        <span>// portfolio.v2026.04</span>
        <span style={{ color: c }}>● open to work</span>
      </div>
      <h1 style={{ fontWeight: 400, fontSize: 'clamp(28px, 4vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, marginBottom: 24 }}>
        chew yuen xuen — <span style={{ color: c }}>frontend</span> developer building clean, maintainable, well-tested web applications.
      </h1>
      <div style={{ display: 'flex', gap: 32, fontSize: 11, color: t.soft, paddingTop: 28, borderTop: `1px solid ${t.muted}`, flexWrap: 'wrap' }}>
        <span>5 years · react / next.js / typescript</span>
        <span>singapore / malaysia · gmt+8</span>
        <span>paulyx212@gmail.com</span>
      </div>
    </div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({
  tag,
  title,
  t,
  c,
  children,
}: {
  tag: string;
  title: string;
  t: Theme;
  c: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 88 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `1.5px solid ${t.fg}`, paddingBottom: 8, marginBottom: 28, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.04em' }}>
          <span style={{ color: c }}>$</span> {tag}
        </div>
        <div style={{ fontSize: 11, color: t.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</div>
      </div>
      {children}
    </section>
  );
}

// ─── Experience data ─────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    range: '2025.08 → present',
    co: 'Freelance Software Engineer',
    role: 'independent contractor',
    loc: 'remote',
    star: false,
    bullets: [
      ['Fleevigo OMS', 'Designed, built, and deployed a full-stack multi-stakeholder Order Management System for a European chauffeur service, now live in production. Consolidates data from multiple booking platforms into a unified operator, driver, and supplier-facing interface. Full ownership of frontend, backend, database, CI/CD, and deployment.'],
      ['Shopify storefronts', 'Delivered storefronts and sales-funnel systems for clients across multiple markets using custom Liquid templates, Tailwind CSS, and CRM integrations — optimising for page load and usability.'],
    ],
    stack: 'next.js · nestjs · postgres · redis · liquid',
  },
  {
    range: '2023.05 → 2025.08',
    co: 'Singlife Singapore',
    role: 'analyst, application development',
    loc: 'singapore',
    star: true,
    bullets: [
      ['EzSub', 'Key contributor to a React + TypeScript adviser portal that received the Singapore UX of the Year — Financial Services award at the Asian Business Review Awards 2025.'],
      ['Component library', "Built and maintained reusable React components for EzSub's internal library, enforcing consistent design patterns and reducing frontend duplication."],
      ['Modernisation', 'Contributed to migrating EzSub from a legacy AngularJS codebase to React + TypeScript. Applied semantic HTML, responsive design, and cross-browser standards. Introduced structured PR review processes.'],
      ['Mentorship', 'Supported offshore developers through code walkthroughs, PR reviews, and knowledge-sharing on React, TypeScript, and clean code practices.'],
      ['Collaboration', 'Worked directly with team lead, PMs, and designers to translate product requirements into production-ready features on a fast-moving delivery schedule.'],
    ],
    stack: 'react · typescript · angularjs · design system',
  },
  {
    range: '2022.09 → 2023.01',
    co: 'FeedMe',
    role: 'software engineer, full stack',
    loc: 'malaysia',
    star: false,
    bullets: [
      ['Payment integration', 'Integrated Razer Merchant Services (Fiuu) as a new payment partner, replacing the existing gateway end-to-end across web portal and backend APIs.'],
      ['Payout accuracy', 'Maintained T+1 payout reconciliation; ensured daily transaction statements were accurate and merchant settlements processed correctly.'],
      ['Full-stack maintenance', 'Maintained and extended the FeedMe web portal, backend APIs, and Flutter mobile app across payment-related features and bug fixes.'],
    ],
    stack: 'node · flutter · payments',
  },
  {
    range: '2020 → 2023',
    co: 'Early career',
    role: 'frontend / mobile / full stack',
    loc: 'malaysia / singapore',
    star: false,
    bullets: [
      ['Deegix Pte Ltd', 'Full Stack Developer · Feb 2023 – Apr 2023, Singapore.'],
      ['UC Technology', 'Mobile App Engineer (Internship) · Jun 2022 – Aug 2022.'],
      ['Techworlds Innovation', 'Frontend Developer · Dec 2020 – Apr 2022. 18 months building foundations across HTML, CSS, JavaScript, and React.'],
    ],
    stack: 'frontend · mobile · foundations',
  },
] as const;

const PROJECTS = [
  {
    status: 'live',
    name: 'worship-team-scheduler',
    desc: 'Replaced a fully manual Discord-based scheduling process for a church worship team. A bot reads availability replies in-channel — keeping team behaviour unchanged — while admins manage rosters via a dedicated web interface that automatically respects block-out periods.',
    stack: 'next.js / nestjs / postgres / discord.js',
  },
  {
    status: 'in_testing',
    name: 'church-claims-management',
    desc: 'Replaced a paper-based claims process with digital submission and a configurable, multi-level approval workflow. Members submit claims online; each is automatically routed to the appropriate leaders and admin roles.',
    stack: 'next.js / nestjs / postgres',
  },
] as const;

const STACK = [
  ['frontend', 'React, Next.js, React Native, AngularJS, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Flutter'],
  ['backend', 'Node.js, NestJS, Prisma, RESTful APIs, Microservices Architecture'],
  ['database', 'PostgreSQL, MySQL, MongoDB, Redis'],
  ['testing', 'Jest, Vitest, Playwright (E2E)'],
  ['tooling', 'Docker, Webpack, Vite, Monorepo, Turborepo, CI/CD Pipelines, Git'],
  ['ai', 'Claude Code, OpenAI Codex, Google Antigravity, AI Agents, OCR, Gemma 4'],
  ['other', 'Shopify Liquid, CRM Integrations, Payment Gateway Integrations'],
] as const;

const CONTACT = [
  ['email', 'paulyx212@gmail.com', 'mailto:paulyx212@gmail.com'],
  ['phone.sg', '+65 8043 2102', null],
  ['phone.my', '+60 19-790 2102', null],
  ['linkedin', '/in/chew-yuen-xuen', 'https://linkedin.com/in/chew-yuen-xuen'],
  ['github', '/paulyx212', 'https://github.com/chewyx212'],
  ['timezone', 'GMT+8 · Singapore', null],
] as const;

// ─── Main component ──────────────────────────────────────────────────────────

const DEFAULTS: TweakValues = {
  theme: 'paper',
  fontPair: 'jetbrains',
  accent: 'amber',
  customAccent: '#B8702A',
  density: 'regular',
  hero: 'ascii',
  uppercase: false,
};

export default function Portfolio() {
  const [tw, setTw] = React.useState<TweakValues>(DEFAULTS);
  const [panelOpen, setPanelOpen] = React.useState(false);

  const set = <K extends keyof TweakValues>(key: K, val: TweakValues[K]) =>
    setTw((prev) => ({ ...prev, [key]: val }));

  const t = THEMES[tw.theme];
  const fp = FONT_PAIRS[tw.fontPair];
  const c = tw.accent === 'custom' ? tw.customAccent : (ACCENTS[tw.accent] ?? ACCENTS.amber);
  const d = DENSITIES[tw.density];
  const tt = (s: string) => tw.uppercase ? s.toUpperCase() : s;

  const Hero = tw.hero === 'minimal' ? HeroMinimal : tw.hero === 'block' ? HeroBlock : HeroAscii;

  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      color: t.fg,
      fontFamily: fp.mono,
      fontSize: 13,
      lineHeight: 1.6,
      padding: `${d.pad}px clamp(20px, ${d.hPad}px, ${d.hPad}px) ${d.pad + 24}px`,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: d.vGap - 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: t.muted, marginBottom: 6, letterSpacing: '0.04em' }}>
              // ~/portfolio/chew-yuen-xuen.md
            </div>
            <div style={{ fontSize: 11, letterSpacing: '0.04em' }}>v.2026.04 · 5 years experience · singapore</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '0.04em', border: `1px solid ${t.fg}`, padding: '8px 14px' }}>
            <span style={{ width: 6, height: 6, background: c, display: 'inline-block', borderRadius: '50%' }} />
            status: available_for_work
          </div>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: d.vGap + 8 }}>
          <Hero t={t} c={c} />
          <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: 0, maxWidth: 880 }}>
            <div style={{ borderLeft: `2px solid ${c}`, paddingLeft: 16, fontSize: 11, color: t.muted, letterSpacing: '0.04em' }}>
              ABSTRACT
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
              Frontend engineer with 5 years across enterprise and product environments. React, Next.js, TypeScript, Tailwind. Contributed to Singlife&rsquo;s shared internal React component library and was a key contributor to{' '}
              <span style={{ background: t.soft, padding: '0 4px' }}>EzSub</span>{' '}
              — recipient of the Singapore User Experience of the Year (Financial Services) at the Asian Business Review Awards 2025.
            </p>
          </div>
        </div>

        {/* Experience */}
        <Section tag="cat experience.log" title={tt('Section · 01')} t={t} c={c}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'clamp(120px, 180px, 180px) 1fr', gap: 24, paddingTop: 24, paddingBottom: 24, borderBottom: `1px dashed ${t.muted}` }}>
              <div>
                <div style={{ fontSize: 11, color: t.muted, marginBottom: 8 }}>{exp.range}</div>
                <div style={{ fontSize: 11, color: t.muted }}>{exp.loc}</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 18, letterSpacing: '-0.01em' }}>{exp.co}</span>
                  {exp.star && (
                    <span style={{ fontSize: 10, color: c, letterSpacing: '0.08em', border: `1px solid ${c}`, padding: '1px 6px' }}>★ AWARD</span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: t.muted, marginBottom: 16, letterSpacing: '0.04em' }}>{exp.role}</div>
                <div>
                  {exp.bullets.map(([title, body], j) => (
                    <div key={j} style={{ display: 'grid', gridTemplateColumns: '20px minmax(100px, 150px) 1fr', gap: 12, fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>
                      <span style={{ color: c }}>{'>'}</span>
                      <span style={{ color: t.fg }}>{title.toLowerCase()}</span>
                      <span style={{ color: t.muted }}>{body}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 14, letterSpacing: '0.04em' }}>
                  stack ╌╌ {exp.stack}
                </div>
              </div>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section tag="ls ./personal-projects" title={tt('Section · 02')} t={t} c={c}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {PROJECTS.map((p) => (
              <div key={p.name} style={{ border: `1px solid ${t.fg}`, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 11, color: t.muted, letterSpacing: '0.06em' }}>
                  <span>./{p.name}</span>
                  <span style={{ color: c }}>[{p.status}]</span>
                </div>
                <div style={{ fontSize: 18, marginBottom: 12 }}>{p.name.replace(/-/g, ' ')}</div>
                <p style={{ fontSize: 13, color: t.muted, lineHeight: 1.65, margin: 0, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ fontSize: 11, color: t.fg, paddingTop: 12, borderTop: `1px dashed ${t.muted}` }}>{p.stack}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Stack */}
        <Section tag="cat ~/.stack" title={tt('Section · 03')} t={t} c={c}>
          <div>
            {STACK.map(([k, v]) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, padding: '12px 0', borderBottom: `1px dotted ${t.muted}` }}>
                <div style={{ fontSize: 12, color: c }}>--{k}</div>
                <div style={{ fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Awards + Education */}
        <Section tag="cat awards.md & cat education.md" title={tt('Section · 04')} t={t} c={c}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            <div style={{ background: t.invBg, color: t.invFg, padding: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.08em', color: c, marginBottom: 18 }}>★ ASIAN BUSINESS REVIEW AWARDS · 2025</div>
              <div style={{ fontSize: 24, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.01em' }}>Singapore User Experience of the Year — Financial Services</div>
              <p style={{ fontSize: 13, color: t.soft, margin: 0, lineHeight: 1.6 }}>Awarded to EzSub, Singlife&rsquo;s adviser portal. A direct reflection of the UI and UX quality the team delivered.</p>
            </div>
            <div style={{ paddingTop: 4 }}>
              <div style={{ fontSize: 11, color: t.muted, marginBottom: 10 }}>2022 · graduated</div>
              <div style={{ fontSize: 18, marginBottom: 6, letterSpacing: '-0.01em' }}>Bachelor of Software Engineering</div>
              <div style={{ fontSize: 13, color: t.muted, marginBottom: 24 }}>Southern University College, Malaysia</div>
              <div style={{ fontSize: 11, color: t.muted, marginBottom: 10 }}>spoken</div>
              <div style={{ fontSize: 13, lineHeight: 1.7 }}>English · Mandarin · Malay</div>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section tag="contact --me" title={tt('Section · 05')} t={t} c={c}>
          <h2 style={{ fontWeight: 400, fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0, marginBottom: 32 }}>
            Open to frontend and full-stack roles.<br />
            <span style={{ color: c }}>$ get_in_touch_</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', columnGap: 40, rowGap: 0 }}>
            {CONTACT.map(([key, value, href]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${t.muted}` }}>
                <span style={{ color: t.muted }}>{key}</span>
                <span>
                  {href ? (
                    <a href={href} style={{ textDecoration: 'none', borderBottom: `1px dashed ${t.muted}` }}>
                      {value}
                    </a>
                  ) : value}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <div style={{ fontSize: 10, color: t.muted, paddingTop: 24, borderTop: `1px solid ${t.fg}`, display: 'flex', justifyContent: 'space-between', letterSpacing: '0.05em', flexWrap: 'wrap', gap: 8 }}>
          <span>EOF · ./chew-yuen-xuen.md</span>
          <span>set in {fp.name}</span>
          <span>© 2026</span>
        </div>

      </div>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks" open={panelOpen} onToggle={() => setPanelOpen((v) => !v)}>
        <TweakSection label="Theme" />
        <TweakSelect
          label="Color theme"
          value={tw.theme}
          options={[
            { value: 'paper', label: 'Paper (warm)' },
            { value: 'ivory', label: 'Ivory' },
            { value: 'ink',   label: 'Ink (dark)' },
            { value: 'cool',  label: 'Cool grey' },
          ]}
          onChange={(v) => set('theme', v as TweakValues['theme'])}
        />
        <TweakSelect
          label="Accent"
          value={tw.accent}
          options={[
            { value: 'amber', label: 'Amber' },
            { value: 'sage',  label: 'Sage' },
            { value: 'ink',   label: 'Ink blue' },
            { value: 'rust',  label: 'Rust' },
            { value: 'plum',  label: 'Plum' },
            { value: 'custom',label: 'Custom…' },
          ]}
          onChange={(v) => set('accent', v)}
        />
        {tw.accent === 'custom' && (
          <TweakColor label="Custom accent" value={tw.customAccent} onChange={(v) => set('customAccent', v)} />
        )}

        <TweakSection label="Type" />
        <TweakSelect
          label="Font pairing"
          value={tw.fontPair}
          options={[
            { value: 'jetbrains', label: 'JetBrains Mono' },
            { value: 'geist',     label: 'Geist Mono + Geist' },
            { value: 'ibm',       label: 'IBM Plex Mono + Sans' },
            { value: 'fira',      label: 'Fira Code' },
          ]}
          onChange={(v) => set('fontPair', v as TweakValues['fontPair'])}
        />
        <TweakToggle label="Uppercase labels" value={tw.uppercase} onChange={(v) => set('uppercase', v)} />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={tw.density}
          options={['compact', 'regular', 'airy']}
          onChange={(v) => set('density', v as TweakValues['density'])}
        />

        <TweakSection label="Hero" />
        <TweakRadio
          label="Variant"
          value={tw.hero}
          options={[
            { value: 'ascii',   label: 'ASCII' },
            { value: 'minimal', label: 'Minimal' },
            { value: 'block',   label: 'Block' },
          ]}
          onChange={(v) => set('hero', v as TweakValues['hero'])}
        />
      </TweaksPanel>
    </div>
  );
}
