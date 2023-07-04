import { createSlice } from '@reduxjs/toolkit'
import { uploadFile } from './specialist.thunk'

const initialState = {
   linkPhoto: '',
   error: '',
   isLoading: false,
}

export const specialist = createSlice({
   name: 'specialist',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(uploadFile.fulfilled, (state, action) => {
         console.log(action.payload, 'payload')
         state.linkPhoto = action.payload
         state.isLoading = false
         state.error = ''
      })
      builder.addCase(uploadFile.rejected, (state, action) => {
         state.error = action.payload
      })
      builder.addCase(uploadFile.pending, (state) => {
         state.isLoading = true
      })
   },
})
