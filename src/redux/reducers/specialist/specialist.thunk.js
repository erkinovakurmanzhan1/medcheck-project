import { createAsyncThunk } from '@reduxjs/toolkit'
import { imageSpecialistService } from '../../../api/specialistService'

export const uploadFile = createAsyncThunk(
   'specialist/put',
   async (payload, { rejectWithValue }) => {
      try {
         const data = await imageSpecialistService(payload)
         console.log(data.data.link)
         return data.data.link
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
