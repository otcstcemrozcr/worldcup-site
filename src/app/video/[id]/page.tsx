'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Video = {
  id: string
  title: string
  youtube_url: string
  description: string
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

export default function VideoDetay({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null)
  const [related, setRelated] = useState<Video[]>([])

  useEffect(() => {
    supabase.from('videos').select('*').eq('id', params.id).single()
      .then(({ data }) => setVideo(data))

    supabase.from('videos').select('*').neq('id', params.id).limit(4)
      .then(({ data }) => setRelated(data || []))
  }, [params.id])

  if (!video) {
    return (
      <main className="min-h-screen bg-pitch-950 flex items-center justify-center">
        <p className="text-white">Yükleniyor...</p>
      </main>
    )
  }

  const videoId = getYouTubeId(video.youtube_url)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`

  return (
    <main className="min-h-screen bg-pitch-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          ← Ana Sayfaya Dön
        </Link>

        <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl mb-8">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        <div className="mb-12">
          <h1 className="font-outfit font-black text-2xl sm:text-3xl text-white mb-3">{video.title}</h1>
          <div className="h-px bg-gradient-to-r from-[#00E87A]/40 via-[#00E87A]/10 to-transparent my-4" />
          {video.description && <p className="text-slate-400 leading-relaxed">{video.description}</p>}
        </div>

        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full bg-neon-gradient"></div>
              <h2 className="font-outfit font-bold text-xl text-white">Diğer Videolar</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(v => {
                const vid = getYouTubeId(v.youtube_url)
                const thumb = vid ? `https://img.youtube.com/vi/${vid}/maxresdefault.jpg` : ''
                return (
                  <Link key={v.id} href={`/video/${v.id}`} className="group card-hover">
                    <div className="bg-pitch-800 border border-white/5 rounded-xl overflow-hidden hover:border-[#00E87A]/30 transition-colors flex gap-4 p-3">
                      <div className="relative w-36 flex-shrink-0 rounded-lg overflow-hidden">
                        <img src={thumb} alt={v.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-pitch-950/40">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-white text-sm font-semibold line-clamp-2 group-hover:text-[#00E87A] transition-colors">{v.title}</p>
                        <p className="text-slate-500 text-xs mt-2 line-clamp-2">{v.description}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
