'use client'

import { motion } from 'framer-motion'
import { PageContainer } from '@/components/page-container'
import Link from 'next/link'

export default function WikiPage() {

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          📚 Вики
        </motion.h1>

        <div className="grid gap-6">
          <Link href="/wiki/rules" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors relative"
            >
              <h2 className="text-2xl font-semibold mb-4">📜 Правила сервера</h2>
              <p className="text-muted-foreground mb-4">
                Основные правила и принципы поведения на сервере.
              </p>
            </motion.div>
          </Link>

          <Link href="/wiki/guide" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors relative"
            >
              <h2 className="text-2xl font-semibold mb-4">🗺️ Путеводитель</h2>
              <p className="text-muted-foreground mb-4">
                Гайд по каналам и возможностям сервера.
              </p>
            </motion.div>
          </Link>

          <Link href="/wiki/faq" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors relative"
            >
              <h2 className="text-2xl font-semibold mb-4">❓ FAQ</h2>
              <p className="text-muted-foreground mb-4">
                Часто задаваемые вопросы и ответы на них.
              </p>
            </motion.div>
          </Link>

          <Link href="/wiki/art" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors relative"
            >
              <h2 className="text-2xl font-semibold mb-4">🎨 Творчество участников</h2>
              <p className="text-muted-foreground mb-4">
                Галерея работ наших талантливых участников.
              </p>
            </motion.div>
          </Link>

          <Link href="/wiki/users" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors relative"
            >
              <h2 className="text-2xl font-semibold mb-4">👥 Участники сервера</h2>
              <p className="text-muted-foreground mb-4">
                Информация о ролях и активных участниках.
              </p>
            </motion.div>
          </Link>

          <Link href="/wiki/events" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors relative"
            >
              <h2 className="text-2xl font-semibold mb-4">🎉 События сервера</h2>
              <p className="text-muted-foreground mb-4">
                Информация о событиях и мероприятиях на сервере.
              </p>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </PageContainer>
  )
}
