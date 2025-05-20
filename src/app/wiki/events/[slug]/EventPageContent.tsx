"use client";

import { motion } from "framer-motion";

interface EventPageContentProps {
  title: string;
  htmlContent: string;
}

export default function EventPageContent({ title, htmlContent }: EventPageContentProps) {
  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <motion.div
        className="bg-card rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          {/* Заголовок события — обычный цвет */}
          <motion.h1
            className="text-3xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {title}
          </motion.h1>

          {/* Вся остальная вики-разметка, включая инфобокс */}
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
