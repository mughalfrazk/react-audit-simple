import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employeeList: [],
  selectedEmployee: null
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeesList: (state, { payload }) => {
      state.employeeList = payload
    },
    setEmployeeDetail: (state, { payload }) => {
      state.selectedEmployee = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setEmployeesList, setEmployeeDetail } = employeeSlice.actions

export default employeeSlice.reducer