import { mainApi } from './instanses'

export const signInRequest = (userData) => {
   return mainApi.post('api/auth/signIn', userData)
}
export const signUpRequest = (userData) => {
   return mainApi.post('api/auth/signUp', userData)
}
// export const forgotPassword = ({ email }) => {
//    return mainApi.post(
//       `/api/user/forgot_password?email=${email}&link=http://localhost:3000/?open=reset-password`
//    )
// }
