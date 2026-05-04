'use client'

import { Play, Pause, Loader2 } from 'lucide-react'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

interface AudioButtonProps {
  globalVerseNumber: number
  onEnded?: () => void
}

export function AudioButton({ globalVerseNumber, onEnded }: AudioButtonProps) {
  const { isPlaying, isLoading, toggle } = useAudioPlayer(globalVerseNumber, onEnded)

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-green"
      aria-label={isPlaying ? `Pause ayah ${globalVerseNumber}` : `Play ayah ${globalVerseNumber}`}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin text-qm-text-faint" />
      ) : isPlaying ? (
        <Pause size={18} className="text-qm-green" />
      ) : (
        <Play size={18} />
      )}
    </button>
  )
}
