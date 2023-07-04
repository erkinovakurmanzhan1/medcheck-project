import { mainApi } from './instanses'

export const getGlobalSearchRequest = (searchValue) => {
   return mainApi.get('/api/search', {
      params: {
         word: searchValue,
      },
   })
}
