'use client'

import { ModeToggle } from './mode-toggle'
import { MainNav } from './nav/main-nav'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center flex-1">
          <Link href="/" className="mr-4 flex items-center space-x-2">
            <span className="font-bold text-sm sm:text-base">Вишневые Аллеи</span>
          </Link>
          <MainNav />
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
