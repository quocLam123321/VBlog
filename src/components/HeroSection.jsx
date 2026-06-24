import { BookOpen } from "lucide-react";

function HeroSection() {
  return (
    <section className="w-full bg-[#fdfbf7] pt-20 pb-16 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Tag nhỏ phía trên đầu "Nhật ký cá nhân" */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#e7e3dc] bg-[#fcfbfa] rounded-full text-[11px] font-medium tracking-wide text-[#70655d]">
          <BookOpen className="w-3.5 h-3.5 text-[#704f38]" />
          Nhật ký cá nhân
        </div>

        {/* Tiêu đề chính lớn (Main Heading) */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2c2520] leading-[1.2] max-w-3xl">
          VBlog — Nơi ghi chép những suy tư và câu chuyện thường nhật
        </h2>

        {/* Đoạn mô tả ngắn (Sub-heading) */}
        <p className="font-sans text-sm md:text-base text-[#70655d] leading-relaxed max-w-2xl mt-2">
          Chia sẻ các bài viết sâu sắc về lập trình, văn học tối giản, lối sống
          chậm và những bài học trải nghiệm ý nghĩa trên hành trình trưởng
          thành.
        </p>

        {/* Khối các nút hành động (Buttons) */}
        <div className="flex items-center justify-center gap-4 mt-4 font-sans text-xs font-semibold tracking-wide">
          {/* Nút Khám phá bài viết */}
          <button className="flex items-center gap-2 px-6 py-3 bg-[#1e1915] hover:bg-[#2c2520] text-[#fdfbf7] rounded-full shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer">
            Khám phá bài viết
            <span className="text-sm font-light">&rarr;</span>
          </button>

          {/* Nút Về tác giả */}
          <button className="px-6 py-3 border border-[#e7e3dc] hover:bg-[#f4f1eb] text-[#2c2520] rounded-full transition-all duration-200 active:scale-[0.98] cursor-pointer">
            Về tác giả
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
