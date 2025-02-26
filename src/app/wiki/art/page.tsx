'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/page-container'
import Image from 'next/image'
import galleryData from '@/data/gallery.json'
import { Button } from '@/components/ui/button'
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ArtGalleryPage() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    if (currentTrack < galleryData.music.tracks.length - 1) {
      setCurrentTrack(currentTrack + 1)
    } else {
      setCurrentTrack(0)
    }
  }

  const prevTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1)
    } else {
      setCurrentTrack(galleryData.music.tracks.length - 1)
    }
  }

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Галерея работ
          </h1>
          <p className="text-muted-foreground mb-8">
            Творческие работы участников сервера Вишневые Аллеи
          </p>

          {/* Музыкальный плеер */}
          <div className="mb-8 p-4 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {galleryData.music.title}
            </h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={prevTrack}>
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={playPause}>
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={nextTrack}>
                <SkipForward className="h-6 w-6" />
              </Button>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {galleryData.music.tracks[currentTrack].title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {galleryData.music.tracks[currentTrack].artist}
                </p>
              </div>
            </div>
            <audio
              ref={audioRef}
              src={galleryData.music.tracks[currentTrack].url}
              onEnded={nextTrack}
              className="hidden"
            />
          </div>
        </motion.div>

        {/* Галерея работ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryData.categories[0].works.map((work) => (
            <motion.div
              key={work.id}
              variants={item}
              className="rounded-lg border bg-card overflow-hidden hover:bg-accent/50 transition-colors duration-200"
            >
              <div className="relative aspect-square">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {work.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Автор: {work.author}
                </p>
                {work.description && (
                  <p className="text-sm text-muted-foreground">
                    {work.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageContainer>
  )
}
