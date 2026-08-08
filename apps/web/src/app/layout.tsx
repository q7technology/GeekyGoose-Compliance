import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutShell from '../components/LayoutShell'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'GeekyGoose Compliance',
  description: 'Compliance automation platform for SMB + internal IT teams',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-50 text-gray-800 font-sans">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
