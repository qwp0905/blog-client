import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { RootState } from '..'

interface State {
  open: boolean
  message: string
  type: 'error' | 'warning' | 'info' | 'success'
}

const initialState: State = {
  open: false,
  message: '',
  type: 'info'
}

const toastSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openToast(state: State, { payload }: PayloadAction<Omit<State, 'open'>>) {
      state.open = true
      state.message = payload.message
      state.type = payload.type
    },
    closeToast(state: State) {
      state.open = false
      state.message = ''
    }
  }
})

export const { closeToast, openToast } = toastSlice.actions
export const ToastState = (state: RootState) => state.toastSlice

export default toastSlice.reducer
