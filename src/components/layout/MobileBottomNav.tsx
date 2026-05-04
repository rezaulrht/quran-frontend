'use client'

import { Grid3X3, Navigation, Bookmark, LayoutGrid } from 'lucide-react'

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-14 items-center border-t border-qm-border bg-qm-surface md:hidden">
      <button
        type="button"
        aria-label="Surah list"
        className="flex flex-1 flex-col items-center justify-center gap-1 text-qm-text-faint transition-colors hover:text-qm-text"
      >
        <Grid3X3 size={20} />
      </button>
      <button
        type="button"
        aria-label="Navigate"
        className="flex flex-1 flex-col items-center justify-center gap-1 text-qm-text-faint transition-colors hover:text-qm-text"
      >
        <Navigation size={20} />
      </button>
      <button
        type="button"
        aria-label="Bookmarks"
        className="flex flex-1 flex-col items-center justify-center gap-1 text-qm-text-faint transition-colors hover:text-qm-text"
      >
        <Bookmark size={20} />
      </button>
      <button
        type="button"
        aria-label="More"
        className="flex flex-1 flex-col items-center justify-center gap-1 text-qm-text-faint transition-colors hover:text-qm-text"
      >
        <LayoutGrid size={20} />
      </button>
    </nav>
  )
}
