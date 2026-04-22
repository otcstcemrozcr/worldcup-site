import Navbar from '@/components/Navbar'
import Link from 'next/link'

const mockPosts = [
  {
    id: '1',
    title: 'Dünya Kupası 2026\'da 48 Takım Sahne Alıyor: Tarihte İlk Kez Bu Kadar Büyük',
    content: `FIFA'nın aldığı tarihi kararla birlikte 2026 Dünya Kupası'nda 48 milli takım mücadele edecek. Turnuva; ABD, Kanada ve Meksika'da ortak olarak düzenlenecek ve futbol tarihinin en büyük organizasyonu olmaya aday.

Bu karar, futbol dünyasında büyük yankı uyandırdı. Daha önce 32 takımla oynanan format, yerini çok daha kapsayıcı ve heyecan verici bir yapıya bırakıyor. Afrika, Asya ve Amerika kıtalarından çok daha fazla takım turnuvaya katılma hakkı kazanacak.

Turnuva, 16 şehirde oynanacak ve toplam 104 maç gerçekleştirilecek. Final maçı ise New York/New Jersey'deki MetLife Stadium'da düzenlenecek. Kapasite itibarıyla dünyanın en büyük futbol etkinliği unvanını alacak olan bu turnuva için bilet talebi rekor kırdı.

Uzmanlar, yeni formatın özellikle küçük futbol milletlerine büyük bir fırsat sunduğunu vurguluyor. Turnuva öncesi favoriler arasında Brezilya, Fransa, Arjantin ve İngiltere gösteriliyor.`,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80',
    category: 'dunya-kupasi',
    created_at: '2026-04-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Grup Kura Çekimi: Hangi Takım Hangi Grupta?',
    content: `Dün gerçekleştirilen kura çekiminin ardından gruplar netleşti. İşte ayrıntılar ve tarafsız analizimiz.

A Grubu'nda güçlü takımlar bir araya gelirken, B Grubu'nda sürpriz sonuçlar bekleniyor. Türkiye'nin yer aldığı grupta rekabet oldukça çekişmeli olacak.

Kura çekimi töreninde dünya yıldızları sahneye çıktı. FIFA Başkanı'nın yaptığı konuşmada, bu Dünya Kupası'nın tarihin en büyük spor organizasyonu olacağı vurgulandı.`,
    image_url: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1400&q=80',
    category: 'analiz',
    created_at: '2026-04-19T14:30:00Z',
  },
  {
    id: '3',
    title: 'Türkiye\'nin Dünya Kupası Kadrosu Açıklandı',
    content: `Milli Takım Teknik Direktörü, 2026 Dünya Kupası için 26 kişilik kadroyu basın toplantısıyla duyurdu.

Kadroda sürpriz isimler dikkat çekerken, tecrübeli oyuncular da yerini korudu. Genç yeteneklerin ön plana çıktığı kadro, taraftarların büyük beğenisini kazandı.

Teknik direktör açıklamasında "Bu kadro ile Dünya Kupası'nda çok iyi bir performans sergileyeceğimize inanıyorum" dedi.`,
    image_url: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1400&q=80',
    category: 'takim',
    created_at: '2026-04-18T09:00:00Z',
  },
  {
    id: '4',
    title: 'Favori Takımlar Kim? FIFA Dünya Sıralaması Güncel Listesi',
    content: `Turnuva öncesi son FIFA sıralaması açıklandı. Hangi takım favoriler arasında, hangileri sürpriz yapabilir?

Arjantin mevcut dünya şampiyonu sıfatıyla turnuvaya girerken, Fransa ve Brezilya da güçlü kadroları ile ön plana çıkıyor. Avrupa'dan İngiltere ve İspanya da ciddi aday olarak gösteriliyor.

Analistler bu turnuvanın son yılların en rekabetçi Dünya Kupası olacağını öngörüyor.`,
    image_url: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1400&q=80',
    category: 'analiz',
    created_at: '2026-04-17T16:00:00Z',
  },
]

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

export default function HaberDetay({ params }: { params: { id: string } }) {
  const post = mockPosts.find(p => p.id === params.id) || mockPosts[0]
  const related = mockPosts.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-pitch-950">
      <Navbar />

      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-pitch-950/50 to-pitch-950/10" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-24 relative z-10 pb-20">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          ← Ana Sayfaya Dön
        </Link>

        <article className="bg-pitch-800 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-gold-gradient text-pitch-950 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {categoryLabels[post.category] || post.category}
              </span>
              <span className="text-slate-500 text-sm">{formatDate(post.created_at)}</span>
            </div>

            {/* Title */}
            <h1 className="font-outfit font-black text-3xl sm:text-4xl text-white leading-tight mb-8">
              {post.title}
            </h1>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gold-500/50 via-gold-500/20 to-transparent mb-8" />

            {/* Body */}
            <div className="prose prose-invert max-w-none">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Related */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gold-gradient"></div>
            <h2 className="font-outfit font-bold text-xl text-white">İlgili Haberler</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map(r => (
              <Link key={r.id} href={`/haber/${r.id}`} className="group card-hover">
                <div className="bg-pitch-800 border border-white/5 rounded-xl overflow-hidden hover:border-gold-500/30 transition-colors">
                  <div className="h-32 overflow-hidden">
                    <img src={r.image_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
      </div>
    </main>
  )
}
