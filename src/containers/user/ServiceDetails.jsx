import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { NavLink, useSearchParams } from 'react-router-dom'
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Breadcrumbs,
   Stack,
   Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useLocation, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { serviceDetails } from '../../utlis/helpers/serviceDetails'
import { FeedbackSlider } from '../../components/feedback-slider/FeedbackSlider'
import { Hr } from './Service'
import { getDoctorsService } from '../../api/doctors'
import { MED_SERVICE, MED_SERVICE_EN } from '../../utlis/services/img_service'
import {
   ContainerCard,
   NameContainer,
   Navlink,
   PositionStyled,
   StyledButton,
} from './Doctors'
import { UserRoles } from '../../utlis/constants/commons'

const ServiceDetails = () => {
   const role = useSelector((state) => state.auth.role)
   const [deparnmentDoctors, setDeparnmentDoctors] = useState([])
   const { state } = useLocation()

   window.scrollTo({ top: 0 })
   const [searchParams, setSearchParams] = useSearchParams()
   Object.fromEntries(searchParams)

   const openOnlineAppointment = () => {
      if (role === UserRoles.PATIENT) {
         setSearchParams({ openModal: 'online-appointment' })
      } else {
         setSearchParams({ openModal: 'sign-in' })
      }
   }

   const { id } = useParams()
   const currentService = serviceDetails.find(
      (service) => service.id === Number(id)
   )

   const translateNameofService = (service) => {
      let translatedService = ''
      const findedItem = MED_SERVICE.find((item) => item.title === service)
      if (findedItem) {
         const { id } = findedItem
         const { title } = MED_SERVICE_EN.find((item) => item.id === id)
         translatedService = title
      }
      return translatedService
   }

   const getDeparnmentName = async () => {
      try {
         const { data } = await getDoctorsService(
            translateNameofService(state?.departName)
         )
         return setDeparnmentDoctors(data)
      } catch (error) {
         return console.log(error)
      }
   }

   useEffect(() => {
      getDeparnmentName()
   }, [state?.departName])

   return (
      <div>
         <Hr />
         <Container>
            <Stack spacing={3} style={{ paddingTop: '30x' }}>
               <Breadcrumbs
                  separator="›"
                  aria-label="breadcrumb"
                  style={{
                     marginTop: '30px',
                  }}
               >
                  <StyledNavLink to="/">
                     <p>Главная</p>
                  </StyledNavLink>
                  <StyledNavLink to="/service">
                     <p>Услуги</p>
                  </StyledNavLink>
                  <div key={serviceDetails.id}>
                     <StyledTitle>{currentService.name}</StyledTitle>
                  </div>
               </Breadcrumbs>
            </Stack>
            <NameStyled>{currentService.name}</NameStyled>
            <TitleStyled>{currentService.title}</TitleStyled>
            <QuetioansStyled>{currentService.questions}</QuetioansStyled>
            <TitleStyled>{currentService.description}</TitleStyled>
            <ListStyled>
               {currentService.answers.map((item) => {
                  return <LisStyled key={item.id}>{item.answer}</LisStyled>
               })}
            </ListStyled>
            <QuetioansStyled>{currentService.questionstwo}</QuetioansStyled>
            <TitleStyled>{currentService.descriptiontwo}</TitleStyled>
            <ListStyled>
               {currentService.answersTwo.map((el) => {
                  return <LisStyled key={el.id}>{el.answer}</LisStyled>
               })}
            </ListStyled>
            <DoctorInfo key={serviceDetails.id}>
               Цены на прием{' '}
               <DoctorName>{currentService.doctorName}</DoctorName>
            </DoctorInfo>
            <div style={{ width: '852px' }}>
               <ContainerPrice>
                  <p>Услуга</p>
                  <p>Стоимость</p>
               </ContainerPrice>
               {currentService.price.map((item) => {
                  return (
                     <div>
                        <StyledAccordion key={item.id}>
                           <StyledAccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                           >
                              <StyledInfoPriceTypography>
                                 {item.title}
                              </StyledInfoPriceTypography>

                              <StyledPriceTypography
                                 sx={{
                                    flexShrink: 0,
                                 }}
                              >
                                 {item.price}
                              </StyledPriceTypography>
                           </StyledAccordionSummary>
                           <AccordionDetails>
                              <StyledDescriptionTypography>
                                 {item.description}
                              </StyledDescriptionTypography>
                           </AccordionDetails>
                        </StyledAccordion>
                     </div>
                  )
               })}

               <StyledContainerPrice>
                  {currentService.priceInfo.map((item) => {
                     return (
                        <div
                           style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                           }}
                        >
                           <InfoPrice>{item.titlee}</InfoPrice>
                           <InfoPrice
                              style={{ fontWeight: 500, paddingRight: '22px' }}
                           >
                              {item.priceInfo}
                           </InfoPrice>
                        </div>
                     )
                  })}
               </StyledContainerPrice>
            </div>
         </Container>
         <FeedbackSlider />
         <Container>
            <StyledDoctorTitle>
               Специалисты в данном направлении
            </StyledDoctorTitle>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
               {deparnmentDoctors.map((doctor) => {
                  return (
                     <div key={doctor.id}>
                        <ContainerCard style={{ display: 'flex' }}>
                           <NavLink to={`/doctors/${doctor.id}/details/`}>
                              <img src={doctor.image} alt="" />
                           </NavLink>
                        </ContainerCard>
                        <Navlink to={`/doctors/${doctor.id}/details/`}>
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
                  )
               })}
            </div>
         </Container>
      </div>
   )
}

