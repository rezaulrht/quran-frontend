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
    <div className="w-full px-4 py-8 md:px-8">
      {/* Surah Header */}
      <div className="mb-10 flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold text-qm-text">{surah.transliteration}</h1>
        <p
          dir="rtl"
          lang="ar"
          className="text-right font-arabic text-base text-qm-text-muted"
        >
          {surah.name}
        </p>
        <p className="text-[13px] text-qm-text-muted">
          Ayah-{surah.total_verses}, {revelationLabel}
        </p>
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
