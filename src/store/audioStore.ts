'use client'

import { create } from 'zustand'

interface AudioState {
  currentPlayingId: number | null
  isPlaying: boolean
  currentSurahName: string
  currentVerseNumber: number
  setPlaying: (id: number | null, playing: boolean, surahName?: string, verseNumber?: number) => void
}

export const useAudioStore = create<AudioState>()((set) => ({
  currentPlayingId: null,
  isPlaying: false,
  currentSurahName: '',
  currentVerseNumber: 0,
  setPlaying: (id, playing, surahName, verseNumber) =>
    set({
      currentPlayingId: id,
      isPlaying: playing,
      ...(surahName !== undefined && { currentSurahName: surahName }),
      ...(verseNumber !== undefined && { currentVerseNumber: verseNumber }),
    }),
}))
