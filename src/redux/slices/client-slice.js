import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clientList: [],
  selectedClient: null,
  folders: []
}

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClientsList: (state, { payload }) => {
      state.clientList = payload
    },
    setClientDetail: (state, { payload }) => {
      state.selectedClient = payload
    },
    setFolders: (state, { payload }) => {
      state.folders = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setClientsList, setClientDetail, setFolders } = clientSlice.actions

export default clientSlice.reducer