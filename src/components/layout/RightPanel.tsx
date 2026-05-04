'use client'

import { clsx } from 'clsx'
import { useState } from 'react'
import { FontSettingsPanel } from '@/components/settings/FontSettingsPanel'

type PanelTab = 'Translation' | 'Reading'

const PANEL_TABS: PanelTab[] = ['Translation', 'Reading']

export function RightPanel() {
  const [activeTab, setActiveTab] = useState<PanelTab>('Translation')

  return (
    <aside className="fixed right-0 top-0 z-10 flex h-full w-[280px] flex-col border-l border-qm-border bg-qm-surface">
      {/* Tab toggle */}
      <div className="flex items-center gap-1 p-3">
        {PANEL_TABS.map((tab) => (
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

      {/* Settings content */}
      <div className="flex-1 overflow-y-auto">
        <FontSettingsPanel />
      </div>
    </aside>
  )
}
