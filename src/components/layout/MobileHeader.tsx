'use client'

import { Menu } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

export function MobileHeader() {
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b border-qm-border bg-qm-surface px-2 md:hidden">
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen(true)}
        className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
      >
        <Menu size={20} />
      </button>
      <span className="flex-1 text-center text-sm font-medium text-qm-text">
        Quran Web App
      </span>
      {/* Spacer to center title */}
      <div className="h-11 w-11" />
    </header>
  )
}
