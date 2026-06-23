import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { Button } from '~/components/ui/button'
import { LogOut, ShieldCheck } from 'lucide-react'
import { testAuthAPI } from '~/apis'
import { toast } from 'react-toastify'

function Home() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUserAPI())
  }

  const handleTestAuth = async () => {
    setLoading(true)
    setTestResult(null)
    try {
      const data = await testAuthAPI()
      setTestResult({
        status: 'Success',
        data: data
      })
      toast.success('Call API thành công!')
    } catch (error) {
      setTestResult({
        status: 'Error',
        message: error.response?.data?.error || error.message
      })
    } finally {
      setLoading(false)
    }
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
            {currentUser?.user?.email || 'user@example.com'}
          </div>
        </div>

        <div className="w-full space-y-4">
          <Button 
            onClick={handleTestAuth}
            disabled={loading}
            className="w-full h-10 rounded-xl cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 active:scale-[0.98]"
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            {loading ? 'Calling API...' : 'Test Auth API'}
          </Button>

          {testResult && (
            <div className={`p-4 rounded-xl border text-xs font-mono max-h-40 overflow-y-auto ${
              testResult.status === 'Success' 
                ? 'bg-emerald-950/20 border-emerald-800 text-emerald-300' 
                : 'bg-red-950/20 border-red-800 text-red-300'
            }`}>
              <div className="font-bold mb-1">Status: {testResult.status}</div>
              <pre className="whitespace-pre-wrap">{JSON.stringify(testResult.data || testResult.message, null, 2)}</pre>
            </div>
          )}

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
    </div>
  )
}

export default Home
