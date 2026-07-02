import { useState } from 'react'
import {
  Search,
  Filter,
  Trash2,
  AlertOctagon,
  CheckCircle2,
  Reply,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

function AdminCommentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Dữ liệu mẫu (Mock data) dựa chính xác theo hình ảnh bạn gửi
  const mockComments = [
    {
      id: 1,
      author: 'Eleanor Vance',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      date: 'October 24, 2023',
      postTitle: 'The Architectural Solitude of Modern Fiction',
      content:
        'This piece perfectly captures the sense of isolation prevalent in contemporary narratives. The comparison to Brutalist structures is particularly striking—it gives physical weight to the emotional void the characters inhabit. Brilliant analysis.',
      status: 'Pending'
    },
    {
      id: 2,
      author: 'Thomas Hardy',
      initials: 'T',
      date: 'October 23, 2023',
      postTitle: 'Rediscovering the Pastoral Elegy',
      content:
        'While I agree with the author\'s premise regarding the romanticization of rural landscapes, I feel they overlooked the underlying socioeconomic critiques embedded in the later stanzas. It\'s not merely an aesthetic longing, but a pointed commentary on industrial encroachment.',
      status: 'Approved'
    }
  ]

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-10 flex flex-col gap-8 box-border">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#2c2520]">
            Reader Discourse
          </h1>
          <p className="text-sm sm:text-base text-[#70655d] max-w-xl leading-relaxed">
            Review, moderate, and engage with the community's thoughts.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3">
          <div className="relative group flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08e81]" />
            <input
              type="text"
              placeholder="Search comments..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e7e3dc] rounded-lg font-sans text-sm focus:outline-none focus:border-[#4a3b32] transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e7e3dc] hover:border-[#a08e81] text-[#2c2520] rounded-lg font-sans text-sm font-semibold transition-all cursor-pointer">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* 2. COMMENTS LIST */}
      <div className="space-y-6">
        {mockComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-[#f5f1ea]/50 border border-[#e7e3dc]/60 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
          >
            {/* User Info & Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {comment.avatar ? (
                  <img
                    src={comment.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-[#e7e3dc]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-[#e7e3dc] flex items-center justify-center font-serif font-bold text-[#70655d]">
                    {comment.initials}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-[#2c2520] leading-none">
                    {comment.author}
                  </h4>
                  <p className="text-[11px] text-[#a08e81] font-medium mt-1">
                    {comment.date}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  comment.status === 'Pending'
                    ? 'bg-white text-[#a08e81] border border-[#e7e3dc]'
                    : 'bg-[#edf7ed] text-[#2e7d32]'
                }`}
              >
                {comment.status === 'Pending' ? (
                  <>
                    <div className="w-1 h-1 rounded-full bg-[#a08e81]" />{' '}
                    Pending
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> Approved
                  </>
                )}
              </div>
            </div>

            {/* Context Link */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#70655d] mb-4">
              <MessageSquare className="w-3.5 h-3.5 opacity-60" />
              <span>On:</span>
              <a
                href="#"
                className="text-[#2c2520] underline decoration-[#e7e3dc] underline-offset-4 hover:text-[#704f38] transition-colors"
              >
                {comment.postTitle}
              </a>
            </div>

            {/* Comment Content */}
            <blockquote className="font-serif text-lg italic text-[#2c2520] leading-relaxed border-l-2 border-[#e7e3dc] pl-6 py-1 mb-8">
              "{comment.content}"
            </blockquote>

            {/* Actions */}
            <div className="flex items-center justify-end gap-6 pt-4 border-t border-[#e7e3dc]/40">
              <button className="flex items-center gap-1.5 text-xs font-bold text-[#c62828] hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer uppercase tracking-widest">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>

              {comment.status === 'Pending' ? (
                <>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-[#70655d] hover:text-[#2c2520] transition-colors bg-transparent border-none cursor-pointer uppercase tracking-widest">
                    <AlertOctagon className="w-3.5 h-3.5" /> Spam
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-[#4a3b32] hover:bg-[#2c2520] text-[#fdfbf7] rounded-lg text-xs font-bold transition-all cursor-pointer uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                </>
              ) : (
                <button className="flex items-center gap-2 px-6 py-2.5 border border-[#e7e3dc] hover:bg-white text-[#2c2520] rounded-lg text-xs font-bold transition-all cursor-pointer uppercase tracking-widest">
                  <Reply className="w-3.5 h-3.5" /> Reply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. PAGINATION SECTION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-[#e7e3dc]/60 font-sans text-xs font-semibold text-[#70655d]">
        <p>Showing 1-10 of 42 comments</p>

        <div className="flex items-center gap-2">
          <button className="p-2 bg-white border border-[#e7e3dc] rounded hover:border-[#a08e81] transition-colors cursor-pointer group disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white border border-[#e7e3dc] rounded hover:border-[#a08e81] transition-colors cursor-pointer group">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminCommentsPage
