'use client'

import { useEffect, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react'
import { useAudioStore } from '@/store/audioStore'
import { triggerAutoPlay, getGlobalAudio } from '@/hooks/useAudioPlayer'

export function BottomAudioPlayer() {
  const currentPlayingId = useAudioStore((s) => s.currentPlayingId)
  const isPlaying = useAudioStore((s) => s.isPlaying)
  const setPlaying = useAudioStore((s) => s.setPlaying)
  const currentSurahName = useAudioStore((s) => s.currentSurahName)
  const currentVerseNumber = useAudioStore((s) => s.currentVerseNumber)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = getGlobalAudio()
    if (!audio) return

    function onTimeUpdate() {
      const d = audio!.duration
      setCurrentTime(audio!.currentTime)
      setDuration(isFinite(d) ? d : 0)
      setProgress(isFinite(d) && d > 0 ? (audio!.currentTime / d) * 100 : 0)
    }
    function onDurationChange() {
      const d = audio!.duration
      setDuration(isFinite(d) ? d : 0)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
    }
  }, [currentPlayingId])

  function fmt(s: number): string {
    if (!isFinite(s) || s < 0) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  function handlePlayPause() {
    const audio = getGlobalAudio()
    if (!audio || currentPlayingId === null) return
    if (isPlaying) {
      audio.pause()
      setPlaying(currentPlayingId, false)
    } else {
      void audio.play().catch(() => setPlaying(null, false))
      setPlaying(currentPlayingId, true)
    }
  }

  function handlePrev() {
    if (currentPlayingId === null || currentPlayingId <= 1) return
    triggerAutoPlay(currentPlayingId - 1)
  }

  function handleNext() {
    if (currentPlayingId === null || currentPlayingId >= 6236) return
    triggerAutoPlay(currentPlayingId + 1)
  }

  function handleClose() {
    const audio = getGlobalAudio()
    if (audio) {
      audio.pause()
      audio.src = ''
      audio.load()
    }
    setPlaying(null, false)
  }

  if (currentPlayingId === null) return null

  return (
    <div className="fixed bottom-14 left-0 right-0 z-20 flex flex-col border-t border-qm-border bg-qm-surface md:bottom-0">
      {/* Progress bar */}
      <div className="h-0.5 w-full bg-qm-border2">
        <div
          className="h-full bg-qm-green transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-2 px-4 py-2">
        {/* Verse info — left */}
        <div className="hidden min-w-0 flex-col md:flex" style={{ width: '160px' }}>
          <span className="truncate text-xs font-medium text-qm-text">
            {currentSurahName || 'Loading...'} : {currentVerseNumber || '—'}
          </span>
          <span className="text-[11px] text-qm-text-muted">Al-Afasy</span>
        </div>

        <span className="w-10 text-xs text-qm-text-muted md:hidden">{fmt(currentTime)}</span>

        {/* Center controls */}
        <div className="flex flex-1 items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous verse"
            onClick={handlePrev}
            className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
          >
            <SkipBack size={20} />
          </button>

          <button
            type="button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={handlePlayPause}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-qm-green text-black transition-opacity hover:opacity-90"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            type="button"
            aria-label="Next verse"
            onClick={handleNext}
            className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Right side — duration on desktop, time on mobile */}
        <div className="hidden items-center gap-3 md:flex" style={{ width: '160px' }}>
          <span className="text-xs text-qm-text-muted">{fmt(currentTime)}</span>
          <span className="text-xs text-qm-text-faint">/</span>
          <span className="text-xs text-qm-text-muted">{fmt(duration)}</span>
        </div>

        <span className="w-10 text-right text-xs text-qm-text-muted md:hidden">{fmt(duration)}</span>

        <button
          type="button"
          aria-label="Close player"
          onClick={handleClose}
          className="flex h-11 w-11 items-center justify-center text-qm-text-faint transition-colors hover:text-qm-text"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
