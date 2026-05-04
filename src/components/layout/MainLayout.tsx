import { IconSidebar } from './IconSidebar'
import { SurahSidebar } from './SurahSidebar'
import { RightPanel } from './RightPanel'
import { MobileHeader } from './MobileHeader'
import { MobileBottomNav } from './MobileBottomNav'
import { BottomAudioPlayer } from '@/components/audio/BottomAudioPlayer'
import { FontSettingsModal } from '@/components/settings/FontSettingsModal'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-qm-bg">
      {/* Mobile header — visible only on mobile, fixed at top */}
      <MobileHeader />

      {/* Icon sidebar — desktop only */}
      <div className="hidden md:block">
        <IconSidebar />
      </div>

      {/* Surah sidebar — always in DOM; drawer on mobile, fixed on desktop */}
      <SurahSidebar />

      {/* Main content — offset by sidebars on desktop; full width + header/footer offsets on mobile */}
      <main className="flex-1 overflow-y-auto bg-qm-bg pb-28 pt-14 md:ml-[330px] md:mr-[280px] md:pb-20 md:pt-0">
        {children}
      </main>

      {/* Right panel — desktop only */}
      <div className="hidden md:block">
        <RightPanel />
      </div>

      {/* Audio player — mobile sits above bottom nav, desktop sits at very bottom */}
      <BottomAudioPlayer />
      <MobileBottomNav />
      <FontSettingsModal />
    </div>
  )
}
