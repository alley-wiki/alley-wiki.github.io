'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'

interface AuthFormProps {
  onSubmit: (nickname: string) => Promise<void>
  type: 'login'
}

export function AuthForm({ onSubmit, type }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nickname, setNickname] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSubmit(nickname)
      window.location.reload()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Произошла ошибка')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Вход в систему
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ваш никнейм"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 border rounded bg-background"
          required
        />

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <Button
          type="submit"
          className="w-full hover-lift"
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Продолжить'}
        </Button>
      </form>
    </div>
  )
}
