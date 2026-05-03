# Quran Web App — Frontend CLAUDE.md

## Project
Quran Web App — cloning https://quranmazid.com/1
Frontend only. Backend runs separately at http://localhost:5000

## Stack
- Next.js 15 (App Router, SSG)
- TypeScript (strict)
- Tailwind CSS
- Zustand (state management)
- Lucide React (icons)
- clsx + tailwind-merge (conditional classes)

---

## Folder Structure
```
src/
├── app/
│   ├── layout.tsx         ← root layout, loads fonts, dark theme
│   ├── page.tsx           ← redirects to /surah/1
│   └── surah/
│       └── [id]/
│           └── page.tsx   ← SSG surah reader page
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx
│   │   ├── IconSidebar.tsx
│   │   ├── SurahSidebar.tsx
│   │   └── RightPanel.tsx
│   ├── ayah/
│   │   └── AyahCard.tsx
│   ├── audio/
│   │   └── AudioButton.tsx
│   ├── search/
│   │   └── SearchBar.tsx
│   └── settings/
│       └── FontSettingsPanel.tsx
├── hooks/
│   └── useAudioPlayer.ts
├── store/
│   ├── audioStore.ts
│   └── settingsStore.ts
├── lib/
│   └── api.ts
└── types/
    └── quran.ts
```

---

## Absolute Rules
- ALWAYS use TypeScript — never use `any` unless truly unavoidable, and add a comment explaining why
- Run `tsc --noEmit` after creating every new file — fix ALL errors before moving on
- Never use inline styles — Tailwind classes only
- Never use `useEffect` to fetch data that can be fetched at build time via SSG
- All Surah pages MUST use `generateStaticParams` for static generation
- Use `clsx` and `tailwind-merge` for all conditional class logic — never string concatenation
- Commit after every phase with a meaningful commit message

---

## Arabic Text Rules
- Every Arabic text element MUST have `dir="rtl"` and `lang="ar"`
- Always use Tailwind `text-right` for Arabic text alignment
- Arabic font applied via Zustand settingsStore — never hardcoded
- Do NOT mix Arabic and English in the same text node

---

## Component Rules
- Every component must have explicit TypeScript props interface defined above the component
- Use named exports for all components — no default exports except for page.tsx files
- Keep components focused — one responsibility per component
- No component should be longer than 150 lines — split if needed

---

## State Management Rules
- Use Zustand for all shared state (audio, settings, sidebar open/close)
- Font settings MUST use Zustand `persist` middleware — saves to localStorage automatically
- Do NOT manually write to localStorage anywhere — let Zustand persist handle it
- Audio store must enforce single playback — stop previous audio before starting new

---

## Styling Rules

### Colors (pixel-inspected from quranmazid.com/1 via DevTools)
Define all in `tailwind.config.ts` under `theme.extend.colors` with `qm` prefix:

```ts
qm: {
  bg:           '#1a1a1a',   // page background
  surface:      '#1f1f1f',   // sidebar and panel backgrounds
  surface2:     '#2a2a2a',   // input backgrounds, hover states
  border:       '#2a2a2a',   // dividers, sidebar borders
  border2:      '#374151',   // input borders, inactive badges
  arabic:       '#428038',   // Arabic ayah text AND ayah reference numbers
  text:         '#c4c4c4',   // primary body text, surah names, translations
  'text-muted': '#787d7a',   // surah meanings, SAHEEH label, dim labels
  'text-faint': '#6b7280',   // placeholders, inactive icons
  green:        '#4ade80',   // sliders, active icons, active surah badge
  'green-btn':  '#22c55e',   // filled buttons (Support Us)
  'green-dark': '#2d4a2d',   // active surah row background tint
  badge:        '#374151',   // inactive surah number circle background
}
```

ALWAYS use `qm-*` tokens — never hardcode hex values in JSX/TSX.

