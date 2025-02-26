import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header'
import { Toaster } from '@/components/toaster'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Вишневые Аллеи',
  description: 'Вики-сайт сервера Вишневые Аллеи',
  keywords: ['Вишневые Аллеи', 'Cherru', 'MrLololoshka', 'Discord', 'Wiki'],
  icons: {
    icon: '/logo/logo.png',
    rel: 'icon',
    type: 'image/png',
    sizes: 'any',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <title>Вишневые Аллеи</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo/logo.png" />
        <link rel="shortcut icon" href="/logo/logo.png" type="image/png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
