import FeaturedPost from "~/components/FeaturePost";
import HeroSection from "~/components/HeroSection";
import Newsletter from "~/components/NewsLetter";
import RecentPosts from "~/components/RecentPosts";

function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* 1. Phần Hero đón chào */}
      <HeroSection />

      {/* 2. Tiêu điểm: Bài viết nổi bật nhất */}
      <FeaturedPost />

      {/* 3. Danh sách lưới: Các bài viết mới cập nhật gần đây */}
      <RecentPosts />

      {/* 4. Khối tương tác: Form Đăng ký nhận bản tin qua Email */}
      <Newsletter />
    </div>
  );
}

export default HomePage;
