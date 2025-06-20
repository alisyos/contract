import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartContract Generator - AI 기반 계약서 자동생성',
  description: 'AI를 활용하여 빠르고 정확한 계약서를 자동으로 생성하는 웹서비스',
  keywords: '계약서, AI, 자동생성, 스마트컨트랙트, 법무',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-primary-600">
                    SmartContract Generator
                  </h1>
                </div>
                <div className="text-sm text-gray-600">
                  AI 기반 계약서 자동생성 시스템
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 