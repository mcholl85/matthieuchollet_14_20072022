import tableReducer from '../features/table'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>