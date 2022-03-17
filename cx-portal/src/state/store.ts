import { configureStore } from '@reduxjs/toolkit'
import rootMiddleware from './features/middleware'
import rootReducer from './features/reducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: rootMiddleware,
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
