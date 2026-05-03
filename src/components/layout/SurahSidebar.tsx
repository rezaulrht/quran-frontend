'use client'

import { Search } from 'lucide-react'
import { clsx } from 'clsx'
import { useState } from 'react'

type Tab = 'Surah' | 'Juz' | 'Page'

const TABS: Tab[] = ['Surah', 'Juz', 'Page']

export function SurahSidebar() {
  const [activeTab, setActiveTab] = useState<Tab>('Surah')

  return (
    <aside className="fixed left-[50px] top-0 z-10 flex h-full w-[280px] flex-col border-r border-qm-border bg-qm-surface">
      {/* Tabs */}
      <div className="flex items-center gap-1 p-3">
        {TABS.map((tab) => (
          <button
            key={tab}
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
            placeholder="Search Surah"
            className="w-full bg-transparent text-sm text-qm-text placeholder-qm-text-faint outline-none"
          />
        </div>
      </div>

      {/* Surah list — populated in Phase 3 */}
      <div className="flex-1 overflow-y-auto" />
    </aside>
  )
}
