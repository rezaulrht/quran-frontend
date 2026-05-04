'use client'

import { create } from 'zustand'

interface UIState {
  isSidebarOpen: boolean
  isSidebarSearchOpen: boolean
  isSettingsOpen: boolean
  isSearchModalOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setSidebarSearchOpen: (open: boolean) => void
  setSettingsOpen: (open: boolean) => void
  setSearchModalOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: false,
  isSidebarSearchOpen: false,
  isSettingsOpen: false,
  isSearchModalOpen: false,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setSidebarSearchOpen: (open) => set({ isSidebarSearchOpen: open }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  setSearchModalOpen: (open) => set({ isSearchModalOpen: open }),
}))
