'use client'

import { PageContainer } from '@/components/page-container'

export default function RulesPage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Правила сервера
        </h1>
        <p className="text-muted-foreground mb-8">
          Основные правила и рекомендации для участников сервера Вишневые Аллеи
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Общие правила</h2>
            <div className="space-y-4">
              <p>
                1. Уважайте других участников сервера.
              </p>
              <p>
                2. Запрещено использование нецензурной лексики.
              </p>
              <p>
                3. Запрещен спам и флуд в каналах.
              </p>
              <p>
                4. Запрещена реклама без согласования с администраторами.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Правила общения</h2>
            <div className="space-y-4">
              <p>
                1. Общайтесь в соответствующих каналах.
              </p>
              <p>
                2. Не провоцируйте конфликты.
              </p>
              <p>
                3. Не отправляйте личные сообщения без согласия.
              </p>
              <p>
                4. Уважайте мнение других участников.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Контент</h2>
            <div className="space-y-4">
              <p>
                1. Публикуйте контент только в соответствующих каналах.
              </p>
              <p>
                2. Запрещен контент 18+.
              </p>
              <p>
                3. Запрещен шок-контент.
              </p>
              <p>
                4. Уважайте авторские права.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Наказания</h2>
            <div className="space-y-4">
              <p>
                1. Предупреждение.
              </p>
              <p>
                2. Временный мут.
              </p>
              <p>
                3. Временный бан.
              </p>
              <p>
                4. Перманентный бан.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Дополнительно</h2>
            <div className="space-y-4">
              <p>
                • Администраторы оставляют за собой право изменять правила.
              </p>
              <p>
                • В спорных ситуациях решение принимает администратор.
              </p>
              <p>
                • Незнание правил не освобождает от ответственности.
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  )
}
