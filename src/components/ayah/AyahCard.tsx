'use client'

import { Bookmark, MoreHorizontal } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'
import { AudioButton } from '@/components/audio/AudioButton'
import type { Verse } from '@/types/quran'

interface AyahCardProps {
  verse: Verse
  surahId: number
}

export function AyahCard({ verse, surahId }: AyahCardProps) {
  const arabicFontSize = useSettingsStore((s) => s.arabicFontSize)
  const arabicFont = useSettingsStore((s) => s.arabicFont)
  const translationFontSize = useSettingsStore((s) => s.translationFontSize)

  return (
    <div className="flex gap-4 border-b border-qm-border py-6">
      {/* Left narrow column */}
      <div className="flex w-10 shrink-0 flex-col items-center gap-4 pt-1">
        <span className="text-[16px] font-semibold leading-[26px] text-qm-arabic">
          {surahId}:{verse.verse_number}
        </span>
        <AudioButton globalVerseNumber={verse.global_verse_number} />
        <button
          type="button"
          className="text-qm-text-faint transition-colors hover:text-qm-text"
          aria-label="Bookmark"
        >
          <Bookmark size={18} />
        </button>
        <button
          type="button"
          className="text-qm-text-faint transition-colors hover:text-qm-text"
          aria-label="More options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Right content area */}
      <div className="flex-1">
        <p
          dir="rtl"
          lang="ar"
          className="text-right leading-[60px] text-qm-arabic"
          /* eslint-disable-next-line react/forbid-component-props */
          style={{ fontSize: `${arabicFontSize}px`, fontFamily: arabicFont }}
        >
          {verse.text}
        </p>

        <p className="mt-4 text-[13px] uppercase tracking-wider text-qm-text-muted">
          Saheeh International
        </p>

        <p
          className="mt-1 leading-[28px] text-qm-text"
          style={{ fontSize: `${translationFontSize}px` }}
        >
          {verse.translation}
        </p>
      </div>
    </div>
  )
}
