import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarToggle: false
}

export const localSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSidebarToggle: (state, action) => {
      if ('payload' in action) state.sidebarToggle = action?.payload;
      else state.sidebarToggle = !state.sidebarToggle
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSidebarToggle } = localSlice.actions

export default localSlice.reducer