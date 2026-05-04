'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { searchAyahs } from '@/lib/api'
import type { SearchResult } from '@/types/quran'

export function SearchModal() {
  const isOpen = useUIStore((s) => s.isSearchModalOpen)
  const setSearchModalOpen = useUIStore((s) => s.setSearchModalOpen)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  const runSearch = useCallback(async (q: string) => {
    setIsLoading(true)
    setHasSearched(true)
    const data = await searchAyahs(q)
    setResults(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (query.length < 2) {
      setResults([])
      setHasSearched(false)
      return
    }
    timerRef.current = setTimeout(() => {
      void runSearch(query)
    }, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query, runSearch])

  // Focus input when modal opens; reset state when it closes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults([])
      setHasSearched(false)
    }
  }, [isOpen])

  // Ctrl+K and Escape keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchModalOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [setSearchModalOpen])

  function handleSelect(result: SearchResult) {
    router.push(`/surah/${result.surah_id}`)
    setSearchModalOpen(false)
  }

  function handleQueryChange(value: string) {
    setQuery(value)
    if (value.length < 2) {
      setResults([])
      setHasSearched(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-16 backdrop-blur-sm"
      onClick={() => setSearchModalOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-qm-border bg-qm-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 border-b border-qm-border px-4 py-3">
          {isLoading ? (
            <Loader2 size={18} className="shrink-0 animate-spin text-qm-text-faint" />
          ) : (
            <Search size={18} className="shrink-0 text-qm-text-faint" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search ayahs..."
            className="flex-1 bg-transparent text-base text-qm-text placeholder-qm-text-faint outline-none"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden rounded border border-qm-border2 px-1.5 py-0.5 text-[11px] text-qm-text-faint md:block">
              ESC
            </kbd>
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setSearchModalOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded text-qm-text-faint transition-colors hover:text-qm-text"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!hasSearched && query.length < 2 && (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-qm-text-faint">
              <Search size={16} />
              <span>Type at least 2 characters to search</span>
            </div>
          )}

          {hasSearched && !isLoading && results.length === 0 && (
            <p className="py-10 text-center text-sm text-qm-text-faint">No results found</p>
          )}

          {results.map((r) => (
            <button
              key={`${r.surah_id}-${r.verse_number}`}
              type="button"
              onClick={() => handleSelect(r)}
              className="flex w-full flex-col gap-1.5 border-b border-qm-border px-4 py-3 text-left last:border-b-0 hover:bg-qm-surface2"
            >
              <span className="text-[12px] font-semibold text-qm-green">
                {r.surah_transliteration} {r.surah_id}:{r.verse_number}
              </span>
              <p
                dir="rtl"
                lang="ar"
                className="w-full truncate text-right font-calligraphy text-[18px] leading-snug text-qm-arabic"
              >
                {r.text}
              </p>
              <p className="text-[13px] leading-5 text-qm-text-muted">
                {r.translation.length > 80
                  ? `${r.translation.slice(0, 80)}…`
                  : r.translation}
              </p>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
          <div className="border-t border-qm-border px-4 py-2">
            <span className="text-[11px] text-qm-text-faint">
              {results.length} result{results.length !== 1 ? 's' : ''} — click to navigate
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
