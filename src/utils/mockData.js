// Mock blog data for VBlog
export const mockAuthor = {
  name: "VBlog Writer",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  bio: "Nhà văn, lập trình viên và người yêu sách. Viết về công nghệ, phong cách sống tối giản và nghệ thuật đọc chậm.",
  email: "author@vblog.vn",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    goodreads: "https://goodreads.com",
    github: "https://github.com"
  }
}

export const mockCategories = ["Tất cả", "Viết lách", "Công nghệ", "Đời sống", "Sách"]

export const mockPosts = [
  {
    id: "1",
    title: "Nghệ Thuật Đọc Chậm Trong Kỷ Nguyên Số",
    slug: "nghe-thuat-doc-cham-trong-ky-nguyen-so",
    excerpt: "Trong một thế giới đầy xao nhãng và những cuốn sách tóm tắt, đọc chậm và nghiền ngẫm đang trở thành một hành động phản kháng đầy giá trị.",
    content: `<p>Trong kỷ nguyên số, chúng ta đang đọc nhiều hơn bao giờ hết, nhưng chúng ta lại hiểu và nhớ ít hơn. Chúng ta lướt qua các dòng trạng thái, các bài báo giật gân, và thậm chí cả những cuốn sách được quảng cáo là "tóm tắt trong 10 phút". Sự vội vã này làm mất đi khả năng chiêm nghiệm sâu sắc của não bộ.</p>
    <p>Đọc chậm (Slow Reading) không chỉ là việc giảm tốc độ đọc. Đó là một cách tiếp cận chủ động, nơi người đọc đối thoại với tác giả, ghi chú bên lề, dừng lại để suy ngẫm về một câu văn đẹp hoặc một ý tưởng đột phá. Khi đọc chậm, bạn cho phép câu chữ thấm vào tâm hồn, định hình lại thế giới quan của chính mình.</p>
    <blockquote>"Đọc một cuốn sách hay không chỉ để biết tác giả viết gì, mà là để khám phá xem bạn nghĩ gì."</blockquote>
    <p>Để bắt đầu thực hành đọc chậm, hãy tạo cho mình một không gian yên tĩnh không có thiết bị điện tử, dành ra ít nhất 30 phút mỗi ngày và chọn những cuốn sách thực sự có chiều sâu. Hãy đọc như thể bạn đang nhâm nhi một tách trà ngon, chứ không phải đang chạy đua với thời gian.</p>`,
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80",
    category: "Sách",
    date: "2026-06-20",
    readTime: "5 phút đọc",
    author: mockAuthor,
    comments: [
      { id: "101", author: "Minh Thư", content: "Bài viết rất sâu sắc! Mình cũng đang cố gắng hạn chế điện thoại để đọc sách giấy nhiều hơn.", date: "2026-06-21" },
      { id: "102", author: "Hoàng Long", content: "Đọc chậm thực sự giúp mình ghi nhớ kiến thức tốt hơn gấp nhiều lần.", date: "2026-06-22" }
    ]
  },
  {
    id: "2",
    title: "Xây Dựng Giao Diện Người Dùng Tinh Tế Với CSS Hiện Đại",
    slug: "xay-dung-giao-dien-nguoi-dung-tinh-te-voi-css-hien-dai",
    excerpt: "Khám phá cách CSS Nesting, biến và các thuộc tính layout mới nhất đang tái định nghĩa cách chúng ta xây dựng giao diện web tối giản.",
    content: `<p>Giao diện web hiện đại ngày nay không chỉ cần đẹp mà còn phải nhẹ, mượt mà và dễ bảo trì. Với những cải tiến vượt bậc của CSS trong những năm gần đây, chúng ta có thể làm được rất nhiều thứ mà không cần lạm dụng Javascript.</p>
    <p>CSS Nesting (lồng code CSS) giờ đây đã được hỗ trợ native trên hầu hết trình duyệt. Nó giúp code gọn gàng, có cấu trúc rõ ràng y hệt như Sass/Less. Bên cạnh đó, việc sử dụng các hệ màu hiện đại như OKLCH hay HSL giúp nhà thiết kế dễ dàng tạo ra các bảng màu hài hòa, nhất quán và hỗ trợ đổi chủ đề (theme) cực kỳ nhanh chóng.</p>
    <p>Khi thiết kế cho blog cá nhân, việc áp dụng khoảng cách (spacing) và lưới (grid) bất đối xứng tạo nên cảm giác tự do, phóng khoáng nhưng vẫn rất chuyên nghiệp. Hãy chú trọng vào các chuyển động vi mô (micro-animations) để tăng tương tác của người dùng mà không làm chậm trang web.</p>`,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    category: "Công nghệ",
    date: "2026-06-18",
    readTime: "8 phút đọc",
    author: mockAuthor,
    comments: [
      { id: "201", author: "TechDev", content: "CSS v4 thực sự mang lại quá nhiều cải tiến lớn. Thích bài viết này!", date: "2026-06-19" }
    ]
  },
  {
    id: "3",
    title: "Đi Tìm Sự Yên Lặng Giữa Thế Giới Ồn Ào",
    slug: "di-tim-su-yen-lang-giua-the-gioi-on-ao",
    excerpt: "Làm thế nào để thiết lập một không gian làm việc kỹ thuật số tối giản và tìm lại sự bình yên trong tâm trí giữa dòng thông tin bất tận.",
    content: `<p>Mỗi ngày chúng ta bị bủa vây bởi hàng ngàn thông báo, email, tin nhắn và cuộc gọi. Tâm trí con người không được thiết kế để xử lý lượng thông tin khổng lồ này mà không bị kiệt sức. Sự yên tĩnh đã trở thành một thứ xa xỉ phẩm trong xã hội hiện đại.</p>
    <p>Tìm kiếm sự yên lặng không nhất thiết phải là đi vào rừng sâu lánh đời. Đó có thể là việc tắt toàn bộ thông báo điện thoại sau 8 giờ tối, dọn dẹp màn hình desktop chỉ giữ lại những app thực sự cần thiết, hoặc dành ra 10 phút ngồi im lặng nhìn ra cửa sổ trước khi bắt đầu làm việc.</p>
    <p>Một không gian kỹ thuật số tối giản sẽ dẫn lối cho một tư duy mạch lạc. Khi bạn loại bỏ được những tiếng ồn bên ngoài, bạn mới bắt đầu nghe thấy những suy nghĩ sâu kín nhất của bản thân.</p>`,
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    category: "Đời sống",
    date: "2026-06-15",
    readTime: "6 phút đọc",
    author: mockAuthor,
    comments: []
  },
  {
    id: "4",
    title: "Thói Quen Viết Morning Pages: Giải Phóng Sức Sáng Tạo",
    slug: "thoi-quen-viet-morning-pages-giai-phong-suc-sang-tao",
    excerpt: "Viết 3 trang giấy vào mỗi buổi sáng bằng tay là một phương pháp đơn giản nhưng hiệu quả bất ngờ giúp bạn khai thông các bế tắc sáng tạo.",
    content: `<p>Morning Pages (Trang viết buổi sáng) là khái niệm được giới thiệu bởi Julia Cameron trong cuốn sách 'The Artist's Way'. Phương pháp rất đơn giản: ngay khi thức dậy, việc đầu tiên bạn làm là viết tay 3 trang giấy nguệch ngoạc bất cứ thứ gì đang chạy qua đầu bạn.</p>
    <p>Không cần suy nghĩ chủ đề, không cần sửa lỗi chính tả, không cần viết hay. Bạn thậm chí có thể viết "Tôi không biết viết gì bây giờ..." lặp đi lặp lại. Mục tiêu ở đây là đổ toàn bộ những suy nghĩ lộn xộn, lo âu, vụn vặt tích tụ trong não bộ ra giấy để bắt đầu một ngày mới với tâm trí thông thoáng.</p>
    <p>Sau vài tuần thực hành đều đặn, bạn sẽ nhận thấy khả năng tập trung tăng lên rõ rệt, và những ý tưởng sáng tạo đột phá bắt đầu xuất hiện tự nhiên hơn.</p>`,
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    category: "Viết lách",
    date: "2026-06-10",
    readTime: "4 phút đọc",
    author: mockAuthor,
    comments: [
      { id: "401", author: "Khánh Linh", content: "Mình đã viết được 1 tháng và xác nhận là nó cực kỳ hiệu quả ạ!", date: "2026-06-12" }
    ]
  },
  {
    id: "5",
    title: "Moby Dick Và Bài Học Về Sự Ám Ảnh Của Con Người",
    slug: "moby-dick-va-bai-hoc-ve-su-am-anh-cua-con-nguoi",
    excerpt: "Tác phẩm kinh điển của Herman Melville không chỉ đơn thuần kể về cuộc săn lùng chú cá voi trắng, mà còn là bản cáo trạng sâu sắc về sự tự hủy hoại.",
    content: `<p>Nhiều người e ngại khi bắt đầu đọc Moby Dick vì độ dày và những chương mô tả chi tiết về ngành săn cá voi thế kỷ 19. Thế nhưng, nếu vượt qua được lớp vỏ bọc đó, bạn sẽ tìm thấy một kiệt tác văn học đầy triết lý.</p>
    <p>Thuyền trưởng Ahab không chỉ săn cá voi để kiếm sống; ông ta săn đuổi Moby Dick vì lòng hận thù cá nhân và sự kiêu ngạo muốn chinh phục tự nhiên. Sự ám ảnh cuồng điên của Ahab cuối cùng đã kéo theo cả con tàu Pequod xuống đáy đại dương sâu thẳm.</p>
    <p>Melville viết tác phẩm này để cảnh tỉnh chúng ta về những nỗi ám ảnh cực đoan trong đời. Khi ta dồn toàn bộ cuộc sống vào một mục tiêu duy nhất mang tính hận thù hay sở hữu, ta có nguy cơ đánh mất bản ngã và kéo theo sự sụp đổ của những người xung quanh.</p>`,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80",
    category: "Sách",
    date: "2026-06-05",
    readTime: "7 phút đọc",
    author: mockAuthor,
    comments: []
  }
]
