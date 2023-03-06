import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  detail: null,
  selectedFirm: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, { payload }) => {
      state.detail = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetail } = userSlice.actions
export default userSlice.reducer