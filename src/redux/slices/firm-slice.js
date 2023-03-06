import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firmList: [],
  selectedFirm: null
}

export const firmSlice = createSlice({
  name: 'firm',
  initialState,
  reducers: {
    setFirmsList: (state, { payload }) => {
      state.firmList = payload
    },
    setFirmDetail: (state, { payload }) => {
      state.selectedFirm = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFirmsList, setFirmDetail } = firmSlice.actions

export default firmSlice.reducer