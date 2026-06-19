import { useLocation } from 'react-router-dom'
import { LoginForm } from '~/components/LoginForm'
import { SignupForm } from '~/components/SignupForm'

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/auth/login'
  const isRegister = location.pathname === '/auth/register'

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#0b0f19] p-4 relative overflow-hidden select-none">
      {/* Ambient glowing blobs in background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10">
        {isLogin && <LoginForm />}
        {isRegister && <SignupForm />}
      </div>
    </div>
  )
}

export default Auth
