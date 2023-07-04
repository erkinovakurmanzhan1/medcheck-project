import { mainApi } from './instanses'

export const postApplication = (data) => {
   return mainApi.post('/api/applications/add', data)
}
