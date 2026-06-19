import { Navigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis'

function AccountVerification() {
  const [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => setVerified(true))
        .catch((err) => console.error('Verification failed:', err))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" />
  }

  if (!verified) {
    return <PageLoadingSpinner caption="Verifying your account..." />
  }

  return <Navigate to={`/auth/login?verifiedEmail=${email}`} />
}

export default AccountVerification
