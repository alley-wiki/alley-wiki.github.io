'use client'

import { motion } from "framer-motion"
import { PageContainer } from "@/components/page-container"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function AboutPage() {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          О сервере
        </motion.h1>

        <motion.div 
          className="space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* О нас */}
          <motion.section className="card p-6" variants={item}>
            <h2 className="text-2xl font-semibold mb-4">💫 О нас</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground">
                Добро пожаловать на сервер Вишневые Аллеи! Мы - дружное сообщество, где каждый может найти 
                единомышленников, поделиться творчеством и просто хорошо провести время. Наш сервер создан 
                для объединения творческих людей и создания уютной атмосферы общения.
              </p>
            </div>
          </motion.section>

          {/* Наша команда */}
          <motion.section className="card p-6" variants={item}>
            <h2 className="text-2xl font-semibold mb-4">👥 Наша команда</h2>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">Администрация</h3>
                <p className="text-muted-foreground">
                  • @misayahar - Создатель и владелец сервера<br />
                  • @midori_ivory - Главный администратор
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">Модерация</h3>
                <p className="text-muted-foreground">
                  • @lyikon<br />
                  • @mr.cas<br />
                  • @terrence_dreamurr<br />
                  • @raznos41k<br />
                  • @sunshine0075
                </p>
              </div>
            </div>
          </motion.section>

          {/* Как присоединиться */}
          <motion.section className="card p-6" variants={item}>
            <h2 className="text-2xl font-semibold mb-4">🎮 Как присоединиться</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground">
                1. Нажмите на кнопку "Discord" на главной странице<br />
                2. Присоединитесь к серверу по приглашению<br />
                3. Прочитайте правила в канале #правила<br />
                4. Познакомьтесь с сообществом в #общий-чат
              </p>
            </div>
          </motion.section>

          {/* Контакты */}
          <motion.section className="card p-6" variants={item}>
            <h2 className="text-2xl font-semibold mb-4">❓ Есть вопросы?</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground">
                Мы всегда готовы помочь! Вы можете:<br />
                • Обратиться к модераторам в Discord<br />
                • Написать в личные сообщения администраторам
              </p>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
    </PageContainer>
  )
}
