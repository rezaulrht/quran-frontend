'use client'

import { create } from 'zustand'

interface AudioState {
  currentPlayingId: number | null
  isPlaying: boolean
  setPlaying: (id: number | null, playing: boolean) => void
}

export const useAudioStore = create<AudioState>()((set) => ({
  currentPlayingId: null,
  isPlaying: false,
  setPlaying: (id, playing) => set({ currentPlayingId: id, isPlaying: playing }),
}))
