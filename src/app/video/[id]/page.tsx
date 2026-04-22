'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

const mockVideos = [
  {
    id: '1',
    title: 'Dünya Kupası 2026 — Tüm Gruplar Analizi',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Kura çekiminin ardından tüm grupları masaya yatırdık. Hangi takım avantajlı, hangi grup ölüm grubu? Tüm detayları bu videoda bulabilirsiniz.',
  },
  {
    id: '2',
    title: 'Türkiye\'nin Şansı Ne? Kapsamlı Değerlendirme',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Türkiye\'nin Dünya Kupası performansı üzerine derin analiz. Kadro, teknik direktör ve rakipler üzerine kapsamlı bir değerlendirme.',
  },
  {
    id: '3',
    title: 'En İyi 10 Dünya Kupası Golü — Tarihin Zirvesi',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Dünya Kupası tarihinin en muhteşem 10 golünü derledik. Hangi gol sizin favoriniz?',
  },
]

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

export default function VideoDetay({ params }: { params: { id: string } }) {
  const video = mockVideos.find(v => v.id === params.id) || mockVideos[0]
  const related = mockVideos.filter(v => v.id !== video.id)
  const videoId = getYouTubeId(video.youtube_url)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`

  return (
    <main className="min-h-screen bg-pitch-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          ← Ana Sayfaya Dön
        </Link>

        {/* Video Player */}
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

        {/* Video info */}
        <div className="mb-12">
          <h1 className="font-outfit font-black text-2xl sm:text-3xl text-white mb-3">
            {video.title}
          </h1>
          <div className="h-px bg-gradient-to-r from-[#00E87A]/40 via-[#00E87A]/10 to-transparent my-4" />
          <p className="text-slate-400 leading-relaxed">{video.description}</p>
        </div>

        {/* Related videos */}
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
      </div>
    </main>
  )
}
