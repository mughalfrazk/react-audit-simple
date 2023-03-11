import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firmList: [],
  selectedFirm: null,
  actionList: []
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
    },
    setActionList: (state, { payload }) => {
      state.actionList = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFirmsList, setFirmDetail, setActionList } = firmSlice.actions

export default firmSlice.reducer