import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employeeList: [],
  selectedEmployee: null,
  employeePermissions: []
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
    },
    setEmployeePermissions: (state, { payload }) => {
      state.employeePermissions = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setEmployeesList, setEmployeeDetail, setEmployeePermissions } = employeeSlice.actions

export default employeeSlice.reducer