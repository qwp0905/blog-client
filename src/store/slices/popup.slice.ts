import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

const popupSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    success(state: State, { payload }: PayloadAction<string>) {
      state.open = true
      state.message = payload
      state.type = 'success'
    },
    error(state: State, { payload }: PayloadAction<string>) {
      state.open = true
      state.message = payload
      state.type = 'error'
    },
    info(state: State, { payload }: PayloadAction<string>) {
      state.open = true
      state.message = payload
      state.type = 'info'
    },
    warning(state: State, { payload }: PayloadAction<string>) {
      state.open = true
      state.message = payload
      state.type = 'warning'
    },
    closePopup(state: State) {
      state.open = false
      state.message = ''
    }
  }
})

export const { closePopup, success, error, warning, info } = popupSlice.actions
export const PopupState = (state: RootState) => state.popupSlice

export default popupSlice.reducer
