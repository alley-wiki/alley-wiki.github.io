'use client'

import Link from "next/link"
import { PageContainer } from "@/components/page-container"

const features = [
  {
    title: "Вики",
    description: "Полезная информация о сервере, правила, FAQ и многое другое",
    href: "/wiki",
    icon: "📚",
  },
  {
    title: "О сервере",
    description: "Узнайте больше о нашем сообществе и его создателях",
    href: "/about",
    icon: "💫",
  },
  {
    title: "Discord",
    description: "Присоединяйтесь к нашему дискорд-серверу",
    href: "/discord",
    icon: "🎮",
  },
]

export default function HomePage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Вишневые Аллеи
        </h1>
        <p className="text-muted-foreground mb-8">
          Добро пожаловать на сайт сервера Вишневые Аллеи!
        </p>
      </div>
    </PageContainer>
  )
}