export default ServiceDetails

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
   padding: '0',
   textAlign: 'end',
   '& .MuiAccordionSummary-content': {
      display: 'flex',
      justifyContent: 'space-between',
   },
   '& .MuiAccordionDetails-root ': {
      padding: '0',
   },
}))

const StyledAccordion = styled(Accordion)(() => ({
   border: 'none',
   background: 'none',
   boxShadow: 'none',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',
   borderBottom: '1px solid #E0E2E7',
   '&.MuiAccordion-root': {
      margin: 0,
      padding: '0px 27px',
   },
}))
const StyledDescriptionTypography = styled(Typography)(() => ({
   color: '#4D4E51',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: '300',
   fontSize: '16px',
   lineHeight: '22px',
}))
const StyledInfoPriceTypography = styled(Typography)(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 600,
   fontSize: '18px',
   lineHeight: '25px',
   color: '#4D4E51',
}))

const StyledPriceTypography = styled(Typography)(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '18px',
   lineHeight: '25px',
   color: '#4D4E51',
}))

const Container = styled('div')(() => ({
   paddingLeft: '100px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
}))

const ListStyled = styled('ul')(() => ({
   color: '#048741',
   paddingLeft: '20px',
   paddingTop: '12px',
}))

const LisStyled = styled('li')(() => ({
   color: '#222222',
   fontWeight: 300,
   fontSize: '16px',
   lineHeight: '180%',

   '&::marker': {
      color: '#048741',
   },
}))

const StyledNavLink = styled(NavLink)(() => ({
   color: '#048741',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '14px',
}))

const NameStyled = styled('h1')(() => ({
   fontWeight: 600,
   fontSize: '36px',
   lineHeight: '49px',
   color: '#048741',
   paddingTop: '26px',
   paddingBottom: '34px',
}))

const TitleStyled = styled('p')(() => ({
   fontWeight: 300,
   fontSize: '16px',
   lineHeight: '150%',
   width: '742px',
   color: '#222222',
}))

const QuetioansStyled = styled('h5')(() => ({
   fontWeight: 600,
   fontSize: '24px',
   lineHeight: '33px',
   color: '#4D4E51',
   paddingBottom: '1rem',
   paddingTop: '50px',
}))

const DoctorInfo = styled('h4')(() => ({
   paddingTop: '120px',
   fontWeight: 700,
   fontSize: '36px',
   lineHeight: '49px',
   paddingBottom: '60px',
}))

const DoctorName = styled('span')(() => ({
   color: '#048741',
}))

const ContainerPrice = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   background: '#DBF0E5',
   borderRadius: '10px',
   height: '59px',
   paddingLeft: '30px',
   paddingRight: '38px',
}))

const StyledContainerPrice = styled('div')(() => ({
   borderBottom: '1px solid #E0E2E7',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '16px 12px 16px 27px',
   marginBottom: '120px',
}))

const InfoPrice = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 600,
   fontSize: '18px',
   lineHeight: '25px',
   color: '#4D4E51',
}))

const StyledTitle = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '14px',
}))

const StyledDoctorTitle = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '16px',
   paddingTop: '90px',
   paddingBottom: '30px',
}))
