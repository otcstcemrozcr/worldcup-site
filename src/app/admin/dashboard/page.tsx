'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Tab = 'posts' | 'videos'

type Post = {
  id: string
  title: string
  content: string
  image_url: string
  category: string
  created_at: string
}

type Video = {
  id: string
  title: string
  youtube_url: string
  description: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('posts')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)

  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postImage, setPostImage] = useState('')
  const [postCategory, setPostCategory] = useState('analiz')

  const [videoTitle, setVideoTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoDesc, setVideoDesc] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/admin')
    })
    fetchPosts()
    fetchVideos()
  }, [router])

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data)
  }

  const fetchVideos = async () => {
    const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
    if (data) setVideos(data)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const startEditPost = (post: Post) => {
    setEditingPost(post)
    setPostTitle(post.title)
    setPostContent(post.content)
    setPostImage(post.image_url)
    setPostCategory(post.category)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingPost(null)
    setEditingVideo(null)
    setPostTitle(''); setPostContent(''); setPostImage(''); setPostCategory('analiz')
    setVideoTitle(''); setVideoUrl(''); setVideoDesc('')
  }

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (editingPost) {
      const { error } = await supabase.from('posts').update({
        title: postTitle, content: postContent, image_url: postImage, category: postCategory,
      }).eq('id', editingPost.id)
      if (error) { setMessage('Hata: ' + error.message) }
      else { setMessage('Haber güncellendi!'); cancelEdit(); fetchPosts() }
    } else {
      const { error } = await supabase.from('posts').insert({
        title: postTitle, content: postContent, image_url: postImage, category: postCategory, published: true,
      })
      if (error) { setMessage('Hata: ' + error.message) }
      else { setMessage('Haber başarıyla eklendi!'); setPostTitle(''); setPostContent(''); setPostImage(''); fetchPosts() }
    }
    setLoading(false)
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) { setMessage('Hata: ' + error.message) }
    else { setMessage('Haber silindi.'); fetchPosts() }
  }

  const startEditVideo = (video: Video) => {
    setEditingVideo(video)
    setVideoTitle(video.title)
    setVideoUrl(video.youtube_url)
    setVideoDesc(video.description)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (editingVideo) {
      const { error } = await supabase.from('videos').update({
        title: videoTitle, youtube_url: videoUrl, description: videoDesc,
      }).eq('id', editingVideo.id)
      if (error) { setMessage('Hata: ' + error.message) }
      else { setMessage('Video güncellendi!'); cancelEdit(); fetchVideos() }
    } else {
      const { error } = await supabase.from('videos').insert({
        title: videoTitle, youtube_url: videoUrl, description: videoDesc,
      })
      if (error) { setMessage('Hata: ' + error.message) }
      else { setMessage('Video başarıyla eklendi!'); setVideoTitle(''); setVideoUrl(''); setVideoDesc(''); fetchVideos() }
    }
    setLoading(false)
  }

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Bu videoyu silmek istediğinize emin misiniz?')) return
    const { error } = await supabase.from('videos').delete().eq('id', id)
    if (error) { setMessage('Hata: ' + error.message) }
    else { setMessage('Video silindi.'); fetchVideos() }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-green-500/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚽</span>
          <h1 className="text-xl font-bold text-green-400">WeAreFootball — Yönetici Paneli</h1>
        </div>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 text-sm transition-colors">
          Çıkış Yap
        </button>
      </header>

      <div className="max-w-3xl mx-auto p-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setTab('posts'); cancelEdit(); setMessage('') }}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${tab === 'posts' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            Haberler
          </button>
          <button
            onClick={() => { setTab('videos'); cancelEdit(); setMessage('') }}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${tab === 'videos' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            Videolar
          </button>
        </div>

        {message && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.startsWith('Hata') ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
            {message}
          </div>
        )}

        {/* POST FORMU */}
        {tab === 'posts' && (
          <>
            <form onSubmit={handleAddPost} className="bg-gray-900 rounded-2xl p-6 space-y-4 border border-gray-800 mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-white">{editingPost ? 'Haberi Düzenle' : 'Yeni Haber'}</h2>
                {editingPost && (
                  <button type="button" onClick={cancelEdit} className="text-xs text-gray-400 hover:text-white">
                    İptal
                  </button>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Başlık</label>
                <input value={postTitle} onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                  placeholder="Haber başlığı..." required />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Kategori</label>
                <select value={postCategory} onChange={(e) => setPostCategory(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500">
                  <option value="analiz">Maç Analizi</option>
                  <option value="transfer">Transfer</option>
                  <option value="takim">Takım Haberi</option>
                  <option value="dunya-kupasi">Dünya Kupası</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Görsel URL</label>
                <input value={postImage} onChange={(e) => setPostImage(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                  placeholder="https://resim-linki.com/foto.jpg" />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">İçerik</label>
                <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)}
                  rows={8} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 resize-none"
                  placeholder="Haber içeriğini buraya yaz..." required />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50">
                {loading ? 'Kaydediliyor...' : editingPost ? 'Güncelle' : 'Haberi Yayınla'}
              </button>
            </form>

            {/* Haber listesi */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Mevcut Haberler ({posts.length})</h3>
              <div className="space-y-3">
                {posts.map(post => (
                  <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{post.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{new Date(post.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => startEditPost(post)}
                        className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-3 py-1.5 rounded-lg transition-colors">
                        Düzenle
                      </button>
                      <button onClick={() => handleDeletePost(post.id)}
                        className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1.5 rounded-lg transition-colors">
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && <p className="text-gray-600 text-sm">Henüz haber yok.</p>}
              </div>
            </div>
          </>
        )}

        {/* VİDEO FORMU */}
        {tab === 'videos' && (
          <>
            <form onSubmit={handleAddVideo} className="bg-gray-900 rounded-2xl p-6 space-y-4 border border-gray-800 mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-white">{editingVideo ? 'Videoyu Düzenle' : 'Yeni YouTube Videosu'}</h2>
                {editingVideo && (
                  <button type="button" onClick={cancelEdit} className="text-xs text-gray-400 hover:text-white">
                    İptal
                  </button>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Video Başlığı</label>
                <input value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                  placeholder="Video başlığı..." required />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">YouTube URL</label>
                <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                  placeholder="https://www.youtube.com/watch?v=..." required />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Açıklama</label>
                <textarea value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)}
                  rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 resize-none"
                  placeholder="Kısa video açıklaması..." />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50">
                {loading ? 'Kaydediliyor...' : editingVideo ? 'Güncelle' : 'Videoyu Ekle'}
              </button>
            </form>

            {/* Video listesi */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Mevcut Videolar ({videos.length})</h3>
              <div className="space-y-3">
                {videos.map(video => (
                  <div key={video.id} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{video.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 truncate">{video.youtube_url}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => startEditVideo(video)}
                        className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-3 py-1.5 rounded-lg transition-colors">
                        Düzenle
                      </button>
                      <button onClick={() => handleDeleteVideo(video.id)}
                        className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1.5 rounded-lg transition-colors">
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
                {videos.length === 0 && <p className="text-gray-600 text-sm">Henüz video yok.</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
