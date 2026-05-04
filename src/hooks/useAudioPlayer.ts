'use client'

import { useState, useEffect } from 'react'
import { useAudioStore } from '@/store/audioStore'

// Single global audio instance shared across ALL ayah cards
const globalAudio = typeof window !== 'undefined' ? new Audio() : null

// Which verse is currently loaded into globalAudio
let currentLoadedVerse: number | null = null

// Increment on each new play attempt so stale fetch results are discarded
let playGeneration = 0

// AyahCards register their auto-continue callbacks here
const endedCallbacks = new Map<number, () => void>()

// ONE 'ended' listener on the singleton — never added again
globalAudio?.addEventListener('ended', () => {
  const { setPlaying } = useAudioStore.getState()
  if (currentLoadedVerse !== null) {
    setPlaying(currentLoadedVerse, false)
    endedCallbacks.get(currentLoadedVerse)?.()
    currentLoadedVerse = null
  }
})

interface AlQuranAyahResponse {
  data: {
    audio: string
    audioSecondary: string[]
  }
}

async function fetchAudioUrls(
  globalVerseNumber: number,
): Promise<{ primary: string; fallback: string }> {
  const res = await fetch(
    `https://api.alquran.cloud/v1/ayah/${globalVerseNumber}/ar.alafasy`,
  )
  if (!res.ok) throw new Error(`AlQuran API error: ${res.status}`)
  const json = (await res.json()) as AlQuranAyahResponse
  const primary = json.data.audioSecondary[0] ?? json.data.audio
  return { primary, fallback: json.data.audio }
}

// Exported so MobileAudioPlayer can attach timeupdate/durationchange listeners.
export function getGlobalAudio(): HTMLAudioElement | null {
  return globalAudio
}

// Exported so AyahCard can trigger the next verse without a hook instance.
export function triggerAutoPlay(globalVerseNumber: number): void {
  const audio = globalAudio
  if (!audio) return

  const { setPlaying } = useAudioStore.getState()

  audio.pause()
  audio.src = ''
  audio.load()
  playGeneration++
  const myGen = playGeneration

  void fetchAudioUrls(globalVerseNumber)
    .then(({ primary, fallback }) => {
      if (myGen !== playGeneration) return

      currentLoadedVerse = globalVerseNumber
      setPlaying(globalVerseNumber, true)
      audio.src = primary

      audio.addEventListener(
        'error',
        () => {
          audio.src = fallback
          audio.load()
          void audio.play().catch(() => setPlaying(null, false))
        },
        { once: true },
      )

      audio.load()
      void audio.play().catch(() => setPlaying(null, false))
    })
    .catch(() => {
      console.error(`Failed to fetch audio for verse ${globalVerseNumber}`)
    })
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

  // Keep Map current so the singleton's ended listener fires the right callback.
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

  function toggle() {
    const audio = globalAudio
    if (!audio) return

    if (isThisPlaying) {
      audio.pause()
      setPlaying(globalVerseNumber, false)
      return
    }

    audio.pause()
    audio.src = ''
    audio.load()

    setError(null)
    setIsLoading(true)
    playGeneration++
    const myGen = playGeneration

    void (async () => {
      try {
        const { primary, fallback } = await fetchAudioUrls(globalVerseNumber)

        if (myGen !== playGeneration) return

        currentLoadedVerse = globalVerseNumber
        setPlaying(globalVerseNumber, true)
        audio.src = primary

        audio.addEventListener('canplay', () => setIsLoading(false), { once: true })

        audio.addEventListener(
          'error',
          () => {
            audio.src = fallback
            audio.load()
            void audio.play().catch(() => {
              setIsLoading(false)
              setError('Failed to load audio')
              setPlaying(null, false)
            })
          },
          { once: true },
        )

        audio.load()
        void audio.play().catch((err: unknown) => {
          setIsLoading(false)
          setError('Playback failed')
          setPlaying(null, false)
          console.error('Audio play failed:', err)
        })
      } catch (err) {
        setIsLoading(false)
        setError('Failed to fetch audio URL')
        console.error('Audio URL fetch failed:', err)
      }
    })()
  }

  return { isPlaying: isThisPlaying, isLoading: isLoading && isThisPlaying, error, toggle }
}
