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
    openPopup(
      state: State,
      { payload }: PayloadAction<{ message: string; type: State['type'] }>
    ) {
      state.open = true
      state.message = payload.message
      state.type = payload.type
    },
    closePopup(state: State) {
      state.open = false
      state.message = ''
    }
  }
})

export const { closePopup, openPopup } = popupSlice.actions
export const PopupState = (state: RootState) => state.popupSlice

export default popupSlice.reducer
