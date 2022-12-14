import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { AccountOrigin, AccountRole } from '../../@types/account'

interface State {
  id?: number
  nickname?: string
  email?: string
  role?: AccountRole
  origin?: AccountOrigin
  access_token?: string
  refresh_token?: string
  created_at?: string
}

const initialState: State = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateInfo(state: State, { payload }: PayloadAction<State>) {
      Object.assign(state, payload)
    },
    deleteInfo() {
      return initialState
    }
  }
})

export const { updateInfo, deleteInfo } = authSlice.actions
export const AuthState = (state: RootState) => state.authSlice

export default authSlice.reducer
