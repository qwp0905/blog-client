import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

interface State {
  id?: number
  nickname?: string
  email?: string
  access_token?: string
  refresh_token?: string
  created_at?: string
}

const initialState: State = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state: State, { payload }: PayloadAction<State>) {
      Object.assign(state, payload)
    },
    logout() {
      return initialState
    }
  }
})

export const { login, logout } = authSlice.actions
export const AuthState = (state: RootState) => state.authSlice

export default authSlice.reducer
