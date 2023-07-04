import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import FormInput from './FormInput'
import Button from '../../UI/Button'
import { months } from '../../../utlis/constants/commons'
import { postAppointment } from '../../../redux/reducers/appointment/appointment.thunk'
import useToast from '../../../hooks/useToast'

const AppointmentForm = ({
   service,
   specialist,
   date,
   translateNameofService,
   openRegistered,
}) => {
   const dispatch = useDispatch()
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const [email, setEmail] = useState('')

   const appointment = useSelector((state) => state.appointment.appointment)

   const { notify } = useToast()

   console.log(appointment, 'APPOINTMENT')

   const getMonth = (string) => {
      const index = months.indexOf(string) + 1
      if (index < 10) {
         return `0${index}`
      }
      return `${index}`
   }

   const getDay = (day) => {
      if (day < 10) {
         return `0${day}`
      }
      return `${day}`
   }

   const getTime = (str) => {
      return str.slice(0, 5)
   }

   const submitAppointment = async () => {
      let department = ''
      let doctorId = 0
      let formatDate = ''
      let formatTime = ''
      department = translateNameofService(service)
      const { id } = specialist
      doctorId = id
      formatDate = `2023-${getMonth(date.month)}-${getDay(date.day)}`
      formatTime = `${getTime(date.time)}`
      const obj = {
         department,
         doctorId,
         date: formatDate,
         time: formatTime,
         fullName: name,
         phoneNumber: phone,
         email,
         zoneId: 'Asia/Bishkek',
      }
      dispatch(postAppointment({ obj, notify }))
         .unwrap()
         .then(() => openRegistered())
         .catch((error) => notify('error', error.response?.data.message))
   }

   const changeNameHandler = (e) => {
      setName(e.target.value)
   }
   const changePhoneHandler = (e) => {
      setPhone(e.target.value)
   }
   const changeEmailHandler = (e) => {
      setEmail(e.target.value)
   }

   return (
      <Form>
         <FormInput
            label="Ваше имя и фамилия"
            type="text"
            value={name}
            onChange={changeNameHandler}
         />
         <FormInput
            label="Номер телефона"
            type="text"
            value={phone}
            onChange={changePhoneHandler}
         />
         <FormInput
            label="Ваш e-mail"
            type="email"
            value={email}
            onChange={changeEmailHandler}
         />
         <StyledButton
            disabled={!name || !phone || !email}
            onClick={submitAppointment}
         >
            Продолжить
         </StyledButton>
      </Form>
   )
}

export default AppointmentForm

const Form = styled('form')(() => ({
   margin: '6px',
   padding: '30px 16px',
   backgroundColor: '#fff',
   borderRadius: '16px',
}))

const StyledButton = styled(Button)(() => ({
   marginTop: '24px',
   width: '100%',
}))
