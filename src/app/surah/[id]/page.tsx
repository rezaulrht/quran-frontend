interface SurahPageProps {
  params: Promise<{ id: string }>
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params

  return (
    <div className="p-8 text-qm-text">
      <h1 className="text-2xl font-semibold">Surah {id}</h1>
      <p className="mt-2 text-qm-text-muted">Ayahs will appear here in Phase 3.</p>
    </div>
  )
}
