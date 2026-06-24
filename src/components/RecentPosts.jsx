import { CalendarDays, Clock } from "lucide-react";
// 1. Import thẻ Link từ thư viện react-router-dom
import { Link } from "react-router-dom";

function RecentPosts() {
  // Mảng dữ liệu mẫu (Mock data)
  const posts = [
    {
      id: 1,
      category: "CÔNG NGHỆ",
      title: "Xây Dựng Giao Diện Người Dùng Tinh Tế Với CSS Hiện Đại",
      excerpt:
        "Khám phá cách CSS Nesting, biến và các thuộc tính layout mới nhất đang tái định nghĩa cách...",
      date: "2026-06-18",
      readingTime: "8 phút đọc",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: 2,
      category: "ĐỜI SỐNG",
      title: "Đi Tìm Sự Yên Lặng Giữa Thế Giới Ồn Ào",
      excerpt:
        "Làm thế nào để thiết lập một không gian làm việc kỹ thuật số tối giản và tìm lại sự bình yên...",
      date: "2026-06-15",
      readingTime: "6 phút đọc",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
    },
    {
      id: 3,
      category: "VIẾT LÁCH",
      title: "Thói Quen Viết Morning Pages: Giải Phóng Sức Sáng Tạo",
      excerpt:
        "Viết 3 trang giấy vào mỗi buổi sáng bằng tay là một phương pháp đơn giản nhưng hiệu quả bấ...",
      date: "2026-06-10",
      readingTime: "4 phút đọc",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-10">
      {/* Tiêu đề mục & Nút Xem tất cả */}
      <div className="flex items-center justify-between border-b border-[#e7e3dc] pb-3 mb-8">
        <h3 className="text-2xl font-bold text-[#2c2520] tracking-tight">
          Các bài viết gần đây
        </h3>
        <Link
          to="/posts"
          className="font-sans text-xs uppercase tracking-wider font-semibold text-[#704f38] hover:text-[#593e2b] flex items-center gap-1 transition-colors no-underline"
        >
          Xem tất cả <span className="text-sm">&rarr;</span>
        </Link>
      </div>

      {/* Grid danh sách bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          // 2. SỬA: Chuyển đổi thẻ cha ngoài cùng từ <div> thành <Link>
          // Thêm thuộc tính 'block' để Link bao bọc hoàn toàn kích thước card.
          // Thêm 'no-underline' để màu chữ mô tả không bị gạch chân.
          <Link
            key={post.id}
            to={`/posts/${post.id}`} // Đường dẫn động đến trang chi tiết
            className="group block no-underline bg-white border border-[#e7e3dc]/80 rounded-2xl overflow-hidden shadow-[0_4px_15px_-3px_rgba(112,79,56,0.03)] flex flex-col transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(112,79,56,0.06)] hover:translate-y-[-2px]"
          >
            {/* Khối ảnh bọc trên */}
            <div className="w-full aspect-[16/10] overflow-hidden bg-[#f4f1eb]">
              <img
                src={post.image}
                alt={post.title}
                // Sử dụng 'group-hover:scale-[1.03]' để ảnh phóng nhẹ khi hover bất kỳ nơi nào của card cha
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Khối nội dung chữ */}
            <div className="p-6 grow flex flex-col space-y-3">
              {/* Thẻ danh mục */}
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#a08e81]">
                {post.category}
              </span>

              {/* Tiêu đề */}
              {/* Sử dụng 'group-hover:text-[#704f38]' để tiêu đề đổi màu khi hover vào card cha */}
              <h4 className="text-lg font-bold text-[#2c2520] group-hover:text-[#704f38] leading-[1.4] transition-colors duration-200 line-clamp-2">
                {post.title}
              </h4>

              {/* Đoạn trích mô tả ngắn */}
              <p className="text-sm text-[#70655d] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            {/* Khối chân trang card chứa Metadata */}
            <div className="px-6 pb-6 pt-2 flex items-center gap-4 font-sans text-[11px] text-[#a08e81] border-t border-[#fdfbf7]">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RecentPosts;
