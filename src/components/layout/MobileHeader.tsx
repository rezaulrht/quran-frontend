'use client'

import Image from 'next/image'
import { Menu, Search, MoonStar, Settings2 } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

export function MobileHeader() {
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)
  const setSettingsOpen = useUIStore((s) => s.setSettingsOpen)

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b border-qm-border bg-qm-surface px-4 md:hidden">
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen(true)}
        className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
      >
        <Menu size={20} />
      </button>

      <div className="flex flex-1 items-center justify-center">
        <Image src="/quran_logo.png" alt="Quran Web App" width={32} height={32} className="rounded-md" />
      </div>

      <div className="flex items-center">
        <button
          type="button"
          aria-label="Search"
          className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
        >
          <Search size={20} />
        </button>
        <button
          type="button"
          aria-label="Toggle theme"
          className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
        >
          <MoonStar size={20} />
        </button>
        <button
          type="button"
          aria-label="Settings"
          onClick={() => setSettingsOpen(true)}
          className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
        >
          <Settings2 size={20} />
        </button>
      </div>
    </header>
  )
}
