import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormLabel, IconButton, InputAdornment } from '@mui/material'
import styled from '@emotion/styled'
import { ReactComponent as CloseIcon } from '../../../assets/login/CloseIcon.svg'
import Input from '../../../components/UI/input/Input'
import Button from '../../../components/UI/Button'
import { ReactComponent as Show } from '../../../assets/login/Vector (3).svg'
import { ReactComponent as ShowOff } from '../../../assets/login/Password.svg'
import BasicModal from '../../../components/UI/ModalUi'

const ChangePassword = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [showPasswordCopy, setShowPasswordCopy] = useState(false)
   const [modal, setModal] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      mode: 'all',
      defaultValues: {
         password: '',
         copyPassword: '',
      },
   })
   function onSubmit(values) {
      console.log('will come values', values)
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
   const closeModalHandler = () => {
      setModal(false)
   }
   return (
      <BasicModal open={modal} onClose={closeModalHandler}>
         <FormControlStyled onSubmit={handleSubmit(onSubmit)}>
            <CloseIcon className="closeIcon" />
            <FormLabel className="topic">смена пароля</FormLabel>
            <p>Вам будет отправлена ссылка для сброса пароля</p>
            <Input
               placeholder="Введите новый пароль"
               className="inputStyle"
               error={errors.password}
               {...register('password', {
                  required: 'поле не заполнено',
                  maxLength: { value: 15, message: 'слишком много деталей' },
                  minLength: { value: 5, message: 'слишком мало деталей' },
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
               error={errors.copyPassword}
               {...register('copyPassword', {
                  required: 'поле не заполнено',
                  maxLength: { value: 15, message: 'слишком много деталей' },
                  minLength: { value: 5, message: 'слишком мало деталей' },
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
            <Button className="buttonStyle" type="submit">
               подтвердить
            </Button>
         </FormControlStyled>
      </BasicModal>
   )
}

export default ChangePassword

const FormControlStyled = styled('form')(() => ({
   height: '400px',
   width: ' 494px',
   borderRadius: '2px',
   background: '#FFFFFF',
   marginLeft: ' 35%',
   boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
   '& .topic': {
      fontFamily: 'Manrope',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '25px',
      marginLeft: '167px',
      marginTop: ' 17px',
      color: '#222222',
      textTransform: ' uppercase',
   },
   '& p': {
      margin: '24px 115px 20px 40px',
      color: '#959595',
      fontSize: '16px',
   },
   '& .closeIcon': {
      marginLeft: '450px',
      marginTop: '19px',
   },
   '& .inputStyle': {
      fontFamily: 'Manrope',
      width: '414px',
      marginLeft: '40px',
      borderRadius: ' 10px',
      marginBottom: '10px',
      border: '1px solid #D9D9D9',
   },
   '& .buttonStyle': {
      height: '47px',
      width: '414px',
      marginLeft: '40px',
      marginTop: '10px',
      borderRadius: ' 10px',
      fontSize: '14px',
   },
   '& .message': {
      color: 'red',
      marginLeft: '50px',
      marginTop: '-5px',
   },
}))
