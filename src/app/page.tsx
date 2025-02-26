'use client'

import { motion } from "framer-motion"
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
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          Вишневые Аллеи Вики
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Добро пожаловать в нашу базу знаний! Здесь вы найдете всю необходимую информацию о сервере.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-background/80 to-background p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative z-10">
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-2xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-4 text-muted-foreground">
                {feature.description}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}