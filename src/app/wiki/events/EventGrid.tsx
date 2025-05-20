'use client';

import { motion } from "framer-motion";
import Link from "next/link";

interface EventInfo {
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  slug: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function EventGrid({ events }: { events: EventInfo[] }) {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {events.map((event) => (
        <motion.div key={event.slug} variants={item}>
          <Link 
            href={`/wiki/events/${event.slug}`}
            className="block p-4 sm:p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors duration-200"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {event.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              {event.startDate} — {event.endDate}
            </p>
            {event.description && (
              <p className="text-sm text-foreground/80 line-clamp-2">
                {event.description}
              </p>
            )}
            <div className="mt-3 sm:mt-4 text-sm text-pink-500 hover:text-purple-500 transition-colors duration-200">
              Подробнее →
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
