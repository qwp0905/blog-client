import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface State {
  id?: number
  name?: string
  email?: string
  access_token?: string
}

const initialState: State = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
})

export const AuthState = (state: RootState) => state.authSlice

export default authSlice.reducer
