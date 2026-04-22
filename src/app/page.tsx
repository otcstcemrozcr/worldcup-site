import Navbar from '@/components/Navbar'
import BreakingTicker from '@/components/BreakingTicker'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const categoryLabels: Record<string, string> = {
  'dunya-kupasi': 'Dünya Kupası',
  'analiz': 'Analiz',
  'takim': 'Takım',
  'transfer': 'Transfer',
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200) + ' dk okuma'
}

export const revalidate = 60

export default async function HomePage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  const allPosts = posts || []
  const allVideos = videos || []

  const hero = allPosts[0]
  const otherPosts = allPosts.slice(1)

  return (
    <main className="min-h-screen bg-pitch-950">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      {hero ? (
        <section className="relative h-[85vh] sm:h-[92vh] min-h-[580px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={hero.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80'}
              alt={hero.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060A] via-[#04060A]/70 to-[#04060A]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04060A]/80 via-transparent to-transparent" />
          </div>

          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-20 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="bg-gold-gradient text-pitch-950 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {categoryLabels[hero.category] || hero.category}
                </span>
                <span className="text-slate-400 text-xs">{formatDate(hero.created_at)}</span>
              </div>

              <h1 className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 sm:mb-5">
                {hero.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl line-clamp-3">
                {hero.content}
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <Link
                  href={`/haber/${hero.id}`}
                  className="group inline-flex items-center gap-2 sm:gap-3 bg-gold-gradient text-pitch-950 font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full hover:shadow-gold-glow transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  Haberi Oku
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
                <span className="text-slate-500 text-sm">{readingTime(hero.content)}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
            <span className="text-xs text-slate-400 tracking-widest uppercase">Keşfet</span>
            <div className="w-px h-8 bg-gradient-to-b from-gold-500 to-transparent"></div>
          </div>
        </section>
      ) : (
        <section className="relative h-[92vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80" alt="hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060A] via-[#04060A]/80 to-[#04060A]/40" />
          </div>
          <div className="relative text-center">
            <h1 className="font-outfit font-black text-5xl text-white mb-4">WeAreFootball</h1>
            <p className="text-slate-400 text-lg">Dünya Kupası 2026 haberleri yakında burada.</p>
          </div>
        </section>
      )}

      {/* ── BREAKING TICKER ──────────────────────────────────── */}
      <BreakingTicker />

      {/* ── HABERLER ─────────────────────────────────────────── */}
      {otherPosts.length > 0 && (
        <section id="haberler" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #FFD54F, #C9A84C)' }}></div>
              <h2 className="font-outfit font-bold text-2xl sm:text-3xl text-white">Son Haberler</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <Link key={post.id} href={`/haber/${post.id}`} className="group card-hover">
                <article className="h-full bg-pitch-800 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-colors duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(4,6,10,0.95) 100%)' }} />
                    <span className="absolute top-3 left-3 bg-gold-gradient text-pitch-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {categoryLabels[post.category] || post.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-outfit font-bold text-white text-base leading-snug mb-3 line-clamp-2 group-hover:text-gold-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-white/5">
                      <span>{formatDate(post.created_at)}</span>
                      <span className="text-gold-500">{readingTime(post.content)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── DIVIDER ──────────────────────────────────────────── */}
      {allVideos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }} />
        </div>
      )}

      {/* ── VİDEOLAR ─────────────────────────────────────────── */}
      {allVideos.length > 0 && (
        <section id="videolar" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 rounded-full bg-neon-gradient"></div>
              <h2 className="font-outfit font-bold text-2xl sm:text-3xl text-white">Videolar</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map((video) => {
              const videoId = getYouTubeId(video.youtube_url)
              const thumb = videoId
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'

              return (
                <Link key={video.id} href={`/video/${video.id}`} className="group card-hover">
                  <article className="bg-pitch-800 border border-white/5 rounded-2xl overflow-hidden hover:border-neon/30 transition-colors duration-300">
                    <div className="relative h-48 overflow-hidden bg-pitch-700">
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-pitch-950/40 group-hover:bg-pitch-950/20 transition-colors" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-[#00E87A]/20 group-hover:border-[#00E87A]/50 group-hover:scale-110 transition-all duration-300">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      <div className="absolute bottom-3 right-3 bg-[#FF0000] rounded px-2 py-0.5 flex items-center gap-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"/>
                        </svg>
                        <span className="text-white text-[9px] font-bold">YouTube</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-outfit font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#00E87A] transition-colors">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-slate-500 text-xs mt-2 line-clamp-2">{video.description}</p>
                      )}
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-pitch-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-outfit font-bold text-white">WeAreFootball</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/we_arefoot_ball"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-xs">@we_arefoot_ball</span>
            </a>
            <p className="text-slate-600 text-xs">© 2026 WeAreFootball.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
