import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { Button } from '~/components/ui/button'
import { LogOut } from 'lucide-react'

function Home() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUserAPI())
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b0f19] p-4 text-slate-200">
      <div className="w-full max-w-md border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Welcome to VBlog</h2>
          <p className="text-sm text-slate-400">
            You are logged in as:
          </p>
          <div className="bg-slate-950/40 border border-slate-800 px-4 py-2 rounded-xl text-indigo-300 font-mono text-sm select-all">
            {currentUser?.email || 'user@example.com'}
          </div>
        </div>
        
        <Button 
          onClick={handleLogout}
          variant="destructive"
          className="w-full h-10 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Home
