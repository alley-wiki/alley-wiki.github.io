'use client';

import { motion } from 'framer-motion';

interface UserPageContentProps {
  name: string;
  htmlContent: string;
  role?: string;
}

export default function UserPageContent({ name, role, htmlContent }: UserPageContentProps) {
  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <motion.div
        className="bg-card rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <div className="mb-8">
            <motion.h1
              className="text-3xl font-bold mb-2 text-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {name}
            </motion.h1>
            {role && (
              <motion.h2
                className="text-xl text-muted-foreground mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {role}
              </motion.h2>
            )}
          </div>
          <motion.div
            className="prose prose-neutral dark:prose-invert max-w-none [&>*:first-child]:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </motion.div>
    </div>
  );
}
