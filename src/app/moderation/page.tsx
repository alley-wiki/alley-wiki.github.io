'use client'

import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default function ModerationPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-gradient mb-8">Панель модерации</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Управление пользователями</h2>
          <Button className="w-full hover-lift">Просмотреть всех пользователей</Button>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Управление контентом</h2>
          <Button className="w-full hover-lift">Проверить новые правки</Button>
        </div>
      </div>
    </div>
  )
}
