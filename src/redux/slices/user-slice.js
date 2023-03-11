import { createSlice } from '@reduxjs/toolkit'

import constants from '../../constants';

const initialState = {
  detail: null,
  role: {
    isSuperAdmin: false,
    isAdmin: false,
    isEmployee: false
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, { payload }) => {
      state.detail = payload;
      state.role.isSuperAdmin = payload.role.identifier === constants.roles.SUPER_ADMIN;
      state.role.isAdmin = payload.role.identifier === constants.roles.ADMIN;
      state.role.isEmployee = payload.role.identifier === constants.roles.EMPLOYEE;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetail } = userSlice.actions
export default userSlice.reducer