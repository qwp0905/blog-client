import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth.slice'
import popupSlice from './slices/popup.slice'

const reducers = combineReducers({ authSlice, popupSlice })

export const store = configureStore({
  reducer: reducers,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({})
  },
  devTools: process.env.NODE_ENV === 'development',
  enhancers: (defaultEnhacers) => [...defaultEnhacers]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
