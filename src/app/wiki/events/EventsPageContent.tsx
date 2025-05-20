"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface EventForList {
  title: string;
  slug: string;
  description: string;
}

interface EventsPageContentProps {
  events: EventForList[];
}

export default function EventsPageContent({ events }: EventsPageContentProps) {
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Заголовок + подзаголовок */}
        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🎉 События сервера
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Все события на сервере Вишневые Аллеи
          </motion.p>
        </div>

        {/* Сетка карточек */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {events.map((event, index) => (
            <Link
              href={`/wiki/events/${encodeURIComponent(event.slug)}`}
              key={event.slug}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm 
                           hover:bg-accent/50 transition-colors relative"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold 
                                 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 mt-2">
                    {event.description}
                  </p>
                  <div className="mt-4 text-sm text-rose-500 group-hover:underline">
                    Подробнее →
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
