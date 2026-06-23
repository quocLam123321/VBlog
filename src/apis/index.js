import { API_ENDPOINT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ENDPOINT}/api/v1/users`, data)
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ENDPOINT}/api/v1/users/refresh`)
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ENDPOINT}/api/v1/users/verify`, data)
  toast.success('Your account has been verified! Now you can login to enjoy our services!', { theme: 'colored' })
  return response.data
}

export const testAuthAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ENDPOINT}/api/v1/users/me`)
  return response.data
}
