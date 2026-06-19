import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home'
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
      {/* Routes được bảo vệ */}
      <Route element={<ProtectedRoute currentUser={currentUser} />}>
        <Route path="/" element={<Home />} />
      </Route>
      
      {/* Routes công khai cho khách */}
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
