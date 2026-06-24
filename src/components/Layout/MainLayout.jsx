import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      {/* Shared Header Navigation */}
      <Header />
      
      {/* Page Content Outlet */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>
      
      {/* Shared Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
