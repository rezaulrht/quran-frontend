# Quran Web Application

## Live Demo
[Live Demo](https://your-app.vercel.app)

## Project Overview
A Quran web application cloning the UI of quranmazid.com/1, built as a Junior Web Developer technical assessment. Features surah navigation, ayah reader with Arabic text and English translation, per-ayah audio playback, search, font settings, and responsive design.

## Features
- Left icon sidebar cloned from reference design
- Scrollable surah sidebar with all 114 surahs (Arabic name, English name, number)
- Ayah reader with Arabic text (RTL, KFGQ font), English translation, verse numbers
- Per-ayah audio playback using Mishary Al-Afasy recitation
- Search ayahs by Arabic or English text across all 114 surahs
- Font settings panel: 2 Arabic fonts, Arabic size slider, translation size slider
- Settings persisted via localStorage
- Dark theme matching QuranMazid reference design
- Fully responsive: desktop, tablet, mobile with drawer sidebar and bottom player

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Zustand |
| Backend | Node.js, Express, TypeScript |
| Data | Quran JSON (github.com/risan/quran-json) |
| Audio | AlQuran Cloud API (api.alquran.cloud) |
| Deployment | Vercel (frontend + backend) |

## Project Structure
```
quran-web-app/     ← Next.js frontend
quran-backend/     ← Express API backend
```

## Local Setup

### Backend
```bash
cd quran-backend
npm install
npm run dev
```
Runs on http://localhost:5000

### Frontend
```bash
cd quran-web-app
npm install
npm run dev
```
Runs on http://localhost:3000

## Data Source
Quran JSON from https://github.com/risan/quran-json
Translation: Saheeh International

## Audio Source
https://api.alquran.cloud/v1/ayah/{verseNumber}/ar.alafasy
Reciter: Mishary Rashid Al-Afasy

## Assessment Requirements Covered
- [x] Left icon sidebar
- [x] Surah sidebar with all 114 surahs
- [x] Ayah page: Arabic text, English translation, verse numbers, surah header
- [x] Per-ayah audio playback
- [x] Search by Arabic and English text
- [x] Font settings with localStorage persistence
- [x] Dark theme matching QuranMazid
- [x] Fully responsive (mobile, tablet, desktop)
- [x] TypeScript throughout
- [x] SSG with generateStaticParams
- [x] Deployed on Vercel

## Known Limitations
- Audio depends on AlQuran Cloud API availability
- KFGQ font loads from external CDN on first visit

## Submission Notes
Built for Junior Web Developer technical assessment.
Tested in incognito mode before submission.
