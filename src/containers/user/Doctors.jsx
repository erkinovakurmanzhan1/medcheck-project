import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import styled from '@emotion/styled'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, StyledNavLink } from '../admin/specialist-style'
import Button from '../../components/UI/Button'
import { getDoctorsService } from '../../api/doctors'
import useToast from '../../hooks/useToast'
import { UserRoles, departmentName } from '../../utlis/constants/commons'
import { Hr } from './Service'

const Doctors = () => {
   const { notify } = useToast()
   const role = useSelector((state) => state.auth.role)
   const [departments, setDepartments] = useState([])
   const [showMoreClicked, setShowMoreClicked] = useState(false)
   const [searchParams, setSearchParams] = useSearchParams()
   Object.fromEntries(searchParams)

   const openOnlineAppointment = () => {
      if (role === UserRoles.PATIENT) {
         setSearchParams({ openModal: 'online-appointment' })
      } else {
         setSearchParams({ openModal: 'sign-in' })
      }
   }
   const fetchDepartments = async (start, end) => {
      try {
         const departmentNames = [
            'ALLERGOLOGY',
            'VACCINATION',
            'GASTROENTEROLOGY',
            'ANESTHESIOLOGY',
            'GYNECOLOGY',
            'DERMATOLOGY',
            'CARDIOLOGY',
            'NEUROLOGY',
            'NEUROSURGERY',
            'ONCOLOGY',
            'ORTHOPEDICS',
            'OTORHINOLARYNGOLOGY',
            'OPHTHALMOLOGY',
            'PROCTOLOGY',
            'PSYCHOTHERAPY',
            'PULMONOLOGY',
            'RHEUMATOLOGY',
            'THERAPY',
            'UROLOGY',
            'PHLEBOLOGY',
            'PHYSIOTHERAPY',
            'ENDOCRINOLOGY',
         ]
         const requests = departmentNames
            .slice(start, end)
            .map((departmentName) => getDoctorsService(departmentName))
         const responses = await Promise.all(requests)
         const departmentsData = responses.map((response, index) => ({
            departmentName: departmentName[start + index],
            doctors: response.data,
         }))
         setDepartments((prevDepartments) => [
            ...prevDepartments,
            ...departmentsData,
         ])
      } catch (error) {
         notify('error', 'Произошла ошибка при загрузке')
      }
   }

   const handleShowMoreClick = async () => {
      const totalDepartments = 22
      const currentDepartments = departments.length
      const remainingDepartments = totalDepartments - currentDepartments
      const batchSize = Math.min(remainingDepartments, 4)
      const startIndex = currentDepartments
      const endIndex = currentDepartments + batchSize

      fetchDepartments(startIndex, endIndex)

      if (endIndex >= totalDepartments) {
         setShowMoreClicked(true)
      }
   }

   useEffect(() => {
      const initialBatchSize = Math.min(4, 22)
      fetchDepartments(0, initialBatchSize)
   }, [])

   return (
      <div>
         <Hr />
         <Wrapper>
            <Stack spacing={2}>
               <Container separator="›" aria-label="breadcrumb">
                  <StyledNavLink to="/">
                     <p>Главная</p>
                  </StyledNavLink>
                  <p>Врачи</p>
               </Container>
            </Stack>
            <div>
               <StyledName>
                  Наши <span>врачи</span>
               </StyledName>
               <Title>
                  Попасть в команду медицинской клиники «Medical Clinic» могут{' '}
                  <br />
                  только лучшие специалисты с многолетней практикой и доказанным
                  опытом.
               </Title>
               <Title>
                  Мы развиваемся, учимся и оттачиваем мастерство, стажируемся в
                  ведущих университетах <br /> Европы, чтобы еще на шаг стать
                  ближе к совершенству.
               </Title>
            </div>

            {departments.map((department, i) => (
               // eslint-disable-next-line react/no-array-index-key
               <React.Fragment key={i}>
                  <StyledDeparnment>
                     {department.departmentName}
                  </StyledDeparnment>
                  <div style={{ display: 'flex', gap: '30px' }}>
                     {department.doctors.map((doctor) => (
                        <div key={doctor.id}>
                           <ContainerCard>
                              <NavLink to={`${doctor.id}/details/`}>
                                 <img src={doctor.image} alt="" />
                              </NavLink>
                           </ContainerCard>
                           <Navlink to={`${doctor.id}/details/`}>
                              <NameContainer>
                                 <p>{doctor.firstName}</p>
                                 <p>{doctor.lastName}</p>
                              </NameContainer>
                           </Navlink>
                           <PositionStyled>{doctor.position}</PositionStyled>
                           <StyledButton onClick={openOnlineAppointment}>
                              {' '}
                              Записаться на прием
                           </StyledButton>
                        </div>
                     ))}
                  </div>
               </React.Fragment>
            ))}

            <div
               style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  paddingTop: '60px',
               }}
            >
               <InfoStyled>
                  В нашей клинике работают:
                  <SyyledSpan>более 30 специалистов</SyyledSpan>
               </InfoStyled>
               {!showMoreClicked && (
                  <StylednavLink onClick={handleShowMoreClick}>
                     Показать больше <hr />
                  </StylednavLink>
               )}
            </div>
         </Wrapper>
      </div>
   )
}

export default Doctors

const Wrapper = styled('div')(() => ({
   '&': {
      paddingLeft: '95px',
   },
}))

const StyledName = styled('h1')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '36px',
      paddingBottom: '14px',
   },
   span: {
      color: '#048741',
   },
}))

export const Title = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '25px',
      color: '#4D4E51',
      paddingTop: '20px',
   },
}))

export const ContainerCard = styled('div')(() => ({
   '&': {
      background:
         'radial-gradient(43.84% 43.84% at 50.16% 55.3%, #FDFDFD 0%, #E4E7EE 100%)',
      borderRadius: '4px',
      width: '319px',
      height: '349px',
      display: 'flex',
      img: {
         width: '319px',
         height: '349px',
      },
   },
}))

export const PositionStyled = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      color: '#959595',
      paddingBottom: '1rem',
   },
}))

export const NameContainer = styled('div')(() => ({
   '&': {
      display: 'flex',
      gap: '0.5rem',
      color: '#222222',
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '18px',
      paddingTop: '1rem',
   },
}))

export const StyledButton = styled(Button)(() => ({
   '&': {
      background: 'none',
      color: '#029847',
      borderRadius: '10px',
      border: '1px solid #029847',
      padding: '10px 20px',
      fontFamily: 'Manrope',
      fontSize: '16px',
   },
   ':hover': {
      fontFamily: 'Manrope',
      border: 'none',
   },
}))

const StyledDeparnment = styled('h2')(() => ({
   '&': {
      color: '#4D4E51',
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '24px',
      paddingBottom: '30px',
      paddingTop: '80px',
   },
}))

const InfoStyled = styled('p')(() => ({
   '&': {
      color: '#4D4E51',
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
   },
}))

const SyyledSpan = styled('span')(() => ({
   '&': {
      color: '#222222',
   },
}))

const StylednavLink = styled('button')(() => ({
   '&': {
      color: '#048741',
      borderBottom: '1px solid #048741',
      background: 'none',
      border: 'none',
   },
}))

export const Navlink = styled(NavLink)(() => ({
   '&': {
      color: '#4D4E51',
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
   },
}))
