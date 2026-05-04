import type { Metadata } from 'next'
import { Inter, Amiri, Scheherazade_New } from 'next/font/google'
import './globals.css'
import { MainLayout } from '@/components/layout/MainLayout'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

const scheherazade = Scheherazade_New({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-scheherazade',
})

export const metadata: Metadata = {
  title: 'Quran Web App',
  description: 'Read the Holy Quran online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} bg-qm-bg`}>
      <body className={`${inter.variable} font-sans bg-qm-bg text-qm-text min-h-screen`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
