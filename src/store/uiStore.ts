'use client'

import { create } from 'zustand'

interface UIState {
  isSidebarOpen: boolean
  isSettingsOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setSettingsOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: false,
  isSettingsOpen: false,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
}))
