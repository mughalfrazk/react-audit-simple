import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clientList: [],
  selectedClient: null,
  folders: [],
  selectedFolder: {
    id: 0,
    name: ""
  },
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
    },
    setSelectedFolder: (state, { payload }) => {
      state.selectedFolder.id = payload.id
      state.selectedFolder.name = payload.name
    },
  },
})

// Action creators are generated for each case reducer function
export const { setClientsList, setClientDetail, setFolders, setSelectedFolder } = clientSlice.actions

export default clientSlice.reducer