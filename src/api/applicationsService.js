// eslint-disable-next-line import/no-cycle
import { mainApi } from './instanses'

export const getApplicatonRequest = (searchValue) => {
   return mainApi.get('/api/applications/getAll', {
      params: {
         word: searchValue,
      },
   })
}
export const deleteCheckedRequest = (id) => {
   return mainApi.delete(`/api/applications`, {
      data: [id],
   })
}
export const deleteAllCheckedRequest = (id) => {
   return mainApi.delete(`/api/applications`, {
      data: id,
   })
}
