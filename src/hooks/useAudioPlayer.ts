'use client'

import { useState, useEffect } from 'react'
import { useAudioStore } from '@/store/audioStore'

let globalAudio: HTMLAudioElement | null = null

interface UseAudioPlayerReturn {
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  toggle: () => void
}

export function useAudioPlayer(globalVerseNumber: number): UseAudioPlayerReturn {
  const currentPlayingId = useAudioStore((s) => s.currentPlayingId)
  const storeIsPlaying = useAudioStore((s) => s.isPlaying)
  const setPlaying = useAudioStore((s) => s.setPlaying)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isThisPlaying = currentPlayingId === globalVerseNumber && storeIsPlaying

  useEffect(() => {
    if (!isThisPlaying) {
      setIsLoading(false)
    }
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

    const audio = new Audio(
      `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalVerseNumber}.mp3`,
    )
    globalAudio = audio

    audio.addEventListener(
      'canplay',
      () => {
        setIsLoading(false)
      },
      { once: true },
    )

    audio.addEventListener(
      'ended',
      () => {
        setPlaying(globalVerseNumber, false)
      },
      { once: true },
    )

    audio.addEventListener(
      'error',
      () => {
        setIsLoading(false)
        setError('Failed to load audio')
        setPlaying(null, false)
        console.error(`Audio error for verse ${globalVerseNumber}`)
      },
      { once: true },
    )

    setPlaying(globalVerseNumber, true)
    audio.play().catch((err: unknown) => {
      setIsLoading(false)
      setError('Playback failed')
      setPlaying(null, false)
      console.error('Audio play failed:', err)
    })
  }

  return { isPlaying: isThisPlaying, isLoading, error, toggle }
}
