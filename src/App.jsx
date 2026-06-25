import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/user/userSlice";

import MainLayout from "./components/layouts/MainLayout";

import AccountVerification from "./pages/Auth/AccountVerification";
import AdminPage from "./pages/Admin";
import PostsPage from "./pages/Posts";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import PostDetailPage from "./pages/PostDetail";


// Protected Route: Yêu cầu đăng nhập mới được truy cập các Route bên trong
const ProtectedRoute = ({ currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return <Outlet />;
};


// const ProtectedRoute = () => {
//   return <Outlet />;
// };

// Public Route: Đã đăng nhập rồi thì không cho quay lại trang đăng nhập/đăng ký
const PublicRoute = ({ currentUser }) => {
  if (currentUser) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};
// const PublicRoute = () => {
//   return <Outlet />;
// };

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Tuyến đường bảo vệ */}
        <Route element={<ProtectedRoute currentUser={currentUser} />}>
          <Route path="/" element={<HomePage />} />

          {/* 2. ĐƯA ROUTE ADMIN VÀO ĐÂY */}
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* KHỐI ROUTE NGOÀI */}
      <Route element={<PublicRoute currentUser={currentUser} />}>
        <Route path="/auth/login" element={<AuthPage />} />
        <Route path="/auth/register" element={<AuthPage />} />
      </Route>

      <Route path="/account/verification" element={<AccountVerification />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default App;
