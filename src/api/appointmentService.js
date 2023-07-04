import { mainApi } from './instanses'

export const getUserAppointmentRequest = () => {
   return mainApi.get('/api/appointments/myAppointments')
}

export const getOneUserAppoinmentRequest = (id) => {
   return mainApi.get(`/api/appointments/myAppointment?id=${id}`)
}

export const postUserFreeTimeAppointmentsRequest = () => {
   return mainApi.post('/api/appointments/free')
}
export const postUserCanceledAppointmentsRequest = (appointmentId) => {
   return mainApi.post(`/api/appointments/canceled=${appointmentId}`)
}
export const deleteAppointmentRequest = (id) => {
   return mainApi.delete('/api/appointments/delete', {
      data: id,
   })
}
export const getDepartmentRequest = () => {
   return mainApi.get('/api/departments/getAll')
}

export const getDoctorRequest = () => {
   return mainApi.get('/api/doctors')
}
export const getAppointmentRequest = (searchValue) => {
   return mainApi.get('/api/appointments', {
      params: {
         keyWord: searchValue,
      },
   })
}
export const deleteUserAppointmentRequest = () => {
   return mainApi.delete('/api/appointments/delete')
}

export const postScheduleRequest = (data) => {
   return mainApi.post('/api/schedule/save', data)
}

export const getScheduleRequest = (startDate, endDate) => {
   return mainApi.get('/api/schedule/', {
      params: {
         startDate,
         endDate,
      },
   })
}
