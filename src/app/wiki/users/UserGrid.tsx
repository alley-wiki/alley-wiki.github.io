'use client';

import { motion } from "framer-motion";
import Link from "next/link";

interface UserInfo {
  name: string;
  role?: string;
  description?: string;
  slug: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function UserGrid({ users }: { users: UserInfo[] }) {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {users.map((user) => (
        <motion.div key={user.slug} variants={item}>
          <Link 
            href={`/wiki/users/${encodeURIComponent(user.slug)}`}
            className="block p-4 sm:p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors duration-200"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {user.name}
            </h2>
            {user.role && (
              <p className="text-sm text-muted-foreground mb-2 sm:mb-3">
                {user.role}
              </p>
            )}
            {user.description && (
              <p className="text-sm text-foreground/80 line-clamp-2">
                {user.description}
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
