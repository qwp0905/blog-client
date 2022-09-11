import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './slices/auth.slice'
import popupSlice from './slices/popup.slice'

const reducers = combineReducers({ authSlice, popupSlice })

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage
  },
  reducers
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  },
  devTools: process.env.NODE_ENV === 'development',
  enhancers: (defaultEnhacers) => [...defaultEnhacers]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
