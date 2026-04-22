const items = [
  "🏆 FIFA Dünya Kupası 2026 — 48 Takım, 3 Ülke, 1 Şampiyon",
  "⚽ Türkiye Milli Takımı kadrosu açıklandı",
  "📊 Grup kura çekimi tarihi belli oldu",
  "🌍 ABD, Kanada ve Meksika'da 16 şehir ev sahipliği yapacak",
  "🎯 Dünya Kupası biletleri için son başvuru tarihi yaklaşıyor",
]

export default function BreakingTicker() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-pitch-800 border-y border-white/5 overflow-hidden">
      <div className="flex items-stretch">
        {/* Label */}
        <div className="flex-shrink-0 bg-gold-gradient px-4 py-2.5 flex items-center gap-2 z-10">
          <span className="w-2 h-2 rounded-full bg-pitch-950 animate-pulse"></span>
          <span className="text-pitch-950 font-outfit font-bold text-xs tracking-widest uppercase whitespace-nowrap">
            Son Dakika
          </span>
        </div>

        {/* Scrolling text */}
        <div className="ticker-wrapper flex-1 py-2.5">
          <div className="animate-ticker inline-flex gap-0">
            {doubled.map((item, i) => (
              <span key={i} className="text-slate-300 text-sm px-10 whitespace-nowrap">
                {item}
                <span className="mx-8 text-gold-500">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
