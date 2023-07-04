import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormLabel, IconButton, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg'
import { ReactComponent as Show } from '../../../assets/login/Vector (3).svg'
import { ReactComponent as ShowOff } from '../../../assets/login/Password.svg'
import { ReactComponent as GoogleIcon } from '../../../assets/login/image 90.svg'
import Input from '../../../components/UI/input/Input'
import Button from '../../../components/UI/Button'
import BasicModal from '../../../components/UI/ModalUi'
import { signUp } from '../../../redux/reducers/auth/auth.thunk'
import useToast from '../../../hooks/useToast'

const SignUp = ({ open, onClose, openSignInHandler }) => {
   const dispatch = useDispatch()
   const [showPassword, setShowPassword] = useState(false)
   const [showPasswordCopy, setShowPasswordCopy] = useState(false)
   const { notify } = useToast()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      mode: 'all',
      defaultValues: {
         firstName: '',
         lastName: '',
         phoneNumber: '',
         email: '',
         password: '',
         copyPassword: '',
      },
   })
   function onSubmit(values) {
      dispatch(signUp({ values, notify, onClose }))
   }
   const showPasswordHandle = () => {
      setShowPassword(!showPassword)
   }
   const clickHandle = (e) => {
      e.preventDefault()
   }
   const showPasswordHandler = () => {
      setShowPasswordCopy(!showPasswordCopy)
   }
   const clickHandler = (e) => {
      e.preventDefault()
   }

   const navigateToSignIn = (e) => {
      e.preventDefault()
      openSignInHandler()
   }

   return (
      <BasicModal open={open} onClose={onClose}>
         <FormControlStyled onSubmit={handleSubmit(onSubmit)}>
            <CloseIcon className="closeIcon" onClick={onClose} />
            <FormLabel className="topic">РЕГИСТРАЦИЯ</FormLabel>
            <div className="inputContainer">
               <Input
                  placeholder="Имя"
                  className="inputStyle"
                  error={errors.name}
                  {...register('firstName', {
                     required: 'Поле не заполнено',
                  })}
               />
               {errors.firstName && (
                  <p className="message">{errors.firstName?.message}</p>
               )}
               <Input
                  placeholder="Фамилия"
                  className="inputStyle"
                  error={errors.surname}
                  {...register('lastName', {
                     required: 'Поле не заполнено',
                  })}
               />
               {errors.lastName && (
                  <p className="message">{errors.lastName?.message}</p>
               )}
               <Input
                  placeholder="+996 (_ _ _) _ _  _ _  _ _ "
                  className="inputStyle"
                  error={errors.number}
                  {...register('phoneNumber', {
                     required: 'поле не заполнено',
                  })}
               />
               {errors.phoneNumber && (
                  <p className="message">{errors.phoneNumber?.message}</p>
               )}
               <Input
                  placeholder="Email"
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
               {errors.email && (
                  <p className="message">{errors.email?.message}</p>
               )}
               <Input
                  placeholder="Введите пароль"
                  className="inputStyle"
                  error={errors.password}
                  {...register('password', {
                     required: 'Поле не заполнено',
                     maxLength: {
                        value: 15,
                        message: 'Слишком длинный пароль',
                     },
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
                              onMouseDown={clickHandle}
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
               <Input
                  placeholder="Повторите пароль"
                  className="inputStyle"
                  error={errors.password}
                  {...register('copyPassword', {
                     required: 'Поле не заполнено',
                     maxLength: {
                        value: 15,
                        message: 'Слишком длинный пароль',
                     },
                     minLength: {
                        value: 5,
                        message: 'Пароль должен содержать не менее 5 букв',
                     },
                  })}
                  type={showPasswordCopy ? 'text' : 'password'}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton
                              onClick={showPasswordHandler}
                              onMouseDown={clickHandler}
                           >
                              {showPasswordCopy ? <ShowOff /> : <Show />}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               {errors.copyPassword && (
                  <p className="message">{errors.copyPassword?.message}</p>
               )}
            </div>
            <Button className="buttonStyle" type="submit">
               создать аккаунт
            </Button>
            <Line>
               <hr className="lineFirst" />
               <span>или</span>
               <hr className="lineSecond" />
            </Line>
            <Button className="buttonGoogle" startIcon={<GoogleIcon />}>
               <NavLink className="google" href="/">
                  Зарегистрироваться с Google
               </NavLink>
            </Button>
            <div className="register">
               <span>У вас уже есть аккаунт?</span>
               <Link to="/" onClick={navigateToSignIn}>
                  Войти
               </Link>
            </div>
         </FormControlStyled>
      </BasicModal>
   )
}

export default SignUp

const FormControlStyled = styled('form')(() => ({
   width: ' 494px',
   paddingBottom: '40px',
   borderRadius: '2px',
   background: '#FFFFFF',
   boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
   '& .inputContainer': {
      marginTop: '10px',
      marginLeft: '40px',
   },
   '& .topic': {
      fontFamily: 'Manrope',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '25px',
      marginLeft: '180px',
      color: '#222222',
   },
   '& .closeIcon': {
      marginLeft: '450px',
      marginTop: '29px',
      cursor: 'pointer',
   },
   '& .inputStyle': {
      fontFamily: 'Manrope',
      width: '414px',
      borderRadius: ' 10px',
      marginBottom: '5px',
      border: '1px solid #D9D9D9',
   },
   '& .buttonStyle': {
      height: '33px',
      width: '420px',
      marginLeft: '40px',
      marginTop: '10px',
      borderRadius: ' 10px',
      fontSize: '14px',
      marginBottom: '18px',
   },
   '& .buttonGoogle': {
      height: '30px',
      width: '420px',
      marginLeft: '40px',
      marginTop: '14px',
      marginBottom: '15px',
      padding: '10px 20px 10px 20px',
      background: '#F5F5F5',
      fontFamily: 'Manrope',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '16px',
      color: '#222222',
      textDecoration: 'none',
      '&:hover': {
         background: '#F5F5F5',
      },
   },
   '& .register': {
      marginLeft: '165px',
      textDecoration: 'none',
      color: '#3772FF',
      fontFamily: 'Manrope',
      fontSize: '14px',
      fontWeight: 400,
      '& span': {
         color: '#222222',
      },
   },
   '& .google': {
      textDecoration: 'none',
      color: '#222222',
      marginLeft: '15px',
   },
   '& .message': {
      color: 'red',
   },
}))

const Line = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   '& .lineFirst': {
      width: '170px',
      height: '0px',
      color: '#F3F1F1',
      marginTop: '10px',
      marginLeft: '38px',
   },
   '& span': {
      marginBottom: '-13px',
      fontSize: '14px',
      fontWeight: 400,
      color: '#222222',
      fontFamily: 'Manrope',
   },
   '& .lineSecond': {
      width: '170px',
      height: '0px',
      color: '#F3F1F1',
      marginTop: '10px',
      marginRight: '38px',
   },
}))
