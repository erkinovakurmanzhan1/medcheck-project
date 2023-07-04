import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormLabel, IconButton, InputAdornment } from '@mui/material'
import styled from '@emotion/styled'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as CloseIcon } from '../../../assets/login/CloseIcon.svg'
import { ReactComponent as Show } from '../../../assets/login/Vector (3).svg'
import { ReactComponent as ShowOff } from '../../../assets/login/Password.svg'
import { ReactComponent as GoogleIcon } from '../../../assets/login/image 90.svg'
import Button from '../../../components/UI/Button'
import BasicModal from '../../../components/UI/ModalUi'
import { signIn } from '../../../redux/reducers/auth/auth.thunk'
import useToast from '../../../hooks/useToast'
import Spiner from '../../../components/UI/Spiner'
import Input from '../../../components/UI/input/Input'

const SignIn = ({ open, onClose, openSignUpHandler, openForgotPassword }) => {
   const dispatch = useDispatch()
   const { isAuthorized, isLoading } = useSelector((state) => state.auth)
   const [showPassword, setShowPassword] = useState(false)
   const { notify } = useToast()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      mode: 'all',
      defaultValues: {
         email: '',
         password: '',
      },
   })

   useEffect(() => {
      if (isAuthorized) {
         onClose()
      }
   }, [isAuthorized])

   function onSubmit(values) {
      dispatch(signIn({ values, notify }))
   }

   const showPasswordHandle = () => {
      setShowPassword(!showPassword)
   }

   const clickHanlder = (e) => {
      e.preventDefault()
   }

   const navigateToSignUp = (e) => {
      e.preventDefault()
      openSignUpHandler()
   }

   const navigateToForgotPassword = (e) => {
      e.preventDefault()
      openForgotPassword()
   }

   return (
      <BasicModal open={open} onClose={onClose}>
         <FormControlStyled onSubmit={handleSubmit(onSubmit)}>
            <CloseIcon className="closeIcon" onClick={onClose} />
            <FormLabel className="topic">ВОЙТИ</FormLabel>
            <Input
               placeholder="Логин"
               className="inputStyle"
               error={errors.email}
               {...register('email', {
                  required: 'Поле не заполнено',
                  pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                     message: 'Неверный формат электронной почты',
                  },
               })}
            />
            {errors.email && <p className="message">{errors.email?.message}</p>}
            <Input
               placeholder="Пароль"
               className="inputStyle"
               error={errors.password}
               {...register('password', {
                  required: 'Поле не заполнено',
                  maxLength: { value: 15, message: 'Слишком длинный пароль' },
                  minLength: {
                     value: 5,
                     message: 'Пароль должен содержать не менее 5 букв',
                  },
               })}
               type={showPassword ? 'text' : 'password'}
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end">
                        <IconButton
                           onClick={showPasswordHandle}
                           onMouseDown={clickHanlder}
                        >
                           {showPassword ? <ShowOff /> : <Show />}
                        </IconButton>
                     </InputAdornment>
                  ),
               }}
            />
            {errors.password && (
               <p className="message">{errors.password?.message}</p>
            )}
            {isLoading ? (
               <Spiner />
            ) : (
               <Button className="buttonStyle" type="submit">
                  ВОЙТИ
               </Button>
            )}

            <NavLink
               className="password"
               to="/"
               onClick={navigateToForgotPassword}
            >
               ЗАБЫЛИ ПАРОЛЬ ?
            </NavLink>
            <Line>
               <hr className="lineFirst" />
               <span>или</span>
               <hr className="lineSecond" />
            </Line>
            <Button className="buttonGoogle" startIcon={<GoogleIcon />}>
               <NavLink to="/" className="google">
                  Продолжить с Google
               </NavLink>
            </Button>
            <div className="register">
               <span>Нет аккаунта? </span>
               <Link to="/" onClick={navigateToSignUp}>
                  Зарегистрироваться
               </Link>
            </div>
         </FormControlStyled>{' '}
      </BasicModal>
   )
}

export default SignIn

const FormControlStyled = styled('form')(() => ({
   width: ' 494px',
   borderRadius: '2px',
   background: '#FFFFFF',
   paddingBottom: '40px',
   boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
   '& .topic': {
      fontFamily: 'Manrope',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '25px',
      marginLeft: '210px',
      marginTop: ' 17px',
      color: '#222222',
   },
   '& .closeIcon': {
      marginLeft: '450px',
      marginTop: '19px',
      cursor: 'pointer',
   },
   '& .inputStyle': {
      fontFamily: 'Manrope',
      width: '390px',
      marginLeft: '60px',
      marginTop: ' 14px',
      borderRadius: ' 10px',
      border: '1px solid #D9D9D9',
   },
   '& .buttonStyle': {
      height: '52px',
      width: '390px',
      marginLeft: '60px',
      marginTop: '20px',
      borderRadius: ' 10px',
      fontSize: '14px',
      marginBottom: '28px',
   },
   '& .buttonGoogle': {
      height: '39px',
      width: '390px',
      marginLeft: '60px',
      marginTop: '24px',
      marginBottom: '20px',
      padding: '10px 20px 10px 20px',
      background: '#F5F5F5',
      fontFamily: 'Manrope',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '16px',
      color: '#222222',
      '&:hover': {
         background: '#F5F5F5',
      },
   },
   '& .password': {
      fontFamily: 'Manrope',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '16px',
      marginLeft: '185px',
      marginTop: '500px',
      color: '#346EFB',
      textDecoration: 'none',
   },
   '& .register': {
      marginLeft: '149px',
      textDecoration: 'none',
      color: '#3772FF',
      fontFamily: 'Manrope',
      fontWeight: 400,
      fontSize: '14px',
      '& span': {
         color: '#222222',
         marginBottom: '50px',
      },
   },
   '& .google': {
      textDecoration: 'none',
      color: '#222222',
      marginLeft: '15px',
   },
   '& .message': {
      color: 'red',
      marginLeft: '60px',
   },
}))

const Line = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   '& .lineFirst': {
      width: '215px',
      height: '0px',
      color: '#F3F1F1',
      marginTop: '36px',
   },
   '& span': {
      marginTop: '24px',
      fontSize: '14px',
      fontWeight: 400,
      color: '#222222',
      fontFamily: 'Manrope',
   },
   '& .lineSecond': {
      width: '215px',
      height: '0px',
      color: '#F3F1F1',
      marginTop: '36px',
   },
}))
