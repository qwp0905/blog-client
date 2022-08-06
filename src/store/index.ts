import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user.slice'

const reducers = combineReducers({ userSlice: userSlice })

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
