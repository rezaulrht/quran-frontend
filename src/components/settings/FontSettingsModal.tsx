'use client'

import { useState } from 'react'
import { Settings2, X, ChevronDown, ChevronUp } from 'lucide-react'
import { clsx } from 'clsx'
import { useUIStore } from '@/store/uiStore'
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

type ModalTab = 'Translation' | 'Reading'
const MODAL_TABS: ModalTab[] = ['Translation', 'Reading']

export function FontSettingsModal() {
  const isOpen = useUIStore((s) => s.isSettingsOpen)
  const setSettingsOpen = useUIStore((s) => s.setSettingsOpen)

  const [activeTab, setActiveTab] = useState<ModalTab>('Translation')
  const [readingOpen, setReadingOpen] = useState(false)
  const [fontOpen, setFontOpen] = useState(true)

  const arabicFont          = useSettingsStore((s) => s.arabicFont)
  const arabicFontSize      = useSettingsStore((s) => s.arabicFontSize)
  const translationFontSize = useSettingsStore((s) => s.translationFontSize)
  const setArabicFont          = useSettingsStore((s) => s.setArabicFont)
  const setArabicFontSize      = useSettingsStore((s) => s.setArabicFontSize)
  const setTranslationFontSize = useSettingsStore((s) => s.setTranslationFontSize)

  if (!isOpen) return null

  const selectedFontLabel = FONT_OPTIONS.find((o) => o.value === arabicFont)?.label ?? 'KFGQ'

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-qm-bg">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-qm-border px-4 py-4">
        <Settings2 size={20} className="shrink-0 text-qm-green" />
        <span className="flex-1 text-base font-semibold text-qm-text">Settings</span>
        <button
          type="button"
          aria-label="Close settings"
          onClick={() => setSettingsOpen(false)}
          className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
        >
          <X size={20} />
        </button>
      </div>

      {/* Tab pills */}
      <div className="flex gap-2 px-4 py-3">
        {MODAL_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'flex-1 rounded-full py-2 text-sm font-medium transition-colors',
              activeTab === tab
                ? 'bg-white text-black'
                : 'bg-qm-surface2 text-qm-text-faint hover:text-qm-text',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="px-4 pb-8">
        {/* Reading Settings — collapsible */}
        <div className="mb-2 rounded-lg border border-qm-border bg-qm-surface">
          <button
            type="button"
            onClick={() => setReadingOpen((o) => !o)}
            aria-expanded={readingOpen}
            className="flex w-full items-center justify-between px-4 py-4"
          >
            <span className="text-sm font-semibold text-qm-text">Reading Settings</span>
            {readingOpen
              ? <ChevronUp size={16} className="text-qm-text-faint" />
              : <ChevronDown size={16} className="text-qm-text-faint" />}
          </button>
          {readingOpen && (
            <div className="border-t border-qm-border px-4 pb-4 pt-3">
              <p className="text-sm text-qm-text-muted">Reading settings coming soon.</p>
            </div>
          )}
        </div>

        {/* Font Settings — collapsible, open by default */}
        <div className="rounded-lg border border-qm-border bg-qm-surface">
          <button
            type="button"
            onClick={() => setFontOpen((o) => !o)}
            aria-expanded={fontOpen}
            className="flex w-full items-center justify-between px-4 py-4"
          >
            <span className="text-sm font-semibold text-qm-green">Font Settings</span>
            {fontOpen
              ? <ChevronUp size={16} className="text-qm-text-faint" />
              : <ChevronDown size={16} className="text-qm-text-faint" />}
          </button>

          {fontOpen && (
            <div className="flex flex-col gap-5 border-t border-qm-border px-4 pb-5 pt-4">
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
                <div className="mt-2 flex items-center justify-between rounded border border-qm-border2 bg-qm-surface2 px-3 py-2">
                  <select
                    value={arabicFont}
                    onChange={(e) => setArabicFont(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-qm-text outline-none"
                  >
                    {FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Support card */}
        <div className="mt-6 rounded-lg bg-qm-green-dark p-4">
          <p className="mb-1 text-sm font-semibold text-qm-text">
            Help spread the knowledge of Islam
          </p>
          <p className="mb-4 text-sm text-qm-text-muted">
            Your support helps keep this app free and available to everyone around the world.
          </p>
          <button
            type="button"
            className="w-full rounded-lg bg-qm-green-btn py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Support Us
          </button>
        </div>
      </div>
    </div>
  )
}
