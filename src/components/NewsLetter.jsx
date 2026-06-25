import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="w-full bg-[#f5f2eb] rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Khối tiêu đề và nội dung mô tả */}
        <div className="max-w-xl space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold text-[#2c2520] leading-tight">
            Đăng ký nhận thông báo bài viết mới
          </h3>
          <p className="font-sans text-sm text-[#70655d] leading-relaxed">
            Nhập email của bạn để nhận những bài viết chất lượng, các gợi ý sách
            hay và những chia sẻ hữu ích hàng tuần. Không quảng cáo rác.
          </p>
        </div>

        {/* Khối Input điền Email */}
        <div className="w-full lg:w-auto flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-transparent">
            {/* Khung ô nhập */}
            <div className="relative flex-grow lg:w-80">
              <input
                type="email"
                placeholder="Nhập địa chỉ email..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#e7e3dc] rounded-full font-sans text-xs focus:outline-none focus:border-[#704f38] shadow-sm text-[#2c2520]"
              />
              <Mail className="w-4 h-4 absolute left-4 top-[14px] text-[#a08e81]" />
            </div>

            {/* Nút Đăng ký */}
            <button className="px-6 py-3 bg-[#1e1915] hover:bg-[#2c2520] text-[#fdfbf7] font-sans text-xs font-semibold tracking-wide rounded-full shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer whitespace-nowrap">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
