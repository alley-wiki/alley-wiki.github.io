'use client'

import { motion } from 'framer-motion'
import { PageContainer } from '@/components/page-container'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const faqs = [
  {
    question: "Почему я не могу отправлять картинки в чат?",
    answer: "Для отправки картинок в общий чат необходим минимум ранг М. Однако, вы можете отправлять картинки и гифки в каналах #галерея и #мемы даже без ранга М."
  },
  {
    question: "Как получить ранг М?",
    answer: "Ранг М можно получить, будучи активным участником сервера. Общайтесь, участвуйте в обсуждениях и мероприятиях. Вам бот Лиса даст ранг М если вы наберете 15 уровень."
  },
  {
    question: "Где можно посмотреть правила сервера?",
    answer: "Правила сервера доступны в разделе #инфо на сервере Discord, а также в соответствующем разделе нашей вики."
  },
  {
    question: "Как стать модератором?",
    answer: "Набор модераторов происходит по мере необходимости. Администрация сама выбирает кандидатов из активных и ответственных участников сервера с хорошей репутацией которые написали заявку на модерацию сервера."
  },
  {
    question: "Что делать, если я обнаружил нарушение правил?",
    answer: "Если вы заметили нарушение правил, сообщите об этом модераторам или администраторам сервера через пинг. Например: @Полиция Аллей [Модераторы] или же @вафф | владелец."
  }
]

export default function FAQPage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </h1>
          <p className="text-muted-foreground">
            Ответы на популярные вопросы в сервере Вишневые Аллеи
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={item}
              className="rounded-lg border bg-card p-6 hover:bg-accent/50 transition-colors duration-200"
            >
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {faq.question}
              </h3>
              <p className="text-muted-foreground">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageContainer>
  )
}
