import { getSurah, getAllSurahs } from '@/lib/api'
import { AyahCard } from '@/components/ayah/AyahCard'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const surahs = await getAllSurahs()
  return surahs.map((s) => ({ id: String(s.id) }))
}

interface SurahPageProps {
  params: Promise<{ id: string }>
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params
  const surah = await getSurah(parseInt(id, 10))

  const revelationLabel = surah.type === 'Meccan' ? 'Makkah' : 'Madinah'

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Surah Header */}
      <div className="mb-10 flex items-center justify-center gap-6">
        {/* Mosque SVG placeholder */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-16 w-16 shrink-0 text-qm-text-muted opacity-40"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M32 4C20 4 12 12 12 20c0 4 1.5 7.5 4 10H10v4h4v2H8v4h48v-4h-6v-2h4v-4H46c2.5-2.5 4-6 4-10C50 12 44 4 32 4zm0 4c9 0 14 6.5 14 12 0 3-1 5.5-2.8 7.5H20.8C19 25.5 18 23 18 20c0-5.5 5-12 14-12zm-8 26h16v2H24v-2z" />
        </svg>

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-qm-text">{surah.transliteration}</h1>
          <p
            dir="rtl"
            lang="ar"
            className="mt-1 text-right font-arabic text-xl text-qm-arabic"
          >
            {surah.name}
          </p>
          <p className="mt-1 text-sm text-qm-text-muted">
            Ayah-{surah.total_verses}, {revelationLabel}
          </p>
        </div>
      </div>

      {/* Bismillah — all surahs except Surah 9 (At-Tawbah) */}
      {surah.id !== 9 && (
        <div className="mb-8 text-center">
          <p
            dir="rtl"
            lang="ar"
            className="text-right font-arabic text-3xl leading-[60px] text-qm-arabic"
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>
      )}

      {/* Ayah list */}
      <div>
        {surah.verses.map((verse, idx) => (
          <AyahCard
            key={verse.id}
            verse={verse}
            surahId={surah.id}
            nextGlobalVerseNumber={surah.verses[idx + 1]?.global_verse_number}
          />
        ))}
      </div>
    </div>
  )
}
