import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { Search, Menu, LogOut, User, Settings, Shield } from 'lucide-react'
import ProfileDialog from './ProfileDialog'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '~/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '~/components/ui/sheet'

const Header = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUserAPI())
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/posts?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const isLoggedIn = !!currentUser

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        
        {/* LOGO */}
        <Link 
          to="/" 
          className="font-serif text-2xl font-black tracking-tight text-primary hover:opacity-90 transition-all select-none"
        >
          VBlog
        </Link>

        {/* DESKTOP SEARCH & NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 items-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `relative pb-1 text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
                  isActive ? 'text-stone-900 font-semibold' : 'text-stone-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary animate-in fade-in slide-in-from-bottom-1 duration-150" />
                  )}
                </>
              )}
            </NavLink>
            <NavLink 
              to="/posts" 
              className={({ isActive }) => 
                `relative pb-1 text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
                  isActive ? 'text-stone-900 font-semibold' : 'text-stone-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Posts
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary animate-in fade-in slide-in-from-bottom-1 duration-150" />
                  )}
                </>
              )}
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `relative pb-1 text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
                  isActive ? 'text-stone-900 font-semibold' : 'text-stone-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary animate-in fade-in slide-in-from-bottom-1 duration-150" />
                  )}
                </>
              )}
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `relative pb-1 text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
                  isActive ? 'text-stone-900 font-semibold' : 'text-stone-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary animate-in fade-in slide-in-from-bottom-1 duration-150" />
                  )}
                </>
              )}
            </NavLink>
          </div>
        </nav>

        {/* SEARCH & PROFILE CONTROLS */}
        <div className="hidden md:flex items-center gap-4">
          {/* Direct Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 xl:w-56 rounded-full bg-stone-50 pl-9 pr-4 text-xs focus:bg-white focus:border-stone-400 focus:ring-1 focus:ring-stone-400"
            />
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
          </form>

          {/* User Account / Avatar Dropdown */}
          <div>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center h-8 w-8 rounded-full border border-stone-200 bg-stone-100 hover:border-stone-400 transition cursor-pointer overflow-hidden shadow-sm outline-none">
                    <Avatar className="h-full w-full">
                      <AvatarImage
                        src={currentUser.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                        alt="Avatar"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xs bg-stone-200">
                        {currentUser.user?.displayName?.substring(0, 2).toUpperCase() || 'US'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 mt-1.5 p-1 bg-white border border-stone-200 rounded-xl shadow-xl">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <p className="text-[10px] text-stone-400 font-medium">Tài khoản</p>
                    <p className="truncate text-xs font-semibold text-stone-700 mt-0.5">
                      {currentUser.user?.displayName || currentUser.user?.username || currentUser.user?.email}
                    </p>
                  </div>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault()
                      setIsProfileOpen(true)
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-md cursor-pointer"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    Hồ sơ cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-md cursor-pointer"
                  >
                    <Shield className="h-3.5 w-3.5" />
                    Trang quản trị
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-stone-100" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-red-650 hover:bg-red-50 hover:text-red-750 rounded-md cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="rounded-full px-3.5 py-1.5 h-8 gap-1.5 text-xs shadow-sm hover:bg-stone-900 cursor-pointer"
              >
                <Link to="/auth/login">
                  <User className="h-3.5 w-3.5" />
                  Đăng nhập
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* MOBILE CONTROLS TOGGLE */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Quick search icon for mobile header that redirects to posts */}
          <Link to="/posts" className="text-stone-500 hover:text-primary p-1">
            <Search className="h-5 w-5" />
          </Link>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-stone-500 hover:text-primary p-1 h-8 w-8 cursor-pointer">
                <Menu className="h-5.5 w-5.5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white p-6 shadow-2xl border-l border-stone-150 flex flex-col justify-between" showCloseButton={true}>
              <div>
                {/* Header inside drawer */}
                <SheetHeader className="p-0 mb-8 border-b border-stone-100 pb-4 flex flex-row items-center justify-between">
                  <SheetTitle className="font-heading text-xl font-black text-primary">VBlog</SheetTitle>
                  <SheetDescription className="sr-only">Thanh điều hướng trên thiết bị di động</SheetDescription>
                </SheetHeader>

                {/* Mobile Search input */}
                <form onSubmit={(e) => { handleSearchSubmit(e); setIsMobileMenuOpen(false); }} className="relative mb-6">
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full bg-stone-50 pl-9 pr-4 text-xs"
                  />
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
                </form>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-4">
                  <NavLink
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-sm font-semibold py-1.5 transition-colors border-l-2 pl-3 ${
                        isActive ? 'border-stone-800 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`
                    }
                  >
                    Trang chủ
                  </NavLink>
                  <NavLink
                    to="/posts"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-sm font-semibold py-1.5 transition-colors border-l-2 pl-3 ${
                        isActive ? 'border-stone-800 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`
                    }
                  >
                    Bài viết
                  </NavLink>
                  <NavLink
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-sm font-semibold py-1.5 transition-colors border-l-2 pl-3 ${
                        isActive ? 'border-stone-800 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`
                    }
                  >
                    Giới thiệu
                  </NavLink>
                  <NavLink
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-sm font-semibold py-1.5 transition-colors border-l-2 pl-3 ${
                        isActive ? 'border-stone-800 text-stone-950 font-bold' : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`
                    }
                  >
                    Liên hệ
                  </NavLink>
                </nav>
              </div>

              {/* Mobile Account Details & Actions */}
              <div className="border-t border-stone-100 pt-6">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    {/* Account display */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-stone-200">
                        <AvatarImage
                          src={currentUser.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                          alt="Avatar"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm bg-stone-200">
                          {currentUser.user?.displayName?.substring(0, 2).toUpperCase() || 'US'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-stone-800 truncate">
                          {currentUser.user?.displayName || currentUser.user?.username || 'VBlog User'}
                        </p>
                        <p className="text-[10px] text-stone-400 truncate">{currentUser.user?.email}</p>
                      </div>
                    </div>

                    {/* Actions buttons */}
                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={() => {
                          setIsProfileOpen(true)
                          setIsMobileMenuOpen(false)
                        }}
                        className="flex items-center gap-2.5 text-xs text-stone-600 hover:text-stone-900 py-2 border-b border-stone-50 text-left cursor-pointer"
                      >
                        <Settings className="h-4 w-4" />
                        Cấu hình hồ sơ
                      </button>
                      <Link
                        to="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 text-xs text-stone-600 hover:text-stone-900 py-2 border-b border-stone-50"
                      >
                        <Shield className="h-4 w-4" />
                        Trang quản lý (Admin)
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 text-xs text-red-655 hover:text-red-755 py-2 pt-3 text-left font-medium cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Đăng xuất tài khoản
                      </button>
                    </div>
                  </div>
                ) : (
                  <Button
                    asChild
                    className="w-full text-xs font-bold py-2.5 h-10 rounded-xl bg-primary hover:bg-stone-900 text-white transition-all shadow-md cursor-pointer"
                  >
                    <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Đăng nhập tài khoản
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* RENDER SHARED DIALOG ACCOUNT PROFILE */}
      {isProfileOpen && (
        <ProfileDialog 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />
      )}
    </header>
  )
}

export default Header
