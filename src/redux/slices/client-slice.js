import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clientList: [],
  selectedClient: null
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { setClientsList, setClientDetail } = clientSlice.actions

export default clientSlice.reducer