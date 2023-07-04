import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Stack, styled } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'
import { getOneUserAppoinmentRequest } from '../../../../api/appointmentService'
import { getStatusTitleChangeHandler } from '../../../../utlis/helpers/general'
import useToast from '../../../../hooks/useToast'

const MyApplicationDetails = () => {
   const [appoinment, setAppoinment] = useState({})
   const { id } = useParams()
   const { notify } = useToast()
   const getOneAppointment = async (id) => {
      try {
         const { data } = await getOneUserAppoinmentRequest(id)
         return setAppoinment(data)
      } catch (error) {
         return notify('error', 'Произошла ошибка при загрузке')
      }
   }

   useEffect(() => {
      getOneAppointment(id)
   }, [id])
   return (
      <StyledMyNotesContainer>
         <Stack spacing={2}>
            <Container separator="›" aria-label="breadcrumb">
               <StyledNavLink>
                  <p>Личный кабинет</p>
               </StyledNavLink>
               <p>Мои записи</p>
            </Container>
         </Stack>
         <Title>Мои записи</Title>
         <MapContainer key={appoinment.id}>
            <div>
               <Wrapper>
                  <P>Статус</P>
                  <StyledStatus statusColor={appoinment.status}>
                     {getStatusTitleChangeHandler(appoinment.status)}
                  </StyledStatus>
               </Wrapper>
               <Wrapper>
                  <P>Имя</P>
                  <StyledInfoCustomer>
                     {appoinment.patientFirstName}
                  </StyledInfoCustomer>
               </Wrapper>
               <Wrapper>
                  <P>Фамилия</P>
                  <StyledInfoCustomer>
                     {appoinment.patientLastName}
                  </StyledInfoCustomer>
               </Wrapper>
               <Wrapper>
                  <P>Email</P>
                  <StyledInfoCustomer>{appoinment.email}</StyledInfoCustomer>
               </Wrapper>
               <Wrapper>
                  <P>Телефон номера</P>
                  <StyledInfoCustomer>
                     {appoinment.phoneNumber}
                  </StyledInfoCustomer>
               </Wrapper>
            </div>
            <div>
               <Wrapper>
                  <P>Дата</P>
                  <StyledInfoCustomer>{appoinment.date}</StyledInfoCustomer>
                  <StyledInfoCustomer>{appoinment.time}</StyledInfoCustomer>
               </Wrapper>
               <Wrapper>
                  <P>Специалист</P>
                  <StyledInfoCustomer>
                     {appoinment.doctorFullName}
                  </StyledInfoCustomer>
               </Wrapper>
               <Wrapper>
                  <P>Услуга</P>
                  <StyledInfoCustomer>
                     {appoinment.departmentName}
                  </StyledInfoCustomer>
               </Wrapper>
            </div>
         </MapContainer>
      </StyledMyNotesContainer>
   )
}

export default MyApplicationDetails
const getStatusColorChangeHandler = (statusColor) => {
   if (statusColor === 'CANCELED') {
      return '#F91515'
   }
   if (statusColor === 'CONFIRMED') {
      return '#346EFB'
   }
   if (statusColor === 'COMPLETED') {
      return '#07AB53'
   }
   return null
}
const StyledStatus = styled('p')(({ statusColor }) => ({
   '&': {
      background: getStatusColorChangeHandler(statusColor),
      borderRadius: '6px',
      alignItems: 'flex-start',
      padding: '6px 10px',
      display: 'flex',
   },
}))

const StyledMyNotesContainer = styled('div')({
   margin: '0 auto',
   marginLeft: '7.5rem',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   marginTop: '30px',
   marginBottom: '120px',
})

const StyledNavLink = styled(NavLink)({
   textDecoration: 'none',
   color: ' #959595',
})

const Container = styled(Breadcrumbs)({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   marginTop: '30px',
   marginBottom: '26px',
   ':last-child': {
      color: '#048741',
   },
})

const Title = styled('h2')({
   fontWeight: '600',
   fontSize: '24px',
   marginBottom: '40px',
   marginTop: '26px',
})

const MapContainer = styled('div')({
   display: 'flex',
   gap: '5rem',
})

const P = styled('p')({
   fontFamily: 'Manrope',
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '17px',
   color: ' #384255',
})

const StyledInfoCustomer = styled('p')({
   fontFamily: 'Manrope',
   fontWeight: 400,
   fontSize: '16px',
   lineHeight: '22px',
   color: '#222222',
})

const Wrapper = styled('div')({
   marginBottom: '12px',
})
