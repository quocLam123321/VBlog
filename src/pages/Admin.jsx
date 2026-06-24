import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, logoutUserAPI } from "~/redux/user/userSlice";
import { testAuthAPI } from "~/apis";
import { toast } from "react-toastify";
import { ShieldCheck, LogOut } from "lucide-react";

function AdminPage() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUserAPI());
  };

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

  return (
    <div className="w-full max-w-md mx-auto px-6 py-20 flex flex-col items-center gap-6">
      {/* Tiêu đề Admin Page ngoài hộp */}
      <h2 className="text-3xl md:text-4xl text-[#2c2520] tracking-tight text-center">
        Admin Page
      </h2>

      {/* Bảng điều khiển màu trắng bo góc */}
      <div className="w-full bg-white border border-[#e7e3dc] rounded-2xl p-8 shadow-[0_4px_25px_-5px_rgba(112,79,56,0.04)] space-y-6">
        <div>
          <h3 className="text-lg font-bold text-[#2c2520] leading-tight">
            Bảng điều khiển xác thực (Test Auth)
          </h3>
          <p className="font-sans text-xs text-[#a08e81] mt-1">
            User:{" "}
            <span className="text-[#70655d] font-medium">
              {currentUser?.user?.email || "usertest01@gmail.com"}
            </span>
          </p>
        </div>

        {/* Khối các nút tính năng */}
        <div className="space-y-3 font-sans text-xs font-semibold tracking-wide">
          {/* Nút Test Auth API */}
          <button
            onClick={handleTestAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1e1915] hover:bg-[#2c2520] text-[#fdfbf7] rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-60"
          >
            <ShieldCheck className="w-4 h-4" />
            {loading ? "Đang xác thực..." : "Test Auth API"}
          </button>

          {/* Nút Logout màu hồng nhạt */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#fdeded] hover:bg-[#fbdada] text-[#c62828] rounded-xl transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>

        {/* Khối log kết quả trả về từ API */}
        {testResult && (
          <div
            className={`p-3 rounded-lg border font-mono text-[11px] max-h-32 overflow-y-auto ${
              testResult.status === "Success"
                ? "bg-[#edf7ed] border-[#c8e6c9] text-[#2e7d32]"
                : "bg-[#fdeded] border-[#f9d2d2] text-[#c62828]"
            }`}
          >
            <div className="font-bold mb-1">Status: {testResult.status}</div>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(testResult.data || testResult.message, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
