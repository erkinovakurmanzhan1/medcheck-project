import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../reducers/auth/auth.slice'
import patientSlice from '../reducers/patient/patient.slice'
import { specialist } from '../reducers/specialist/specialist.slice'
import { applicationSlice } from '../reducers/applications/applications.slice'
import appointmentSlice from '../reducers/appointment/appointment.slice'

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [patientSlice.name]: patientSlice.reducer,
      [specialist.name]: specialist.reducer,
      [applicationSlice.name]: applicationSlice.reducer,
      [appointmentSlice.name]: appointmentSlice.reducer,
   },
})
