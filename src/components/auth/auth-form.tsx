'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'

export function AuthForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [nickname, setNickname] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await auth.login(nickname)
      window.location.reload()
    } catch (err: any) {
      setError(err.message)
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
