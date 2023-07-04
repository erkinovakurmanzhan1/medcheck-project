import { mainApi } from './instanses'

export const getDataPatiendService = () => {
   return mainApi.get('/api/patients/getResult')
}

export const postDataProfileService = (dataProfile) => {
   return mainApi.put('/api/patients', dataProfile)
}

export const postChangePassword = (password) => {
   return mainApi.post('/api/auth/changePassword', password)
}
