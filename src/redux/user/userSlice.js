import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ENDPOINT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'

const initialState = {
  currentUser: null
}

// Thunks
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ENDPOINT}/v1/users/login`, data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ENDPOINT}/v1/users/logout`)
    if (showSuccessMessage) {
      toast.success('Logged out successfully!', { position: 'bottom-right' })
    }
    return response.data
  }
)

export const updateUserProfileAPI = createAsyncThunk(
  'user/updateUserProfileAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put(`${API_ENDPOINT}/v1/users/update`, data)
    return response.data
  }
)

// User Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    // logout
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    // update profile
    builder.addCase(updateUserProfileAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

// Selector
export const selectCurrentUser = (state) => state.user.currentUser

export const userReducer = userSlice.reducer
