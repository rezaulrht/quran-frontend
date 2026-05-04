'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'

interface FontOption {
  label: string
  value: string
}

const FONT_OPTIONS: FontOption[] = [
  { label: 'KFGQ',             value: 'kfgq, serif' },
  { label: 'Amiri',            value: 'Amiri, serif' },
  { label: 'Scheherazade New', value: 'Scheherazade New, serif' },
]

export function FontSettingsPanel() {
  const [isOpen, setIsOpen] = useState(true)

  const arabicFont        = useSettingsStore((s) => s.arabicFont)
  const arabicFontSize    = useSettingsStore((s) => s.arabicFontSize)
  const translationFontSize = useSettingsStore((s) => s.translationFontSize)
  const setArabicFont       = useSettingsStore((s) => s.setArabicFont)
  const setArabicFontSize   = useSettingsStore((s) => s.setArabicFontSize)
  const setTranslationFontSize = useSettingsStore((s) => s.setTranslationFontSize)

  return (
    <div className="px-3 py-2">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between py-1"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-qm-text-muted">
          Font Settings
        </span>
        {isOpen
          ? <ChevronUp size={14} className="text-qm-text-faint" />
          : <ChevronDown size={14} className="text-qm-text-faint" />}
      </button>

      {isOpen && (
        <div className="mt-3 flex flex-col gap-5">
          {/* Arabic Font Size */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-qm-text">Arabic Font Size</span>
              <span className="text-sm text-qm-green">{arabicFontSize}</span>
            </div>
            <input
              type="range"
              min={20}
              max={48}
              step={1}
              value={arabicFontSize}
              onChange={(e) => setArabicFontSize(Number(e.target.value))}
              className="mt-2 w-full accent-qm-green"
            />
          </div>

          {/* Translation Font Size */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-qm-text">Translation Font Size</span>
              <span className="text-sm text-qm-green">{translationFontSize}</span>
            </div>
            <input
              type="range"
              min={14}
              max={24}
              step={1}
              value={translationFontSize}
              onChange={(e) => setTranslationFontSize(Number(e.target.value))}
              className="mt-2 w-full accent-qm-green"
            />
          </div>

          {/* Arabic Font Face */}
          <div>
            <span className="block text-sm text-qm-text">Arabic Font Face</span>
            <select
              value={arabicFont}
              onChange={(e) => setArabicFont(e.target.value)}
              className="mt-2 w-full rounded border border-qm-border2 bg-qm-surface2 px-2 py-1.5 text-sm text-qm-text outline-none"
            >
              {FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
