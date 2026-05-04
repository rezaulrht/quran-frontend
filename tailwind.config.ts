import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        qm: {
          bg:           '#1a1a1a',
          surface:      '#1f1f1f',
          surface2:     '#2a2a2a',
          border:       '#2a2a2a',
          border2:      '#374151',
          arabic:       '#428038',
          text:         '#c4c4c4',
          'text-muted': '#787d7a',
          'text-faint': '#6b7280',
          green:        '#4ade80',
          'green-btn':  '#22c55e',
          'green-dark': '#2d4a2d',
          badge:        '#374151',
        },
      },
      fontFamily: {
        arabic: ['kfgq', 'Scheherazade New', 'Amiri', 'serif'],
        amiri:  ['var(--font-amiri)', 'Amiri', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'ayah-ref':   ['16px', { lineHeight: '26px' }],
        'surah-name': ['15px', { lineHeight: '24px' }],
        'surah-mean': ['13px', { lineHeight: '21px' }],
        saheeh:       ['13px', { lineHeight: '21px' }],
        translation:  ['17px', { lineHeight: '28px' }],
      },
    },
  },
}

export default config
