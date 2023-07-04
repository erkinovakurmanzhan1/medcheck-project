import { mainApi } from './instanses'

export const getDoctorsService = (str) => {
   console.log(str)

   return mainApi.get(`/api/doctors/${str}`)
}

export const getOneDoctorService = (id) => {
   return mainApi(`/api/doctors/find?doctorId=${id}`)
}
