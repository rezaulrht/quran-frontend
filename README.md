# Quran Web Application

## Live Demo
🔗 [https://quran-mazid-liart.vercel.app](https://quran-mazid-liart.vercel.app)

## Repositories
- Frontend: [https://github.com/rezaulrht/quran_frontend](https://github.com/rezaulrht/quran_frontend)
- Backend: [https://github.com/rezaulrht/quran_backend](https://github.com/rezaulrht/quran_backend)

## Project Overview
A Quran web application cloning the UI of [quranmazid.com/1](https://quranmazid.com/1), built as a Junior Web Developer technical assessment. Features surah navigation, ayah reader with Arabic text and English translation, per-ayah audio playback, search functionality, font settings panel, and fully responsive design for desktop, tablet, and mobile.

## Features
- Left icon sidebar matching reference design
- Scrollable surah sidebar with all 114 surahs (number, Arabic name, English name)
- Ayah reader with Arabic text (RTL, KFGQ font), English translation (Saheeh International), verse numbers
- Per-ayah audio playback with Al-Afasy recitation, auto-continues to next verse
- Bottom audio player showing current surah and verse with controls
- Active ayah highlight while playing
- Search ayahs by Arabic or English text across all 114 surahs
- Font settings panel: KFGQ, Amiri, Scheherazade New fonts + size sliders
- Settings persisted via localStorage using Zustand persist middleware
- Dark theme matching QuranMazid reference design
- Fully responsive: desktop sidebar, mobile drawer, mobile bottom player, mobile settings modal

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router, SSG), TypeScript, Tailwind CSS |
| State Management | Zustand with persist middleware |
| Icons | Lucide React |
| Deployment | Vercel |

## Project Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── surah/[id]/page.tsx    ← SSG, generateStaticParams for all 114 surahs
├── components/
│   ├── layout/                ← IconSidebar, SurahSidebar, RightPanel, MainLayout
│   ├── ayah/                  ← AyahCard
│   ├── audio/                 ← AudioButton, BottomAudioPlayer
│   ├── search/                ← SearchBar
│   └── settings/              ← FontSettingsPanel, FontSettingsModal
├── hooks/                     ← useAudioPlayer
├── store/                     ← audioStore, settingsStore
├── lib/                       ← api.ts (all backend fetch helpers)
└── types/                     ← quran.ts interfaces
```

## Local Setup
```bash
# Clone the repo
git clone https://github.com/rezaulrht/quran_frontend
cd quran_frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Data Source
Quran JSON data from [github.com/risan/quran-json](https://github.com/risan/quran-json)
Translation: Saheeh International

## Audio Source
Fetched from [AlQuran Cloud API](https://api.alquran.cloud)
`https://api.alquran.cloud/v1/ayah/{verseNumber}/ar.alafasy`
Reciter: Mishary Rashid Al-Afasy

## Assessment Requirements Covered
- [x] Left icon sidebar
- [x] Surah sidebar with all 114 surahs (number, Arabic name, English name)
- [x] Ayah page: Arabic text (RTL), English translation, verse numbers, surah header
- [x] Per-ayah audio playback using free Quran audio API
- [x] Search by Arabic and English text across all surahs
- [x] Font settings panel with minimum 2 Arabic fonts and size sliders
- [x] Settings persisted via localStorage
- [x] Dark theme matching QuranMazid reference design
- [x] Fully responsive (mobile, tablet, desktop)
- [x] TypeScript throughout — strict mode
- [x] Next.js SSG with generateStaticParams for all 114 surah pages
- [x] Deployed on Vercel with live demo

## Known Limitations
- Audio depends on AlQuran Cloud API availability
- KFGQ font loads from self-hosted file on first visit

## Submission Notes
Built for Junior Web Developer technical assessment.
Reference site: [quranmazid.com/1](https://quranmazid.com/1)
Tested in incognito mode before submission.
