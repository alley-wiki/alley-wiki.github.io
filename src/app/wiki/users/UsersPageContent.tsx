'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Participant {
  name: string;
  slug: string;
  role: string;
  description: string;
}

interface UsersPageContentProps {
  participants: Participant[];
}

export default function UsersPageContent({ participants }: UsersPageContentProps) {
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            👥 Участники сервера
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Все участники сервера Вишневые Аллеи
          </motion.p>
        </div>

        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {participants.map((participant, index) => (
            <Link 
              href={`/wiki/users/${encodeURIComponent(participant.slug)}`} 
              key={participant.slug}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors relative"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{participant.name}</h3>
                  <p className="text-sm text-muted-foreground">{participant.role}</p>
                  <p className="text-muted-foreground line-clamp-2 mt-2">{participant.description}</p>
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
