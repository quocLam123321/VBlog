import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { Search, Settings, ShieldAlert, LogOut, LogIn } from 'lucide-react'
import ProfileDialog from './ProfileDialog'
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
// Import Popover và các thành phần phụ trợ từ Headless UI
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition
} from '@headlessui/react'

function Header() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleDropdownLogout = () => {
    dispatch(logoutUserAPI())
  }

  return (
    <header className="border-b border-[#e7e3dc] bg-[#fdfbf7]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-[#2c2520] no-underline"
        >
          VBlog
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest font-semibold text-[#70655d]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-1 transition-colors hover:text-[#2c2520] no-underline ${isActive ? 'text-[#2c2520] border-b border-[#2c2520]' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `pb-1 transition-colors hover:text-[#2c2520] no-underline ${isActive ? 'text-[#2c2520] border-b border-[#2c2520]' : ''}`
            }
          >
            Posts
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `pb-1 transition-colors hover:text-[#2c2520] no-underline ${isActive ? 'text-[#2c2520] border-b border-[#2c2520]' : ''}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `pb-1 transition-colors hover:text-[#2c2520] no-underline ${isActive ? 'text-[#2c2520] border-b border-[#2c2520]' : ''}`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Khối bên phải */}
        <div className="flex items-center gap-4 text-[#70655d]">
          {/* Ô tìm kiếm */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="pl-3 pr-8 py-1.5 bg-transparent border border-[#e7e3dc] rounded-full text-xs font-sans focus:outline-none focus:border-[#704f38] w-48 text-[#2c2520]"
            />
            <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-[#70655d]" />
          </div>

          {/* ======================================================= */}
          {/* TÍCH HỢP HOVER POVER KHÔNG BỊ HỤT CHUỘT                 */}
          {/* ======================================================= */}
          {/* Gắn class 'group' để điều khiển trạng thái mở panel qua CSS */}
          {currentUser ? (
            <Popover className="relative inline-block text-left group">
              {/* Nút kích hoạt ảo (Chứa Avatar) */}
              <PopoverButton className="flex rounded-full focus:outline-none transition-all cursor-pointer block">
                <Avatar className="w-10 h-10 size-10 border border-[#e7e3dc]">
                  <AvatarImage
                    src={currentUser?.user?.avatar_url}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="bg-[#fdfbf7] text-[#70655d] text-xs font-bold flex items-center justify-center">
                    {currentUser?.user?.user_name ? currentUser.user.user_name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </PopoverButton>

              {/* Khung bọc đệm kết hợp với Transition để ẩn/hiện mượt mà khi hover */}
              {/* Tận dụng 'pt-3' làm cầu đệm vô hình, 'hidden group-hover:block' ép mở khi di chuột */}
              <div className="absolute right-0 top-full pt-3 w-64 hidden group-hover:block z-50">
                <Transition
                  show={true} // Luôn bật để giao quyền ẩn/hiện cho group-hover của CSS tối ưu tốc độ
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {/* Bảng điều khiển chứa nội dung menu thực tế */}
                  <PopoverPanel
                    static
                    className="bg-white border border-[#e7e3dc] rounded-2xl shadow-xl py-4 font-sans text-sm focus:outline-none origin-top-right"
                  >
                    {/* Tiêu đề tài khoản */}
                    <div className="px-5 pb-3 border-b border-[#f4f1eb]">
                      <p className="text-[11px] text-[#a08e81] font-medium tracking-wide">
                        Tài khoản
                      </p>
                      <p className="text-xs font-semibold text-[#2c2520] truncate mt-0.5">
                        {currentUser?.user?.user_name || 'User'}
                      </p>
                      <p className="text-[10px] text-[#70655d] truncate mt-0.5">
                        {currentUser?.user?.email}
                      </p>
                    </div>

                    {/* Các danh mục lựa chọn */}
                    <div className="pt-2 text-xs font-medium text-[#544941]">
                      <button
                        type="button"
                        onClick={() => setIsProfileOpen(true)}
                        className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-[#fdfbf7] text-[#544941] no-underline transition-colors border-none bg-transparent cursor-pointer text-left text-xs font-medium"
                      >
                        <Settings className="w-4 h-4 text-[#a08e81]" />
                        Hồ sơ cá nhân
                      </button>

                      {currentUser?.user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#fdfbf7] text-[#544941] no-underline transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4 text-[#a08e81]" />
                          Trang quản trị
                        </Link>
                      )}

                      <button
                        onClick={handleDropdownLogout}
                        className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-[#fdfbf7] text-[#c62828] font-semibold transition-colors border-none bg-transparent cursor-pointer text-left text-xs"
                      >
                        <LogOut className="w-4 h-4 text-[#c62828]" />
                        Đăng xuất
                      </button>
                    </div>
                  </PopoverPanel>
                </Transition>
              </div>
            </Popover>
          ) : (
            <Link
              to="/auth/login"
              className="px-4 py-1.5 bg-[#1e1915] hover:bg-[#2c2520] text-[#fdfbf7] font-sans text-xs font-semibold tracking-wide rounded-full shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer no-underline flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              Đăng nhập
            </Link>
          )}
          {/* ======================================================= */}
        </div>
      </div>
      {isProfileOpen && <ProfileDialog open={isProfileOpen} onOpenChange={setIsProfileOpen} />}
    </header>
  )
}

export default Header
