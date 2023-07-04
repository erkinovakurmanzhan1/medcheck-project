import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import {
   styled,
   FormControl,
   InputLabel,
   InputAdornment,
   IconButton,
} from '@mui/material'
import { ReactComponent as VisibilityOff } from '../../../../assets/icons/VisibilityOff.svg'
import { ReactComponent as Visibility } from '../../../../assets/icons/Visibility.svg'
import Button from '../../../../components/UI/Button'
import Input from '../../../../components/UI/input/Input'
import { postChangePassword } from '../../../../api/profileService'
import useToast from '../../../../hooks/useToast'
import ProfileLayout from './ProfileLayout'

const ChangePassword = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [showPasswordNew, setShowPasswordCopy] = useState(false)
   const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
   const { notify } = useToast()
   const [backendError, setBackendError] = useState('')

   const navigate = useNavigate()
   const postPassword = async (password) => {
      try {
         const { data } = await postChangePassword(password)
         if (data.message === 'Неверный старый пароль') {
            return notify('error', 'Неверный пароль')
         }
         navigate('/')
         notify('success', 'Пароль успешно изменен!')
         return data
      } catch (error) {
         setBackendError(error.response.data.message)
         return notify('error', 'Не правильный пароль')
      }
   }

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
   } = useForm({
      mode: 'all',
      defaultValues: {
         password: '',
         newwPassword: '',
         confirmPassword: '',
      },
   })

   function onSubmit(values) {
      const { password, newwPassword, confirmPassword } = values
      if (newwPassword !== confirmPassword) {
         notify('error', 'Пароли не совпадают')
         return
      }
      const passwordData = {
         oldPassword: password,
         newPassword: newwPassword,
      }

      postPassword(passwordData)
   }

   const handleClickShowPassword = () => setShowPassword((show) => !show)
   const handleClickshowPasswordCopy = () =>
      setShowPasswordCopy((show) => !show)
   const handleClickshowPasswordConfirm = () =>
      setShowPasswordConfirm((show) => !show)

   const clickHandler = (event) => {
      event.preventDefault()
   }

   return (
      <Container onSubmit={handleSubmit(onSubmit)}>
         <ProfileLayout />
         <StyledTitleText>Смена пароля</StyledTitleText>
         <StyledForm>
            <div>
               <StyledInputLabel htmlFor="old_password">
                  Старый пароль
               </StyledInputLabel>
               <FormControl variant="outlined">
                  <StyledInput
                     id="old_password"
                     placeholder="Введите ваш пароль"
                     className="inputStyle"
                     error={errors.password}
                     {...register('password', {
                        required: 'Введите старый пароль',
                     })}
                     type={showPassword ? 'text' : 'password'}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={handleClickShowPassword}
                                 onMouseDown={clickHandler}
                              >
                                 {showPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
               </FormControl>
               {errors.password && (
                  <StyledError className="message">
                     {errors.password?.message}
                  </StyledError>
               )}
            </div>
            <div>
               <StyledInputLabel htmlFor="new_password">
                  Новый пароль
               </StyledInputLabel>
               <FormControl variant="outlined">
                  <StyledInput
                     placeholder="Введите новый пароль"
                     id="new_password"
                     className="inputStyle"
                     error={errors.newwPassword}
                     {...register('newwPassword', {
                        required: 'Поле не заполнено',
                        maxLength: {
                           value: 15,
                           message: 'Слишком много деталей',
                        },
                        minLength: {
                           value: 5,
                           message: 'Слишком мало деталей',
                        },
                     })}
                     type={showPasswordNew ? 'text' : 'password'}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={handleClickshowPasswordCopy}
                                 onMouseDown={clickHandler}
                              >
                                 {showPasswordNew ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
                  {errors.newwPassword && (
                     <StyledError className="message">
                        {errors.newwPassword?.message}
                     </StyledError>
                  )}
               </FormControl>
            </div>
            <StyledError>{backendError}</StyledError>
            <div>
               <StyledInputLabel htmlFor="confirm_password">
                  Подтвердить новый пароль
               </StyledInputLabel>
               <FormControl variant="outlined">
                  <StyledInput
                     className="inputStyle"
                     placeholder="Подтвердите пароль"
                     id="confirm_password"
                     error={errors.confirmPassword}
                     {...register('confirmPassword', {
                        required: 'Пароль не совпадает',
                        maxLength: {
                           value: 15,
                           message: 'Слишком много деталей',
                        },
                        minLength: {
                           value: 5,
                           message: 'Слишком мало деталей',
                        },
                        validate: (value) =>
                           value === getValues('newwPassword') ||
                           'Пароли не совпадают',
                     })}
                     type={showPasswordConfirm ? 'text' : 'password'}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={handleClickshowPasswordConfirm}
                                 onMouseDown={clickHandler}
                              >
                                 {showPasswordConfirm ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
                  {errors.confirmPassword && (
                     <StyledError className="message">
                        {errors.confirmPassword?.message}
                     </StyledError>
                  )}
               </FormControl>
            </div>
         </StyledForm>
         <StyledBoxButton>
            <StyledButton
               variant="contained"
               onClick={() => {
                  navigate('/')
               }}
            >
               Назад
            </StyledButton>
            <Button type="submit" variant="outlined">
               Подтвердить
            </Button>
         </StyledBoxButton>
      </Container>
   )
}

export default ChangePassword

const Container = styled('form')`
   width: 85%;
   margin-top: 26px;
   margin-bottom: 40px;

   margin: auto;
`

const StyledError = styled('p')`
   font-family: 'Manrope';
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 22px;
`

const StyledTitleText = styled('h1')`
   font-family: 'Manrope';
   font-weight: 600;
   font-size: 1.13rem;
   line-height: 25px;
   color: #222222;
   margin-bottom: 20px;
   letter-spacing: 0.2px;
`

const StyledForm = styled('div')(() => ({
   '& ': {
      width: '100%',
      marginBottom: '5px',
   },
   '& p': {
      fontSize: '1rem',
      color: '#f91515',
      fontFamily: 'Manrope',
      fontWeight: 400,
      lineHeight: '19px',
      marginBottom: '4px',
   },
   '& .inputStyle': {
      width: '180%',
      marginLeft: '2px',
      borderRadius: ' 8px',
      marginBottom: '22px',
      border: '1px solid #D9D9D9',

      '& input:hover': {
         width: '180%',
         border: '1px #ffffff',
      },
      '& input:active': {
         width: '180%',
      },
   },

   '& .message': {
      color: '#f13131',
      fontSize: '0.75rem',
      marginLeft: '10px',
      marginTop: '-24px',
   },
}))

const StyledBoxButton = styled('div')`
   max-width: 60%;
   min-width: 50%;
   display: flex;
   justify-content: start;
   margin-top: 26px;
   margin-bottom: 40px;
   gap: 20px;
   & button {
      width: 31%;
   }
`

const StyledButton = styled(Button)(() => ({
   '&': {
      fontFamily: 'Manrope,sans-serif',
      padding: '14px 67px',
      lineHeight: '16px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#027B44',
      background: '#FFFFFF',
      border: '2px solid #027B44',
      borderRadius: '10px',
      letterSpacing: ' 0.1em',
   },
   '&:hover': {
      color: '#027B44',
      background: '#FFFFFF',
   },
   '&:active': {
      background: 'linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%)',
      color: '#FFFF',
   },
   '&:disabled': {
      background: '#D3D3D3',
      color: '#FFFF',
   },
}))

const StyledInputLabel = styled(InputLabel)(() => ({
   '&': {
      fontSize: '1rem',
      color: '#464444',
      fontFamily: 'Manrope',
      fontWeight: 400,
      lineHeight: '19px',
   },
}))

const StyledInput = styled(Input)(() => ({
   '& .inputStyle': {
      fontSize: '1rem',
      width: '220px',
   },
   '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
      fontSize: '1rem',
      color: '#959595',
      fontFamily: 'Manrope',
      fontWeight: 400,
      lineHeight: '22px',
   },
}))
