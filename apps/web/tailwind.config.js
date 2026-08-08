/** @type {import('tailwindcss').Config} */

// Q7Technology dark brand theme.
// The stock Tailwind palette is remapped centrally so the existing utility
// classes used across the app render the dark theme without per-page edits.
//   - `gray` is inverted: low steps are dark surfaces, high steps are light text.
//   - `blue` is centered on the brand accent #29ABE2; steps above 600 get
//     LIGHTER (not darker) so "darker text" usages stay readable on dark tints.
//   - Status hues (green/red/yellow/amber/purple/orange/indigo) keep their hue
//     but 50-300 become dark tints (badge backgrounds/borders) and 500-900
//     become progressively lighter (button fills, hover states, badge text).
//   - `surface` (#1A1E26) is the elevated card color; `bg-white` occurrences in
//     src were mechanically rewritten to `bg-surface`. `white` itself is left
//     untouched so `text-white` on accent buttons stays white per brand spec.
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        // Elevated panel color (replaces the old bg-white cards)
        surface: {
          DEFAULT: '#1A1E26',
          hover: '#20242E',
        },
        // Brand secondary accents
        mint: '#64FFDA',
        gold: '#F7941D',

        // Inverted neutral scale: 50 = page background, 900 = brightest text
        gray: {
          50: '#0D1117',
          100: '#20242E',
          200: '#232B3A',
          300: '#2E3850',
          400: '#5A6785',
          500: '#8892B0',
          600: '#98A5C5',
          700: '#B4C0DC',
          800: '#CCD6F6',
          900: '#E6ECFF',
        },
        // Primary accent scale centered on #29ABE2; >600 becomes lighter
        blue: {
          50: '#0F2233',
          100: '#123049',
          200: '#17415F',
          300: '#1E5D85',
          400: '#2489C0',
          500: '#29ABE2',
          600: '#29ABE2',
          700: '#4DBDEC',
          800: '#7ECFF2',
          900: '#B0E2F8',
        },
        // Success (used: 50,100,200,300,500,600,700,800,900)
        green: {
          50: '#0A2A1B',
          100: '#0C2B1E',
          200: '#14432E',
          300: '#1E5C40',
          400: '#0E9F6E',
          500: '#12B886',
          600: '#10B981',
          700: '#34D399',
          800: '#6EE7A8',
          900: '#A7F3D0',
        },
        // Danger (used: 50,100,200,300,500,600,700,800)
        red: {
          50: '#2A1215',
          100: '#3A151A',
          200: '#552028',
          300: '#7F2D38',
          400: '#DC3D43',
          500: '#EF4444',
          600: '#E5484D',
          700: '#F87171',
          800: '#FCA5A5',
          900: '#FECACA',
        },
        // Warning (used: 50,100,200,300,400,500,600,700,800)
        yellow: {
          50: '#2A2310',
          100: '#332A12',
          200: '#4D3F1B',
          300: '#6B5822',
          400: '#FBBF24',
          500: '#EAB308',
          600: '#D69E0B',
          700: '#FACC15',
          800: '#FDE68A',
          900: '#FEF3C7',
        },
        // Warm brand gold (used: 50,100,200,300,400,500,600)
        amber: {
          50: '#2A1F10',
          100: '#33260F',
          200: '#4D3915',
          300: '#6B4E1C',
          400: '#F7A733',
          500: '#F7941D',
          600: '#F9A63C',
          700: '#FBBF6B',
          800: '#FDD79A',
          900: '#FEEBC8',
        },
        // Accent purple (used: 50,100,200,300,500,600,700,800,900)
        purple: {
          50: '#1E1433',
          100: '#281B44',
          200: '#3B2A61',
          300: '#503A80',
          400: '#7C5CDB',
          500: '#9061F9',
          600: '#8B5CF6',
          700: '#A78BFA',
          800: '#C4B5FD',
          900: '#DDD6FE',
        },
        // Orange (used: 50,100,200,500,600,700,800,900)
        orange: {
          50: '#2A1810',
          100: '#331D11',
          200: '#4D2C18',
          300: '#6B3D20',
          400: '#F0740E',
          500: '#F97316',
          600: '#EA630C',
          700: '#FB923C',
          800: '#FDBA74',
          900: '#FED7AA',
        },
        // Indigo (used: 50,100,600,700)
        indigo: {
          50: '#131A33',
          100: '#1B2547',
          200: '#28345F',
          500: '#6366F1',
          600: '#6366F1',
          700: '#818CF8',
          800: '#A5B4FC',
        },
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        md: '0.5rem',
      },
    },
  },
  plugins: [],
}
