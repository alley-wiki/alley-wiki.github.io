import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header'
import { Toaster } from '@/components/toaster'
import ErrorHandlerClient from '@/components/error-handler-client'
import ErrorFallback from './error-fallback'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Вишневые Аллеи',
  description: 'Вики-сайт сервера Вишневые Аллеи',
  keywords: ['Вишневые Аллеи', 'Cherru', 'MrLololoshka', 'Discord', 'Wiki'],
  icons: {
    icon: {
      url: '/logo/logo.png',
      type: 'image/png',
      sizes: 'any',
    },
    // Вы можете добавить и другие иконки, если необходимо, например:
    // apple: '/logo/apple-touch-logo.png',
    // shortcut: '/logo/favicon.ico',
  },
}

export const dynamic = 'force-static';
export const dynamicParams = false;

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
        <script dangerouslySetInnerHTML={{ __html: `
          window.onerror = function(msg) {
            if (String(msg).includes('Connection closed')) {
              console.log('Перезагрузка из-за ошибки Connection closed');
              
              // Обработка URL для предотвращения ошибок с не-ASCII символами
              try {
                const url = new URL(window.location.href);
                let needsUpdate = false;
                
                url.searchParams.forEach((value, key) => {
                  try {
                    const decodedValue = decodeURIComponent(decodeURIComponent(value));
                    const encodedValue = encodeURIComponent(decodedValue);
                    
                    if (value !== encodedValue) {
                      url.searchParams.set(key, encodedValue);
                      needsUpdate = true;
                    }
                  } catch (e) {
                    // Если декодирование не удалось, просто пропускаем
                  }
                });
                
                if (needsUpdate) {
                  window.location.href = url.toString();
                } else {
                  window.location.reload();
                }
              } catch (e) {
                // В случае ошибки просто перезагружаем страницу
                window.location.reload();
              }
            }
          };
        `}} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
          <ErrorHandlerClient />
          <ErrorFallback />
        </ThemeProvider>
      </body>
    </html>
  )
}
