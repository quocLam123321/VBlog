import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home'
import ListPage from './pages/ListPage'
import About from './pages/About'
import Contact from './pages/Contact'
import PostDetail from './pages/PostDetail'
import Admin from './pages/Admin'
import MainLayout from './components/Layout/MainLayout'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
import AccountVerification from './pages/Auth/AccountVerification'

// Protected Route: Yêu cầu đăng nhập mới được truy cập các Route bên trong
const ProtectedRoute = ({ currentUser }) => {
  if (!currentUser) {
    return <Navigate to='/auth/login' replace={true} />
  }
  return <Outlet />
}

// Public Route: Đã đăng nhập rồi thì không cho quay lại trang đăng nhập/đăng ký
const PublicRoute = ({ currentUser }) => {
  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  
  return (
    <Routes>
      {/* Các route sử dụng Layout chung (Header & Footer) */}
      <Route element={<MainLayout />}>
        {/* Các trang công khai cho mọi người */}
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<ListPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Các trang yêu cầu đăng nhập và dùng chung Layout */}
        <Route element={<ProtectedRoute currentUser={currentUser} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
      
      {/* Routes công khai cho khách (Không dùng Layout chung) */}
      <Route element={<PublicRoute currentUser={currentUser} />}>
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/auth/register" element={<Auth />} />
      </Route>
      
      {/* Route xác thực tài khoản qua link email */}
      <Route path="/account/verification" element={<AccountVerification />} />
      
      {/* Fallback route - Chuyển hướng nếu truy cập link không hợp lệ */}
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  )
}

export default App
