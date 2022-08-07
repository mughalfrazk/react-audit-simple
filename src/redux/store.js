import { configureStore } from '@reduxjs/toolkit'

import localSlice from './slices/local-slice'

export const store = configureStore({
  reducer: {
    local: localSlice
  },
})