import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarToggle: false,
  globalLoading: false,
  globalError: "",
}

export const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    setSidebarToggle: (state, action) => {
      if ('payload' in action) state.sidebarToggle = action?.payload;
      else state.sidebarToggle = !state.sidebarToggle
    },
    setGlobalLoading: (state, action) => {
      if ('payload' in action) state.globalLoading = action?.payload;
      else state.globalLoading = !state.globalLoading
    },
    setGlobalError: (state, action) => {
      state.globalError = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSidebarToggle, setGlobalLoading, setGlobalError } = localSlice.actions

export default localSlice.reducer