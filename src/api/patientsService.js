import { fileInstance, mainApi } from './instanses'

export const getPatients = (searchValue) => {
   return mainApi.get('/api/patients', {
      params: {
         word: searchValue,
      },
   })
}
export const getAllPatientsById = (id) => {
   return mainApi.get(`/api/patients/${id}`)
}
// export const getResultsById = (id) => {
//    return mainApi.get(`/api/results/${id}`, { param: { patientId: id } })
// }
export const putPatients = (datasOfPatient) => {
   return mainApi.post('/api/results', datasOfPatient)
}
export const deletePatientService = (id) => {
   return mainApi.delete(`/api/patients/`, {
      params: {
         id,
      },
   })
}
export const uploadFiles = (body) => {
   return fileInstance.post('/api/s3', body)
}
export const downloadFiles = (link) => {
   return fileInstance.get(`/api/s3/download/${link}`)
}
