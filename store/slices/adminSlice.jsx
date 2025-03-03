import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : null,
  isAuthenticated: !!Cookies.get('admin'),
  loading: false,
  error: null
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.admin = action.payload
      state.error = null
      Cookies.set('admin', JSON.stringify(action.payload), { expires: 7 })
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.admin = null
      state.error = action.payload
      Cookies.remove('admin')
    },
    logout: (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.admin = null
      state.error = null
      Cookies.remove('admin')
    },
    updateAdminInfo: (state, action) => {
      state.admin = { ...state.admin, ...action.payload }
      Cookies.set('admin', JSON.stringify(state.admin), { expires: 7 })
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateAdminInfo,
  clearError
} = adminSlice.actions

export default adminSlice.reducer