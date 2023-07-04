import { createSlice } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import {
   deleteAllChecked,
   deleteChecked,
   getApplication,
} from './applications.thunk'

const initialState = {
   application: [],
   error: '',
   isLoading: false,
}

export const applicationSlice = createSlice({
   name: 'application',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getApplication.fulfilled, (state, action) => {
         state.application = action.payload
         state.isLoading = false
         state.error = ''
      })
      builder.addCase(getApplication.pending, (state) => {
         state.isLoading = true
         state.error = ''
      })
      builder.addCase(getApplication.rejected, (state, action) => {
         state.isLoading = false
         state.error = action.error
      })
      builder.addCase(deleteChecked.pending, (state) => {
         state.isLoading = true
         state.error = ''
      })
      builder.addCase(deleteChecked.fulfilled, (state) => {
         state.isLoading = false
         state.error = ''
      })
      builder.addCase(deleteChecked.rejected, (state, action) => {
         state.isLoading = false
         state.error = action.payload
      })
      builder.addCase(deleteAllChecked.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(deleteAllChecked.fulfilled, (state) => {
         state.isLoading = false
         state.error = ''
      })
      builder.addCase(deleteAllChecked.rejected, (state, action) => {
         state.isLoading = false
         state.error = action.error
      })
   },
})
