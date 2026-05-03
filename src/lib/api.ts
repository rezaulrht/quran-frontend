import type { Surah, SurahWithVerses, SearchResult } from '@/types/quran'

const API_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:5000'

export async function getAllSurahs(): Promise<Surah[]> {
  const res = await fetch(`${API_URL}/api/surahs`)
  if (!res.ok) throw new Error(`getAllSurahs failed: ${res.status}`)
  return res.json() as Promise<Surah[]>
}

export async function getSurah(id: number): Promise<SurahWithVerses> {
  const res = await fetch(`${API_URL}/api/surah/${id}`)
  if (!res.ok) throw new Error(`getSurah failed: ${res.status}`)
  return res.json() as Promise<SurahWithVerses>
}

export async function searchAyahs(query: string): Promise<SearchResult[]> {
  const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error(`searchAyahs failed: ${res.status}`)
  return res.json() as Promise<SearchResult[]>
}
