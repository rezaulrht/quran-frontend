'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { clsx } from 'clsx'
import { getAllSurahs } from '@/lib/api'
import type { Surah } from '@/types/quran'

type Tab = 'Surah' | 'Juz' | 'Page'

const TABS: Tab[] = ['Surah', 'Juz', 'Page']

export function SurahSidebar() {
  const [activeTab, setActiveTab] = useState<Tab>('Surah')
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [query, setQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    getAllSurahs()
      .then(setSurahs)
      .catch(console.error)
  }, [])

  const activeSurahId = (() => {
    const match = pathname.match(/\/surah\/(\d+)/)
    if (!match) return null
    const raw = match[1]
    return raw !== undefined ? parseInt(raw, 10) : null
  })()

  const filtered =
    query.length > 0
      ? surahs.filter(
          (s) =>
            s.transliteration.toLowerCase().includes(query.toLowerCase()) ||
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.translation.toLowerCase().includes(query.toLowerCase()),
        )
      : surahs

  return (
    <aside className="fixed left-[50px] top-0 z-10 flex h-full w-[280px] flex-col border-r border-qm-border bg-qm-surface">
      {/* Tabs */}
      <div className="flex items-center gap-1 p-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'flex-1 rounded-full py-1.5 text-sm font-medium transition-colors',
              activeTab === tab
                ? 'bg-white text-black'
                : 'text-qm-text-faint hover:text-qm-text',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-md border border-qm-border2 bg-qm-surface2 px-3 py-2">
          <Search size={14} className="shrink-0 text-qm-text-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Surah"
            className="w-full bg-transparent text-sm text-qm-text placeholder-qm-text-faint outline-none"
          />
        </div>
      </div>

      {/* Surah list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((surah) => {
          const isActive = surah.id === activeSurahId
          return (
            <button
              key={surah.id}
              type="button"
              onClick={() => router.push(`/surah/${surah.id}`)}
              className={clsx(
                'flex w-full items-center gap-3 px-3 py-3 text-left transition-colors',
                isActive ? 'bg-qm-green-dark' : 'hover:bg-qm-surface2',
              )}
            >
              {/* Number circle */}
              <span
                className={clsx(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                  isActive ? 'bg-qm-green text-black' : 'bg-qm-badge text-qm-text',
                )}
              >
                {surah.id}
              </span>

              {/* English name + meaning */}
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[15px] font-medium leading-6 text-qm-text">
                  {surah.transliteration}
                </span>
                <span className="text-[13px] leading-5 text-qm-text-muted">
                  {surah.translation}
                </span>
              </div>

              {/* Arabic name */}
              <span
                dir="rtl"
                lang="ar"
                className="shrink-0 text-right font-arabic text-[14px] text-qm-text-muted"
              >
                {surah.name}
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
