import React from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { cancelAppointment } from '../../redux/reducers/appointment/appointment.thunk'
import { ReactComponent as RegisteredIcon } from '../../assets/online-appoinment-icons/registeredIcon.svg'
import { ReactComponent as Rating } from '../../assets/online-appoinment-icons/star.svg'
import Button from '../UI/Button'
import { months } from '../../utlis/constants/commons'
import useToast from '../../hooks/useToast'
import plus from '../../assets/icons/plus.svg'

const Registered = ({ goBack }) => {
   const appointment = useSelector((state) => state.appointment.appointment)
   const id = appointment.response.appointmentId
   const appointmentId = { appointmentId: id }
   console.log(appointmentId)

   const dispatch = useDispatch()

   const { notify } = useToast()

   const getDate = (date, months) => {
      let result = ''
      let numberMonth = ''
      let strigMonth = ''
      let day = ''
      if (date.charAt(5) === '0') {
         numberMonth = date.charAt(6)
      } else {
         numberMonth = date.charAt(5) + date.charAt(6)
      }
      strigMonth = months[numberMonth - 1]

      if (date.charAt(date.length - 2) === '0') {
         day = date.charAt(date.length - 1)
      } else {
         day = date.charAt(date.length - 2) + date.charAt(date.length - 1)
      }

      // eslint-disable-next-line prefer-template
      result = day + '-' + strigMonth
      return result
   }

   const cancelAppointmentHandler = () => {
      dispatch(cancelAppointment({ appointmentId, notify }))
   }

   return (
      <Container>
         <RegisteredIcon />
         <Submited>Вы записаны</Submited>
         <p>
            {appointment.dayOfWeek}, {getDate(appointment.date, months)},{' '}
            {appointment.timeFrom}-{appointment.timeTo}
         </p>
         <Profile>
            <ImageContainer>
               <Image src={appointment.response.image} alt="" />
            </ImageContainer>
            <About>
               <Title>{appointment.response.fullName}</Title>
               <Specialist>{appointment.response.position}</Specialist>
               <RatingContainer>
                  <Rating />
                  <Users>166</Users>
               </RatingContainer>
            </About>
         </Profile>
         <Cancel onClick={cancelAppointmentHandler}>Отменить запись</Cancel>
         <StyledButton onClick={goBack}>
            <img src={plus} alt="plus" />
            Записаться еще
         </StyledButton>
      </Container>
   )
}

export default Registered

const Container = styled('div')(() => ({
   margin: '6px',
   padding: '30px 16px',
   backgroundColor: '#fff',
   borderRadius: '16px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   fontFamily: 'Manrope',
   p: {
      fontWeight: 500,
   },
}))

const Submited = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: '600',
   fontSize: '19px',
   margin: '5px 0',
}))

const Profile = styled('div')(() => ({
   display: 'flex',
   marginTop: '20px',
   marginBottom: '40px',
}))

const ImageContainer = styled('div')(() => ({
   width: '36px',
   height: '36px',
}))

const Image = styled('img')(() => ({
   width: '100%',
   height: '100%',
   borderRadius: '50%',
}))
const About = styled('div')(() => ({
   marginLeft: '10px',
}))

const Title = styled('h4')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '14px',
   lineHeight: '19px',
}))

const Specialist = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#959595',
   marginBottom: '3px',
}))

const RatingContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const Users = styled('span')(() => ({
   marginLeft: '8px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#707070',
}))

const StyledButton = styled(Button)(() => ({
   fontFamily: 'Manrope',
   marginTop: '24px',
   width: '100%',
   img: {
      marginRight: '5px',
      width: '12px',
   },
}))
const Cancel = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: '500',
   color: '#ff0000',
   cursor: 'pointer',
}))
