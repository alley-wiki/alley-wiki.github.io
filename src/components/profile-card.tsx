'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'

interface ProfileCardProps {
  name: string
  role: string
  description: string
  imageUrl?: string
}

export function ProfileCard({ name, role, description, imageUrl }: ProfileCardProps) {
  return (
    <Card className="card cherry-decoration hover-lift">
      <div className="flex flex-col items-center space-y-4">
        {imageUrl && (
          <div className="relative h-32 w-32 overflow-hidden rounded-full cherry-float">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gradient">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        <p className="text-center text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}
