import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

type stateType = {
  id?: number
  name?: string
  email?: string
  access_token?: string
}

const initialState: stateType = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export const UserState = (state: RootState) => state.userSlice

export default userSlice.reducer
