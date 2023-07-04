import { createAsyncThunk } from '@reduxjs/toolkit'
import {
   cancelAppointmentService,
   getDoctorsService,
   postAppointmentService,
} from '../../../api/onlineAppointmentService'

export const getDoctors = createAsyncThunk(
   'appointments/free',
   async (department, { rejectWithValue }) => {
      try {
         const { data } = await getDoctorsService(department)
         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const postAppointment = createAsyncThunk(
   'appointments/post',
   async ({ obj, notify }, { rejectWithValue }) => {
      try {
         const { data } = await postAppointmentService(obj)
         notify('success', 'Вы успешно записались!')
         return data
      } catch (error) {
         notify('error', error.response?.data.message)
         return rejectWithValue(error)
      }
   }
)

export const cancelAppointment = createAsyncThunk(
   'appointments/canceled',
   async ({ appointmentId, notify }, { rejectWithValue }) => {
      try {
         const { data } = await cancelAppointmentService(appointmentId)
         notify('success', 'Запись удалена!')
         return data
      } catch (error) {
         notify('error', error.response?.data.message)
         return rejectWithValue(error)
      }
   }
)
