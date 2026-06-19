import { API_ENDPOINT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ENDPOINT}/v1/users/register`, data)
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.put(`${API_ENDPOINT}/v1/users/refresh_token`)
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ENDPOINT}/v1/users/verify`, data)
  toast.success('Your account has been verified! Now you can login to enjoy our services!', { theme: 'colored' })
  return response.data
}
