'use client'

import Image from 'next/image'
import { Search, Home, Clock, Grid3X3, Compass, Bookmark, AlignLeft, LayoutGrid } from 'lucide-react'
import { clsx } from 'clsx'
import { useUIStore } from '@/store/uiStore'

interface NavIcon {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
}

const navIcons: NavIcon[] = [
  { icon: Home,       label: 'Home' },
  { icon: Clock,      label: 'History' },
  { icon: Grid3X3,    label: 'Surahs' },
  { icon: Compass,    label: 'Explore' },
  { icon: Bookmark,   label: 'Bookmarks' },
  { icon: AlignLeft,  label: 'Notes' },
  { icon: LayoutGrid, label: 'Dashboard' },
]

interface IconSidebarProps {
  activeIndex?: number
}

export function IconSidebar({ activeIndex = 0 }: IconSidebarProps) {
  const setSearchModalOpen = useUIStore((s) => s.setSearchModalOpen)

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-full w-[50px] flex-col items-center border-r border-qm-border2 bg-qm-bg py-3">
      {/* Logo */}
      <div className="mb-4">
        <Image src="/quran_logo.png" alt="Quran Web App" width={36} height={36} className="rounded-md" />
      </div>

      {/* Search trigger */}
      <button
        type="button"
        aria-label="Search ayahs (Ctrl+K)"
        onClick={() => setSearchModalOpen(true)}
        className="group relative mb-4 flex h-9 w-9 items-center justify-center rounded-md text-qm-text-faint transition-colors hover:bg-qm-surface2 hover:text-qm-green"
        title="Search ayahs (Ctrl+K)"
      >
        <Search size={18} />
        <span className="absolute -bottom-1 -right-1 rounded bg-qm-border2 px-0.5 text-[8px] leading-tight text-qm-text-faint opacity-70">
          ^K
        </span>
      </button>

      {/* Nav icons */}
      <nav className="flex flex-col items-center gap-5">
        {navIcons.map(({ icon: Icon, label }, index) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className={clsx(
              'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
              index === activeIndex
                ? 'text-qm-green'
                : 'text-qm-text-faint hover:text-qm-text',
            )}
          >
            <Icon size={18} />
          </button>
        ))}
      </nav>
    </aside>
  )
}
