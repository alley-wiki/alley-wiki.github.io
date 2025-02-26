'use client'

import { motion } from "framer-motion"
import { PageContainer } from "@/components/page-container"

export default function GuidePage() {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          Путеводитель
        </h1>

        <div className="space-y-8">
          {/* Роли на сервере */}
          <section className="card p-6">
            <h2 className="text-2xl font-semibold mb-4">🎭 Роли на сервере</h2>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">👑 Администрация</h3>
                <p className="text-muted-foreground">
                  • Владелец сервера: @миса | владелец - Администратор и владелец сервера<br />
                  • Администратор: @кото-муж Сай💕 - Администратор и помощник по серверу<br />
                  • Модераторы: @Полиция Аллей [Модераторы] - Модерация сервера
                </p>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">✨ Особые роли</h3>
                <p className="text-muted-foreground">
                  • @Легенды фандома - Роль для ютуберов по контенку "Лололошки"<br />
                  • @Партнёр - Роль которую могут получить только владельцы партнёрских серверов<br />
                  • @Администрация МС - Администрация майнкрафт-сервера "Мемный Сад"<br />
                  • @Богатая вишенка💖 [Буст] - Прекрасные бустеры нашего сервера<br />
                  • @Известный мемодел - За создание 25 смешных мемов по серверу
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">🎨 Уровневые роли</h3>
                <p className="text-muted-foreground">
                  • @Мироходец [Участник] - При заходе на сервер<br />
                  • @Ранг [L] - 1 уровень активности<br />
                  • @Ранг [M] - 15 уровень активности<br />
                  • @Ранг [A] - 30 уровень активности<br />
                  • @Ранг [H] - 45 уровень активности<br />
                  • @Ранг [S] - 60 уровень активности<br />
                  • @Ранг [V] - 85 уровень активности<br />
                  • @Ранг [X] - 100 уровень активности
                </p>
              </div>
            </div>
          </section>

          {/* Команды ботов */}
          <section className="card p-6">
            <h2 className="text-2xl font-semibold mb-4">🤖 Команды ботов</h2>
            
            {/* Экономика */}
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">💰 Экономика</h3>
                <p className="text-muted-foreground">
                  • *balance - Проверить баланс<br />
                  • *daily - Получить ежедневную награду<br />
                  • *work - Заработать монеты<br />
                  • *shop - Открыть магазин<br />
                  • *inventory - Посмотреть инвентарь
                </p>
              </div>

              {/* Музыкальный бот */}
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">🎵 Музыка</h3>
                <p className="text-muted-foreground">
                  • +play - Включить трек<br />
                  • +skip - Пропустить трек<br />
                  • +leave - Покинуть канал<br />
                  • +pause - Приостановить трек<br />
                  • +resume - Возобновить воспроизведение<br />
                  • +queue - Посмотреть очередь<br />
                  • +volume - Изменить громкость
                </p>
              </div>

              {/* Утилиты */}
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">🛠️ Утилиты</h3>
                <p className="text-muted-foreground">
                  • #ранг - посмотреть ваш текущий уровень<br />
                  • #лидеры - список лидеров/активных людей<br />
                  • #аватар [@участник] - аватар участника<br />
                  • #эмоция ["эмоджи"] - картинка выбранного эмоджи
                </p>
              </div>

              {/* Развлечения */}
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">🎮 Развлечения</h3>
                <p className="text-muted-foreground">
                  • #hug [@участник] - обнять участника<br />
                  • #kiss [@участник] - поцеловать участника<br />
                  • #patpat [@участник] - погладить по голове<br />
                  • #кар [@участник] - клюнуть участника<br />
                  • #bonk [@участник] - бонкнуть/ударить<br />
                  • #nom [@участник] - съесть участника<br />
                  • #кусь [@участник] - укусить участника
                </p>
              </div>
            </div>
          </section>

          {/* Дополнительная информация */}
          <section className="card p-6">
            <h2 className="text-2xl font-semibold mb-4">📝 Дополнительная информация</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground">
                • Все команды начинаются со знака / или *<br />
                • Некоторые команды доступны только определенным ролям<br />
                • При использовании команд соблюдайте правила сервера<br />
                • Если у вас возникли вопросы, обратитесь к модераторам
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </PageContainer>
  )
}
