import { createSlice } from '@reduxjs/toolkit'
import { putDatas } from './patient.thunk'

const initialState = {
   allDatas: [],
   error: '',
   isLoading: '',
}
const patientSlice = createSlice({
   name: 'patient',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(putDatas.rejected, (state, action) => {
         state.error = action.error
         state.isLoading = false
      })
      builder.addCase(putDatas.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(putDatas.fulfilled, (state, actions) => {
         state.isLoading = false
         state.allDatas = actions.payload
      })
   },
})
export const patientActions = patientSlice.actions
export default patientSlice