### Typography (exact from DevTools)
```
Arabic ayah text:      font: kfgq, size: 30px (adjustable), line-height: 60px, weight: 400, color: #428038
Ayah reference (1:1):  font: Inter, size: 16px, line-height: 26px, weight: 600, color: #428038
Surah name (sidebar):  font: Inter, size: 15px, line-height: 24px, weight: 500, color: #c4c4c4
Surah meaning:         font: Inter, size: 13px, line-height: 21px, weight: 400, color: #787d7a
SAHEEH INTL label:     font: Inter, size: 13px, line-height: 21px, weight: 400, color: #787d7a, uppercase, tracking-wider
Translation text:      font: Inter, size: 17px (adjustable), line-height: 28px, weight: 400, color: #c4c4c4
```

### Layout Dimensions
```
Icon sidebar width:    50px  (fixed, left)
Surah sidebar width:   280px (desktop)
Right panel width:     280px (desktop)
Main content:          flex-1 (fills remaining space)
```

---

## Font Loading Rules
- English font: load `Inter` via `next/font/google` in `layout.tsx`
- Arabic fonts (minimum 2 options for settings panel):
  - `Amiri` → available on Google Fonts ✓
  - `Scheherazade New` → available on Google Fonts ✓
  - `KFGQ` → self-host from CDN or download separately (default font)
- Apply Arabic font dynamically via Zustand settingsStore value
- KFGQ CDN: `https://fonts.qurancomplex.gov.sa/` or use jsDelivr

---

## Audio Rules
- CDN URL: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/{globalVerseNumber}.mp3`
- Global verse number = sum of all `total_verses` from surah 1 to (current surah − 1), then add current `verse_number`
- Use HTML5 `<audio>` element — no third-party audio library
- Show loading state while audio fetches
- Show error state if audio fails to load
- Only ONE ayah can play at a time — enforce via audioStore

---

## Responsive Rules
- Mobile breakpoint: below `md:` (768px)
- Icon sidebar: visible on desktop, hidden on mobile
- Surah sidebar: always visible on desktop (`md:block`), hidden by default on mobile, slides in as drawer
- Right panel: visible on desktop, hidden on mobile (toggle via icon)
- Add dark overlay/backdrop when mobile drawer is open
- No horizontal overflow at any screen size (375px, 768px, 1024px, 1280px)
- Minimum tap target size: 44px for all interactive elements

---

## SSG Rules
- `src/app/surah/[id]/page.tsx` MUST export `generateStaticParams`
- `generateStaticParams` returns all 114 surah IDs: `[{id:'1'}, {id:'2'}, ...]`
- Surah data fetched at build time via `lib/api.ts` — not in useEffect
- `export const dynamic = 'force-static'` if needed

---

## API Rules
- Backend base URL in `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:5000`
- All fetch calls go through `src/lib/api.ts` — never fetch directly in components
- Always handle loading and error states in components

---

## Font Settings Panel Rules
- Arabic font options: KFGQ (default) | Amiri | Scheherazade New
- Arabic font size: slider, range 20px to 48px, default 30px
- Translation font size: slider, range 14px to 24px, default 17px
- All settings applied instantly — no page reload needed
- Settings persist across sessions via Zustand persist middleware
- localStorage key: `qm-settings`

---

## Search Rules
- Minimum 2 characters before triggering search
- Debounce input: 300ms
- Show loading state, empty state, and results list
- Clicking a result navigates to `/surah/[id]` and scrolls to the ayah

---

## Do NOT
- Do not use `any` type
- Do not use inline styles
- Do not fetch data in useEffect if it can be SSG
- Do not create abstractions or helpers for one-time use
- Do not add error handling for impossible/internal scenarios
- Do not install new packages without confirming with user first
- Do not hardcode hex colors in JSX — use `qm-*` Tailwind tokens only
- Do not use default exports except in page.tsx and layout.tsx files
- Do not write to localStorage manually — Zustand persist handles it