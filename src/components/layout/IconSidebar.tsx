'use client'

import { BookOpen, Home, Clock, Grid3X3, Compass, Bookmark, AlignLeft, LayoutGrid } from 'lucide-react'
import { clsx } from 'clsx'

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
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-full w-[50px] flex-col items-center border-r border-qm-border2 bg-qm-bg py-3">
      {/* Logo */}
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md bg-[#22c55e]">
        <BookOpen size={18} className="text-white" />
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col items-center gap-5">
        {navIcons.map(({ icon: Icon, label }, index) => (
          <button
            key={label}
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
