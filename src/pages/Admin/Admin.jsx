import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { testAuthAPI } from "~/apis";
import { toast } from "react-toastify";
import { Eye, FileText, Plus, ShieldCheck, ChevronRight } from "lucide-react";

function AdminPage() {
  const currentUser = useSelector(selectCurrentUser);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTestAuth = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const data = await testAuthAPI();
      setTestResult({ status: "Success", data: data });
      toast.success("Xác thực API thành công!");
    } catch (error) {
      setTestResult({
        status: "Error",
        message: error.response?.data?.error || error.message,
      });
      toast.error("Lỗi xác thực API!");
    } finally {
      setLoading(false);
    }
  };

  const adminPosts = [
    {
      id: 1,
      title: "The Architecture of Silence in Modern Prose",
      author: "E. Rutherford",
      authorAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      date: "Oct 24, 2023",
      status: "Published",
    },
    {
      id: 2,
      title: "Review: The Weight of Ink",
      author: "J. Mitchell",
      authorAvatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80",
      date: "Oct 22, 2023",
      status: "Draft",
    },
    {
      id: 3,
      title: "Revisiting the Classics: A 21st Century...",
      author: "A. Admin",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      date: "Oct 18, 2023",
      status: "Published",
    },
  ];

  return (
    // THAY ĐỔI: Sử dụng w-full min-h-screen để kéo giãn toàn bộ màn hình, p-4 lên p-6 hoặc p-10 tùy kích thước
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-10 flex flex-col gap-6 lg:gap-8 box-border">
      {/* 1. KHỐI HEADER CONTENT (Hỗ trợ bẻ hàng trên Mobile) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#e7e3dc]/50 pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2c2520]">
            Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#70655d] mt-1">
            Welcome back. Here is the latest data and activity for your
            editorial platform.
          </p>
        </div>

        {/* Cụm nút bấm tự co giãn hoặc dàn hàng ngang tuỳ màn hình */}
        <div className="flex flex-wrap items-center gap-2 font-sans text-xs font-semibold tracking-wide shrink-0">
          <button
            onClick={handleTestAuth}
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#e7e3dc] hover:border-[#4a3b32] text-[#2c2520] rounded-xl transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4 text-[#704f38]" />
            {loading ? "Testing..." : "Test Auth API"}
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4a3b32] hover:bg-[#382c25] text-white rounded-xl border-none transition-all cursor-pointer shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Create Post
          </button>
        </div>
      </div>

      {/* 2. KHỐI LOG XÁC THỰC API */}
      {testResult && (
        <div
          className={`p-4 rounded-xl border font-mono text-xs max-h-40 overflow-y-auto shadow-sm ${
            testResult.status === "Success"
              ? "bg-[#edf7ed] border-[#c8e6c9] text-[#2e7d32]"
              : "bg-[#fdeded] border-[#f9d2d2] text-[#c62828]"
          }`}
        >
          <div className="font-bold mb-1">
            Xác thực hệ thống: {testResult.status}
          </div>
          <pre className="whitespace-pre-wrap m-0">
            {JSON.stringify(testResult.data || testResult.message, null, 2)}
          </pre>
        </div>
      )}

      {/* 3. KHỐI CHỈ SỐ THỐNG KÊ (Responsive Grid: 1 cột trên Mobile, 2 cột trên Tablet/PC) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Card 1: Total Views */}
        <div className="bg-white border border-[#e7e3dc]/80 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(112,79,56,0.02)] flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center justify-between text-[#a08e81]">
            <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              TOTAL VIEWS
            </span>
            <Eye className="w-4 h-4 shrink-0" />
          </div>
          <div className="flex items-baseline gap-3 mt-2 sm:mt-4">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#2c2520]">
              2.4M
            </span>
            <span className="bg-[#edf7ed] text-[#2e7d32] font-sans text-[10px] font-bold px-2 py-0.5 rounded-full">
              ↑ 12%
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#a08e81] font-sans mt-2">
            vs. previous 30 days
          </p>
        </div>

        {/* Card 2: Total Posts */}
        <div className="bg-white border border-[#e7e3dc]/80 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(112,79,56,0.02)] flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center justify-between text-[#a08e81]">
            <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              TOTAL POSTS
            </span>
            <FileText className="w-4 h-4 shrink-0" />
          </div>
          <div className="flex items-baseline gap-3 mt-2 sm:mt-4">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#2c2520]">
              842
            </span>
            <span className="bg-[#edf7ed] text-[#2e7d32] font-sans text-[10px] font-bold px-2 py-0.5 rounded-full">
              ↑ 4
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#a08e81] font-sans mt-2">
            Published this week
          </p>
        </div>
      </div>

      {/* 4. BẢNG DANH SÁCH BÀI VIẾT (Tự động tạo thanh cuộn ngang trên màn hình nhỏ) */}
      <div className="bg-white border border-[#e7e3dc]/80 rounded-2xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(112,79,56,0.03)] flex flex-col">
        {/* Thanh tiêu đề bảng */}
        <div className="px-4 sm:px-6 py-4 border-b border-[#f4f1eb] flex items-center justify-between">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2c2520]">
            Recent Posts
          </h3>
          <button className="font-sans text-xs font-semibold tracking-wide text-[#704f38] hover:text-[#4a3b32] flex items-center gap-1 transition-colors border-none bg-transparent cursor-pointer">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vùng cuộn ngang an toàn cho Table */}
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left font-sans text-xs min-w-[600px]">
            <thead>
              <tr className="border-b border-[#f4f1eb] bg-[#fdfbf7] text-[#a08e81] font-bold uppercase tracking-wider">
                <th className="px-4 sm:px-6 py-3.5 font-semibold">Title</th>
                <th className="px-4 sm:px-6 py-3.5 font-semibold">Author</th>
                <th className="px-4 sm:px-6 py-3.5 font-semibold">Date</th>
                <th className="px-4 sm:px-6 py-3.5 font-semibold">Status</th>
                <th className="px-4 sm:px-6 py-3.5 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f1eb] text-[#70655d] font-medium">
              {adminPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-[#fdfbf7]/50 transition-colors"
                >
                  <td className="px-4 sm:px-6 py-4 text-[#2c2520] font-semibold max-w-[200px] sm:max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-5 h-5 rounded-full object-cover shrink-0"
                      />
                      <span>{post.author}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-[#a08e81] whitespace-nowrap">
                    {post.date}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        post.status === "Published"
                          ? "bg-[#edf7ed] text-[#2e7d32]"
                          : "bg-[#f5f1ea] text-[#70655d]"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right whitespace-nowrap">
                    <button className="text-[#704f38] hover:text-[#2c2520] font-semibold bg-transparent border-none cursor-pointer">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
