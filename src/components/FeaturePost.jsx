import { CalendarDays, Clock } from 'lucide-react'

function FeaturedPost() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-10">
      {/* Tiêu đề section */}
      <div className="border-b border-[#e7e3dc] pb-3 mb-8">
        <h3 className="text-2xl font-bold text-[#2c2520] tracking-tight">
          Bài viết nổi bật
        </h3>
      </div>

      {/* Card bài viết nổi bật lớn */}
      <div className="w-full bg-white border border-[#e7e3dc]/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(112,79,56,0.05)] grid grid-cols-1 md:grid-cols-12 items-stretch transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(112,79,56,0.08)]">
        {/* Khối hình ảnh bên trái (Chiếm 5/12 cột trên màn hình lớn) */}
        <div className="md:col-span-6 lg:col-span-5 relative aspect-[4/3] md:aspect-auto min-h-[300px] md:min-h-[400px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6" // Bạn có thể thay bằng ảnh cầm sách thực tế của mình
            alt="Nghệ thuật đọc chậm"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>

        {/* Khối nội dung bên phải (Chiếm 7/12 hoặc 6/12 cột) */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white space-y-4 md:space-y-5">
          {/* Danh mục (Category Token) */}
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#a08e81]">
            Sách
          </span>

          {/* Tiêu đề bài viết */}
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2c2520] leading-[1.25] hover:text-[#704f38] transition-colors duration-200 cursor-pointer">
            Nghệ Thuật Đọc Chậm Trong Kỷ Nguyên Số
          </h4>

          {/* Đoạn mô tả (Excerpt) */}
          <p className="text-sm md:text-base text-[#70655d] leading-relaxed">
            Trong một thế giới đầy xao nhãng và những cuốn sách tóm tắt, đọc
            chậm và nghiền ngẫm đang trở thành một hành động phản kháng đầy giá
            trị.
          </p>

          {/* Metadata: Ngày đăng & Thời gian đọc */}
          <div className="flex items-center gap-6 pt-2 font-sans text-xs text-[#a08e81]">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>2026-06-20</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>5 phút đọc</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPost
