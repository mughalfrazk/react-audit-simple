import { configureStore } from '@reduxjs/toolkit'

import localSlice from './slices/local-slice';
import firmSlice from './slices/firm-slice';
import userSlice from './slices/user-slice';
import employeeSlice from './slices/employee-slice';

export const store = configureStore({
  reducer: {
    local: localSlice,
    firm: firmSlice,
    user: userSlice,
    employee: employeeSlice,
  },
})