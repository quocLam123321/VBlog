import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { testAuthAPI } from '~/apis'
import { toast } from 'react-toastify'
import { Button } from '~/components/ui/button'
import { ShieldCheck, LogOut } from 'lucide-react'

const Admin = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [testResult, setTestResult] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)

  const handleTestAuth = async () => {
    setLoadingAuth(true)
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
      toast.error('Call API thất bại.')
    } finally {
      setLoadingAuth(false)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUserAPI())
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold font-heading text-primary">Admin Page</h1>
      
      {/* Original Test Auth Panel */}
      <div className="w-full max-w-md border border-stone-200 bg-white p-6 rounded-xl space-y-4 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-bold text-stone-800 text-sm">Bảng điều khiển xác thực (Test Auth)</h3>
          <p className="text-[11px] text-stone-400">User: {currentUser?.user?.email}</p>
        </div>

        <Button 
          onClick={handleTestAuth}
          disabled={loadingAuth}
          className="w-full bg-primary hover:bg-stone-900 text-white font-semibold text-xs py-2 h-10 rounded-xl cursor-pointer"
        >
          <ShieldCheck className="h-4 w-4 mr-2" />
          {loadingAuth ? 'Calling API...' : 'Test Auth API'}
        </Button>

        {testResult && (
          <div className={`p-3 rounded-lg border text-[10px] font-mono max-h-32 overflow-y-auto ${
            testResult.status === 'Success' 
              ? 'bg-emerald-50 border-emerald-250 text-emerald-800' 
              : 'bg-red-50 border-red-250 text-red-800'
          }`}>
            <div className="font-bold mb-1">Status: {testResult.status}</div>
            <pre className="whitespace-pre-wrap">{JSON.stringify(testResult.data || testResult.message, null, 2)}</pre>
          </div>
        )}

        <Button 
          onClick={handleLogout}
          variant="destructive"
          className="w-full text-xs font-semibold py-2 h-10 rounded-xl cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Admin
