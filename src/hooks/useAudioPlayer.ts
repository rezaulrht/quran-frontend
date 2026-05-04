'use client'

import { useState, useEffect } from 'react'
import { useAudioStore } from '@/store/audioStore'

let globalAudio: HTMLAudioElement | null = null

// Each AyahCard registers its onEnded here so auto-continued playback can
// fire the next verse's callback even when triggered outside React.
const endedCallbacks = new Map<number, () => void>()

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

function attachAndPlay(
  audio: HTMLAudioElement,
  primary: string,
  fallback: string,
  onEnded: () => void,
  onFinalError: () => void,
): void {
  audio.src = primary

  audio.addEventListener('ended', onEnded, { once: true })
  audio.addEventListener(
    'error',
    () => {
      audio.src = fallback
      audio.addEventListener('error', onFinalError, { once: true })
      audio.load()
      void audio.play().catch(onFinalError)
    },
    { once: true },
  )

  void audio.play().catch(onFinalError)
}

// Exported so AyahCard can trigger the next verse without needing a hook instance.
export function triggerAutoPlay(globalVerseNumber: number): void {
  const { setPlaying } = useAudioStore.getState()

  if (globalAudio) {
    globalAudio.pause()
    globalAudio.src = ''
  }

  void fetchAudioUrls(globalVerseNumber)
    .then(({ primary, fallback }) => {
      const audio = new Audio()
      globalAudio = audio
      setPlaying(globalVerseNumber, true)

      attachAndPlay(
        audio,
        primary,
        fallback,
        () => {
          setPlaying(globalVerseNumber, false)
          endedCallbacks.get(globalVerseNumber)?.()
        },
        () => {
          setPlaying(null, false)
          console.error(`Auto-play failed for verse ${globalVerseNumber}`)
        },
      )
    })
    .catch(() => {
      console.error(`Failed to fetch audio URL for verse ${globalVerseNumber}`)
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

    void (async () => {
      try {
        const { primary, fallback } = await fetchAudioUrls(globalVerseNumber)

        const audio = new Audio()
        globalAudio = audio
        setPlaying(globalVerseNumber, true)

        audio.addEventListener('canplay', () => setIsLoading(false), { once: true })

        attachAndPlay(
          audio,
          primary,
          fallback,
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
      } catch (err) {
        setIsLoading(false)
        setError('Failed to fetch audio URL')
        console.error('Audio URL fetch failed:', err)
      }
    })()
  }

  return { isPlaying: isThisPlaying, isLoading, error, toggle }
}
