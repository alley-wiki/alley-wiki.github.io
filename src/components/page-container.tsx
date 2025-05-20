'use client'

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className={cn("container px-4 py-16 sm:px-6 lg:px-8", className)} {...props}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
