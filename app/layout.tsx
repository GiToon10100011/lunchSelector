import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: '점심메뉴 추천기',
  description: '오늘 뭐 먹을지 고민될 때! 랜덤 메뉴 추천 앱',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['점심', '메뉴', '추천', '음식', 'PWA', '모바일 앱'],
  authors: [
    { name: 'Developer' }
  ],
  creator: 'Developer',
  metadataBase: new URL('https://lunch-recommender.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://lunch-recommender.vercel.app',
    title: '점심메뉴 추천기',
    description: '오늘 뭐 먹을지 고민될 때! 랜덤 메뉴 추천 앱',
    siteName: '점심메뉴 추천기',
    images: [
      {
        url: '/luncher-icon.png',
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '점심메뉴 추천기',
    description: '오늘 뭐 먹을지 고민될 때! 랜덤 메뉴 추천 앱',
    images: ['/luncher-icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#f97316',
    colorScheme: 'light',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        
        {/* PWA 설정 */}
        <link rel="apple-touch-icon" href="/luncher-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/luncher-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.svg" />
        
        {/* 모바일 웹앱 설정 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="점심추천" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>{children}</body>
    </html>
  )
}
