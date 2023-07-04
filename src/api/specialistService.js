import { fileInstance, mainApi } from './instanses'

export const getSpecialists = (queryParams) => {
   return mainApi.get('/api/doctors', {
      params: {
         keyWord: queryParams.keyWord,
      },
   })
}

export const postSpecialistsService = (dataSpecialist) => {
   return mainApi.post('/api/doctors', dataSpecialist)
}

export const postSpecialistIsActiveReq = (id, isActive) => {
   return mainApi.post(
      `/api/doctors/isActive?isActive=${isActive}&doctorId=${id}`
   )
}

export const deleteSpecialistService = (id) => {
   return mainApi.delete(`/api/doctors?doctorId=${id}`)
}

export const getOneSpecialistService = (id) => {
   return mainApi.get(`/api/doctors/find?doctorId=${id}`)
}

export const updateSpecialistService = (putSpecialist) => {
   return mainApi.put(`/api/doctors`, putSpecialist)
}

export const imageSpecialistService = (value) => {
   return fileInstance.post('/api/s3', value)
}
