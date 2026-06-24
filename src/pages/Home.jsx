import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockPosts } from '~/utils/mockData'
import { Button } from '~/components/ui/button'
import { ArrowRight, BookOpen, Clock, Calendar, Mail, CheckCircle2 } from 'lucide-react'
import { toast } from 'react-toastify'

function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loadingSub, setLoadingSub] = useState(false)

  // Lấy bài viết đầu tiên làm bài nổi bật (Featured Post)
  const featuredPost = mockPosts[0]
  // Các bài viết tiếp theo làm danh sách bài viết gần đây
  const recentPosts = mockPosts.slice(1, 4)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoadingSub(true)
    try {
      // Giả lập gọi API đăng ký newsletter
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubscribed(true)
      toast.success('Đăng ký nhận tin thành công! Cảm ơn bạn.')
      setEmail('')
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại.')
    } finally {
      setLoadingSub(false)
    }
  }

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F9F7F2] to-white py-20 md:py-28 border-b border-stone-150">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3a2a21_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1 text-xs font-semibold text-stone-650 border border-stone-200">
            <BookOpen className="h-3 w-3" />
            Nhật ký cá nhân
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight text-primary tracking-tight max-w-3xl mx-auto">
            VBlog — Nơi ghi chép những suy tư và câu chuyện thường nhật
          </h1>
          
          <p className="text-base md:text-lg text-stone-500 font-sans max-w-2xl mx-auto leading-relaxed">
            Chia sẻ các bài viết sâu sắc về lập trình, văn học tối giản, lối sống chậm và những bài học trải nghiệm ý nghĩa trên hành trình trưởng thành.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <Link to="/posts">
              <Button className="bg-primary hover:bg-stone-900 text-white font-medium rounded-full px-6 py-5 cursor-pointer shadow-sm">
                Khám phá bài viết
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-stone-300 hover:bg-stone-50 text-stone-650 font-medium rounded-full px-6 py-5 cursor-pointer">
                Về tác giả
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && (
        <section className="mx-auto max-w-5xl px-4 md:px-6 py-16 w-full">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-primary pb-2 border-b border-stone-200">
              Bài viết nổi bật
            </h2>
          </div>

          <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            {/* Image container */}
            <div className="md:col-span-7 overflow-hidden h-[300px] md:h-[450px]">
              <Link to={`/posts/${featuredPost.id}`}>
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </Link>
            </div>
            
            {/* Info container */}
            <div className="md:col-span-5 p-6 md:p-8 space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-stone-400">
                {featuredPost.category}
              </span>
              
              <Link to={`/posts/${featuredPost.id}`}>
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-primary hover:text-stone-700 leading-tight transition-colors">
                  {featuredPost.title}
                </h3>
              </Link>
              
              <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed font-sans">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-stone-400 pt-2 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredPost.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RECENT POSTS GRID */}
      <section className="mx-auto max-w-5xl px-4 md:px-6 py-8 w-full">
        <div className="mb-8 flex justify-between items-end border-b border-stone-200 pb-2">
          <h2 className="text-xl md:text-2xl font-bold font-heading text-primary">
            Các bài viết gần đây
          </h2>
          <Link to="/posts" className="text-xs font-semibold text-stone-500 hover:text-stone-800 hover:underline flex items-center gap-1">
            Xem tất cả
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <article 
              key={post.id} 
              className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Card Image */}
              <div className="overflow-hidden h-48 bg-stone-100">
                <Link to={`/posts/${post.id}`}>
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400">
                    {post.category}
                  </span>
                  <Link to={`/posts/${post.id}`}>
                    <h3 className="font-bold font-heading text-lg text-primary hover:text-stone-700 leading-snug line-clamp-2 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-sans">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-stone-400 pt-3 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NEWSLETTER FORM */}
      <section id="newsletter" className="mx-auto max-w-5xl px-4 md:px-6 py-16 w-full">
        <div className="bg-[#F3EFE6] border border-stone-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-xs">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#3a2a21_1px,transparent_1px)] [background-size:12px_12px]" />
          
          <div className="space-y-3 text-center md:text-left max-w-lg z-10">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary leading-tight">
              Đăng ký nhận thông báo bài viết mới
            </h2>
            <p className="text-xs md:text-sm text-stone-500 font-sans leading-relaxed">
              Nhập email của bạn để nhận những bài viết chất lượng, các gợi ý sách hay và những chia sẻ hữu ích hàng tuần. Không quảng cáo rác.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[280px] md:min-w-[380px] z-10">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 p-4 bg-white/80 border border-emerald-250 rounded-xl text-emerald-700 animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="text-xs font-semibold">Đăng ký thành công! Kiểm tra hộp thư của bạn nhé.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập địa chỉ email..."
                    className="w-full rounded-full border border-stone-300 bg-white px-4 py-2.5 pl-10 text-xs text-stone-800 transition placeholder:text-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                </div>
                <Button 
                  type="submit" 
                  disabled={loadingSub}
                  className="rounded-full bg-primary hover:bg-stone-900 text-white font-semibold px-6 py-2.5 text-xs cursor-pointer shrink-0"
                >
                  {loadingSub ? 'Đang gửi...' : 'Đăng ký'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
