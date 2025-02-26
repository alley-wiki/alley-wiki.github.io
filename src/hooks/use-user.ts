import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  nickname: string
  role: 'user' | 'admin' | 'moderator'
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем сессию при загрузке
    checkUser()

    // Подписываемся на изменения авторизации
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session?.user?.id)
          .single()

        setUser(profile)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        setUser(profile)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  return { user, loading }
}
