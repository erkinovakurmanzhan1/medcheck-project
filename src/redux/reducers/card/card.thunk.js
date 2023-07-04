import { createAsyncThunk } from '@reduxjs/toolkit'
import { postApplication } from '../../../api/apllicationsService'

export const postDatas = createAsyncThunk(
   'card/postDatas',
   async (patientData, { rejectWithValue }) => {
      try {
         const { data } = await postApplication(patientData)
         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
