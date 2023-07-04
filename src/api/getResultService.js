import { mainApi } from './instanses'

export const getResultRequest = (orderNumber) => {
   return mainApi.get('/api/results', {
      params: {
         orderNumber,
      },
   })
}
