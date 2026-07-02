import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c2520] flex flex-col justify-between selection:bg-[#704f38]/20 selection:text-[#704f38]">
      <div>
        {/* Header cố định ở trên đầu */}
        <Header />

        {/* Nội dung ở giữa thay đổi động theo từng trang */}
        <main>
          <Outlet />
        </main>
      </div>

      {/* Footer cố định ở dưới cùng */}
      <Footer />
    </div>
  )
}

export default MainLayout
