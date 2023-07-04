import { mainApi } from './instanses'

export const getDoctorsService = (userData) => {
   return mainApi.post('api/appointments/free', userData)
}

export const postAppointmentService = (userData) => {
   return mainApi.post('api/appointments', userData)
}

export const cancelAppointmentService = (userData) => {
   return mainApi.post('api/appointments/canceled', userData)
}
