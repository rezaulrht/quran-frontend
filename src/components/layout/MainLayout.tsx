import { IconSidebar } from './IconSidebar'
import { SurahSidebar } from './SurahSidebar'
import { RightPanel } from './RightPanel'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-qm-bg">
      {/* Icon sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <IconSidebar />
      </div>

      {/* Surah sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <SurahSidebar />
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto bg-qm-bg md:ml-[330px] md:mr-[280px]">
        {children}
      </main>

      {/* Right panel — hidden on mobile */}
      <div className="hidden md:block">
        <RightPanel />
      </div>
    </div>
  )
}
