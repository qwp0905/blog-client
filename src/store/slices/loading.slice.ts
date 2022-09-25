import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface State {
  is_loading: boolean
}

const initialState: State = {
  is_loading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state: State) {
      state.is_loading = true
    },
    completeLoading(state: State) {
      state.is_loading = false
    }
  }
})

export const { startLoading, completeLoading } = loadingSlice.actions
export const LoadingState = (state: RootState) => state.loadingSlice

export default loadingSlice.reducer
