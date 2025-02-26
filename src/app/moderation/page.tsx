'use client'

import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/page-container'

export default function ModerationPage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Модерация</h1>
        <p className="text-muted-foreground mb-8">
          Информация о модерации сервера Вишневые Аллеи
        </p>
      </div>
    </PageContainer>
  )
}
