import { createSlice } from '@reduxjs/toolkit'
import { getDoctors, postAppointment } from './appointment.thunk'

const initialState = {
   doctors: [],
   appointment: '',
}

const appointmentSlice = createSlice({
   name: 'appointment',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getDoctors.fulfilled, (state, { payload }) => {
         state.doctors = payload
         state.appointment = null
      })
      builder.addCase(postAppointment.fulfilled, (state, { payload }) => {
         state.appointment = payload
      })
   },
})

export const appointmentActions = appointmentSlice.actions
export default appointmentSlice
