import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const categoryLabels: Record<string, string> = {
  'dunya-kupasi': 'Dünya Kupası',
  'analiz': 'Analiz',
  'takim': 'Takım',
  'transfer': 'Transfer',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export const revalidate = 60

export default async function HaberDetay({ params }: { params: { id: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single()

  const { data: related } = await supabase
    .from('posts')
    .select('*')
    .neq('id', params.id)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!post) {
    return (
      <main className="min-h-screen bg-pitch-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Haber bulunamadı.</p>
          <Link href="/" className="text-gold-400 hover:text-gold-300">Ana Sayfaya Dön</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-pitch-950">
      <Navbar />

      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src={post.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-pitch-950/50 to-pitch-950/10" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-24 relative z-10 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          ← Ana Sayfaya Dön
        </Link>

        <article className="bg-pitch-800 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-gold-gradient text-pitch-950 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {categoryLabels[post.category] || post.category}
              </span>
              <span className="text-slate-500 text-sm">{formatDate(post.created_at)}</span>
            </div>

            <h1 className="font-outfit font-black text-3xl sm:text-4xl text-white leading-tight mb-8">
              {post.title}
            </h1>

            <div className="h-px bg-gradient-to-r from-gold-500/50 via-gold-500/20 to-transparent mb-8" />

            <div className="prose prose-invert max-w-none">
              {post.content.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Related */}
        {related && related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full bg-gold-gradient"></div>
              <h2 className="font-outfit font-bold text-xl text-white">İlgili Haberler</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r: any) => (
                <Link key={r.id} href={`/haber/${r.id}`} className="group card-hover">
                  <div className="bg-pitch-800 border border-white/5 rounded-xl overflow-hidden hover:border-gold-500/30 transition-colors">
                    <div className="h-32 overflow-hidden">
                      <img
                        src={r.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-white text-sm font-semibold line-clamp-2 group-hover:text-gold-300 transition-colors">{r.title}</p>
                      <p className="text-slate-500 text-xs mt-1">{formatDate(r.created_at)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
