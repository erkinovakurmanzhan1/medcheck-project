import { createAsyncThunk } from '@reduxjs/toolkit'
import { putPatients } from '../../../api/patientsService'

export const putDatas = createAsyncThunk(
   'patient/putDatas',
   async (datasOfPatient, { rejectWithValue }) => {
      try {
         const { data } = await putPatients(datasOfPatient)
         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
