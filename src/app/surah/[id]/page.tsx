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
    <div className="w-full">
      {/* Sticky Surah Header */}
      <div className="sticky top-0 z-10 border-b border-qm-border bg-qm-bg/95 px-4 py-4 text-center backdrop-blur-sm md:px-8">
        <h1 className="text-xl font-bold text-qm-text">{surah.transliteration}</h1>
        <p
          dir="rtl"
          lang="ar"
          className="mt-1 text-right font-arabic text-base text-qm-text-muted"
        >
          {surah.name}
        </p>
        <p className="mt-1 text-[13px] text-qm-text-muted">
          Ayah-{surah.total_verses}, {revelationLabel}
        </p>
      </div>

      {/* Scrollable content */}
      <div className="px-4 py-6 md:px-8">
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
              surahName={surah.transliteration}
              nextGlobalVerseNumber={surah.verses[idx + 1]?.global_verse_number}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
