'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  arabicFont: string
  arabicFontSize: number
  translationFontSize: number
  setArabicFont: (font: string) => void
  setArabicFontSize: (size: number) => void
  setTranslationFontSize: (size: number) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      arabicFont: 'kfgq, serif',
      arabicFontSize: 30,
      translationFontSize: 17,
      setArabicFont: (font) => set({ arabicFont: font }),
      setArabicFontSize: (size) => set({ arabicFontSize: size }),
      setTranslationFontSize: (size) => set({ translationFontSize: size }),
    }),
    { name: 'qm-settings' },
  ),
)
