'use client'

import { useState, useEffect } from 'react'
import { useAudioStore } from '@/store/audioStore'

let globalAudio: HTMLAudioElement | null = null

// Each AyahCard registers its onEnded here so auto-continued playback can
// fire the next verse's callback even when triggered outside React.
const endedCallbacks = new Map<number, () => void>()

function cdnUrl(globalVerseNumber: number, cdn: 'primary' | 'fallback'): string {
  if (cdn === 'primary') {
    const padded = String(globalVerseNumber).padStart(3, '0')
    return `https://verses.quran.com/Alafasy/mp3/${padded}.mp3`
  }
  return `https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/128/${globalVerseNumber}`
}

function createAudio(
  globalVerseNumber: number,
  onCanPlay: () => void,
  onEnded: () => void,
  onFinalError: () => void,
): HTMLAudioElement {
  const audio = new Audio(cdnUrl(globalVerseNumber, 'primary'))

  audio.addEventListener('canplay', onCanPlay, { once: true })
  audio.addEventListener('ended', onEnded, { once: true })
  audio.addEventListener(
    'error',
    () => {
      // Primary CDN failed — swap to fallback
      audio.src = cdnUrl(globalVerseNumber, 'fallback')
      audio.addEventListener('error', onFinalError, { once: true })
      audio.load()
      void audio.play().catch(onFinalError)
    },
    { once: true },
  )

  return audio
}

// Exported so AyahCard can trigger the next verse without needing a hook instance.
export function triggerAutoPlay(globalVerseNumber: number): void {
  const { setPlaying } = useAudioStore.getState()

  if (globalAudio) {
    globalAudio.pause()
    globalAudio.src = ''
  }

  const audio = createAudio(
    globalVerseNumber,
    () => {},
    () => {
      setPlaying(globalVerseNumber, false)
      endedCallbacks.get(globalVerseNumber)?.()
    },
    () => {
      setPlaying(null, false)
      console.error(`Auto-play failed for verse ${globalVerseNumber}`)
    },
  )

  globalAudio = audio
  setPlaying(globalVerseNumber, true)
  void audio.play().catch(() => setPlaying(null, false))
}

interface UseAudioPlayerReturn {
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  toggle: () => void
}

export function useAudioPlayer(
  globalVerseNumber: number,
  onEnded?: () => void,
): UseAudioPlayerReturn {
  const currentPlayingId = useAudioStore((s) => s.currentPlayingId)
  const storeIsPlaying = useAudioStore((s) => s.isPlaying)
  const setPlaying = useAudioStore((s) => s.setPlaying)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isThisPlaying = currentPlayingId === globalVerseNumber && storeIsPlaying

  // Keep the Map current so triggerAutoPlay can fire the right callback.
  useEffect(() => {
    if (onEnded) {
      endedCallbacks.set(globalVerseNumber, onEnded)
    } else {
      endedCallbacks.delete(globalVerseNumber)
    }
    return () => {
      endedCallbacks.delete(globalVerseNumber)
    }
  }, [globalVerseNumber, onEnded])

  useEffect(() => {
    if (!isThisPlaying) setIsLoading(false)
  }, [isThisPlaying])

  function toggle() {
    if (isThisPlaying) {
      globalAudio?.pause()
      setPlaying(globalVerseNumber, false)
      return
    }

    if (globalAudio) {
      globalAudio.pause()
      globalAudio.src = ''
    }

    setError(null)
    setIsLoading(true)

    const audio = createAudio(
      globalVerseNumber,
      () => setIsLoading(false),
      () => {
        setPlaying(globalVerseNumber, false)
        endedCallbacks.get(globalVerseNumber)?.()
      },
      () => {
        setIsLoading(false)
        setError('Failed to load audio')
        setPlaying(null, false)
        console.error(`Audio failed for verse ${globalVerseNumber}`)
      },
    )

    globalAudio = audio
    setPlaying(globalVerseNumber, true)
    void audio.play().catch((err: unknown) => {
      setIsLoading(false)
      setError('Playback failed')
      setPlaying(null, false)
      console.error('Audio play failed:', err)
    })
  }

  return { isPlaying: isThisPlaying, isLoading, error, toggle }
}
