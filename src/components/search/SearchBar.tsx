'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Loader2 } from 'lucide-react'
import { searchAyahs } from '@/lib/api'
import type { SearchResult } from '@/types/quran'

interface SearchBarProps {
  onNavigate?: () => void
}

export function SearchBar({ onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  const runSearch = useCallback(async (q: string) => {
    setIsLoading(true)
    try {
      const data = await searchAyahs(q)
      setResults(data)
      setIsOpen(true)
    } catch {
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (query.length < 2) return
    timerRef.current = setTimeout(() => {
      void runSearch(query)
    }, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query, runSearch])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleQueryChange(value: string) {
    setQuery(value)
    if (value.length < 2) {
      setResults([])
      setIsOpen(false)
    }
  }

  function handleSelect(result: SearchResult) {
    router.push(`/surah/${result.surah_id}`)
    setIsOpen(false)
    setQuery('')
    onNavigate?.()
  }

  return (
    <div ref={containerRef} className="relative px-3 pb-3">
      <div className="flex items-center gap-2 rounded-md border border-qm-border2 bg-qm-surface2 px-3 py-2">
        {isLoading ? (
          <Loader2 size={14} className="shrink-0 animate-spin text-qm-text-faint" />
        ) : (
          <Search size={14} className="shrink-0 text-qm-text-faint" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search ayahs..."
          className="w-full bg-transparent text-sm text-qm-text placeholder-qm-text-faint outline-none"
        />
      </div>

      {isOpen && (
        <div className="absolute left-3 right-3 top-[calc(100%-4px)] z-50 max-h-[400px] overflow-y-auto rounded-lg border border-qm-border bg-qm-surface shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-qm-text-faint">No results found</p>
          ) : (
            results.map((r) => (
              <button
                key={`${r.surah_id}-${r.verse_number}`}
                type="button"
                onClick={() => handleSelect(r)}
                className="flex w-full flex-col gap-1 border-b border-qm-border px-4 py-3 text-left last:border-b-0 hover:bg-qm-surface2"
              >
                <span className="text-[12px] font-medium text-qm-green">
                  {r.surah_transliteration} · {r.verse_number}
                </span>
                <p
                  dir="rtl"
                  lang="ar"
                  className="truncate text-right font-arabic text-[14px] text-qm-arabic"
                >
                  {r.text}
                </p>
                <p className="line-clamp-2 text-[13px] leading-5 text-qm-text-muted">
                  {r.translation.length > 80
                    ? `${r.translation.slice(0, 80)}…`
                    : r.translation}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
