import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { logoutUser, logoutUserAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/apis'

let axiosReduxStore
export const injectStore = (mainStore) => axiosReduxStore = mainStore

let authorizedAxiosInstance = axios.create()

// Timeout 10 mins
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// Automatically send cookies in every request (for JWT HttpOnly cookies)
authorizedAxiosInstance.defaults.withCredentials = true

// Interceptors Request
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let refreshTokenPromise = null

// Interceptors Response
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Nếu request bị lỗi chính là request logout hoặc refresh, chặn vòng lặp vô hạn và xoá local state luôn
    if (error.config?.url?.includes('/users/logout') || error.config?.url?.includes('/users/refresh')) {
      axiosReduxStore.dispatch(logoutUser())
      return Promise.reject(error)
    }

    // Case 1: Status code is 401 (Unauthorized) -> logout user
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }

    // Case 2: Status code is 410 (Gone) -> refresh token
    const originalRequest = error.config
    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then(data => {
            return data?.accessToken
          })
          .catch((err) => {
            axiosReduxStore.dispatch(logoutUser())
            return Promise.reject(err)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }
      return refreshTokenPromise
        .then(() => {
          return authorizedAxiosInstance(originalRequest)
        })
    }

    interceptorLoadingElements(false)

    // let errorMessage = error.message
    // if (error.response?.data?.message) {
    //   errorMessage = error.response.data.message
    // }

    let errorMessage = error.message
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    }


    // Toast error (ignore status 410 which is handled silently)
    if (error.response?.status !== 410) {
      toast.error(errorMessage, {
        position: 'bottom-left'
      })
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
