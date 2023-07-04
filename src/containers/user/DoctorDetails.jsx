import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from '@emotion/styled'
import { NavLink, useSearchParams } from 'react-router-dom'
import { Breadcrumbs, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { getOneDoctorService } from '../../api/doctors'
import { StyledButton, Title } from './Doctors'
import { ReactComponent as Strelka } from '../../assets/icons/стрелка.svg'
import { FeedbackSlider } from '../../components/feedback-slider/FeedbackSlider'
import { Hr } from './Service'
import useToast from '../../hooks/useToast'
import { UserRoles } from '../../utlis/constants/commons'

const DoctorDetails = () => {
   const [oneSpecialist, setOneSpecialist] = useState({})
   const { notify } = useToast()
   const role = useSelector((state) => state.auth.role)

   const [searchParams, setSearchParams] = useSearchParams()
   Object.fromEntries(searchParams)

   const openOnlineAppointment = () => {
      if (role === UserRoles.PATIENT) {
         setSearchParams({ openModal: 'online-appointment' })
      } else {
         setSearchParams({ openModal: 'sign-in' })
      }
   }
   const getOneDoctor = async (id) => {
      try {
         const { data } = await getOneDoctorService(id)
         setOneSpecialist(data)
         return data
      } catch (error) {
         return notify('error', 'Произошла ошибка при загрузке')
      }
   }

   const { id } = useParams()

   useEffect(() => {
      getOneDoctor(id)
      window.scrollTo({ top: 0 })
   }, [])

   return (
      <div>
         <Hr />
         <Wrapper>
            <Stack spacing={4}>
               <Container separator="›" aria-label="breadcrumb">
                  <StyledNav to="/">
                     <p>Главная</p>
                  </StyledNav>
                  <StyledNav to="/doctors">
                     <p>Врачи</p>
                  </StyledNav>
                  <StyledNav to="/doctors">
                     <p>{oneSpecialist.departmentName}</p>
                  </StyledNav>
                  <StyledNamesContainer>
                     <p>{oneSpecialist.lastName}</p>
                     <p>{oneSpecialist.firstName}</p>
                  </StyledNamesContainer>
               </Container>
            </Stack>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <StyledNames>{oneSpecialist.lastName}</StyledNames>
               <StyledNames>{oneSpecialist.firstName}</StyledNames>
            </div>
            <Title>
               Попасть в команду медицинской клиники «Medical Clinic» могут{' '}
               <br />
               только лучшие специалисты с многолетней практикой и доказанным
               опытом.
            </Title>
            <Title>
               Мы развиваемся, учимся и оттачиваем мастерство, стажируемся в
               ведущих университетах <br /> Европы, чтобы еще на шаг стать ближе
               к совершенству.
            </Title>
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '60px',
               }}
            >
               <div>
                  <ImageStyle src={oneSpecialist.image} alt="" />
               </div>

               <div style={{ paddingLeft: '60px' }}>
                  <StyledContainerNames>
                     <p>{oneSpecialist.lastName}</p>
                     <p>{oneSpecialist.firstName}</p>
                  </StyledContainerNames>
                  <StyledPosition>
                     Отделение:
                     <span style={{ color: '#222222', fontWeight: 500 }}>
                        {oneSpecialist.departmentName}
                     </span>
                  </StyledPosition>
                  <StyledPosition>
                     Должность:
                     <span
                        style={{
                           color: '#222222',
                           fontWeight: 500,
                        }}
                     >
                        {oneSpecialist.position}
                     </span>
                  </StyledPosition>
                  <StyledButton
                     style={{ marginTop: '24px' }}
                     onClick={openOnlineAppointment}
                  >
                     Записаться на прием
                  </StyledButton>
               </div>
            </div>
            <nav>
               <ul>
                  <ListStyled>
                     Преимущественно эстетическая хирургия лица:
                  </ListStyled>
                  <ListItem>
                     эндоскопический лифтинг лица ( лоб, височные зоны, брови,
                     верхние 2/3 лица )
                  </ListItem>
                  <ListItem>
                     SMAS-лифтинг лица с перемещением комков Биша, боковой или
                     медиальной платизмопластикой
                  </ListItem>
                  <ListItem>
                     блефаропластика ( трансконъюнктивальная; расширенная с
                     перераспределением тканей ,ревизионная )
                  </ListItem>
                  <ListItem>повторные и ревизионные лифтинги лица</ListItem>
                  <ListItem>кантопексия</ListItem>
                  <ListItem>миопексия</ListItem>
                  <ListItem> миопексия</ListItem>
                  <ListItem>липофилинг</ListItem>
                  <ListItem>отопластика</ListItem>
                  <ListItem>хейлопластика</ListItem>
               </ul>
            </nav>
            <div>
               <ListStyled>Специализация доктора:</ListStyled>
               <Description>
                  Сложное перелечивание корневых каналов зубов с применением
                  операционного микроскопа. Художественная реставрация зубов с
                  использованием самых современных пломбировочных материалов.
                  Восстановление разрушенных зубов керамическими вкладками,
                  коронками.
               </Description>
            </div>
            <div>
               <ListStyled>Основное образование:</ListStyled>
               <Description>
                  1988 г.г. Минский государственный медицинский институт
               </Description>
               <Description>1988-1989 г.г. интернатура по хирургии</Description>
            </div>
            <div style={{ paddingBottom: '40px' }}>
               <ListStyled>Участие в конференциях:</ListStyled>
               <Description>
                  Активно принимаю участие в конгрессах, форумах. Например,
                  последние годы:
               </Description>
               <Description>
                  2016- « Сочетание PRP и лазерных технологий. Инновационные
                  методы липосакции и фэтграфтинга», международная конференция{' '}
               </Description>
               <Description>
                  2016-«Инновационные методы отложения лица» . Курс Брайана
                  Мендельсона
               </Description>
               <Description>
                  {' '}
                  2017- «5-й курс «живой» хирургии. Продвинутая эстетическая
                  блефаропластика, хирургия средних зон и контуров лица»
               </Description>
               <Description>
                  {' '}
                  2017- «Композитный SMAS-лифтинг, подтяжка лица и шеи. Ответы
                  на все вопросы.» Проф. Сэм Хамра{' '}
               </Description>
               <Description>
                  2018 г.- докладчик на 1- м национальном конгрессе «
                  Пластическая хирургия и косметология» доклад «Параорбитальная
                  зона. Как добиться успеха?»
               </Description>
               <Description>
                  {' '}
                  2019 г. октябрь - участник 1- го конгресса Европейского
                  общества пластических эстетических хирургов , г. Брюгге,
                  Бельгия.
               </Description>
            </div>
            <StyledNav to="/doctors">
               <Strelka /> Список сотрудников
            </StyledNav>
         </Wrapper>
         <FeedbackSlider style={{ paddingTop: '40px' }} />
      </div>
   )
}

export default DoctorDetails

const ImageStyle = styled('img')({
   width: '319px',
   height: '349px',
})

const StyledNamesContainer = styled('div')({
   display: 'flex',
   gap: '0.5rem',
})

export const StyledNav = styled(NavLink)({
   textDecoration: 'none',
   color: '#048741',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
})

export const Container = styled(Breadcrumbs)({
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   marginTop: '30px',
   marginBottom: '26px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   '& .css-1bifq5f-MuiTypography-root-MuiBreadcrumbs-root': {
      fontFamily: 'Manrope',
   },
   ':last-child': {
      color: '#959595',
   },
})

const Wrapper = styled('div')({
   paddingLeft: '100px',
   paddingBottom: '120px',
})

const StyledNames = styled('h2')({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 600,
   fontSize: '36px',
})

const StyledContainerNames = styled('div')({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '24px',
   lineHeight: '33px',
   display: 'flex',
   gap: '0.5rem',
   color: '#009344',
   paddingBottom: '20px',
})

const StyledPosition = styled('p')({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '18px',
   lineHeight: '150%',
})

const ListStyled = styled('p')({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 600,
   fontSize: '16px',
   color: '#222222',
   paddingTop: '34px',
})

const ListItem = styled('li')({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '16px',
   marginLeft: '2rem',
   lineHeight: '160%',
   // paddingBottom: '0.5rem',
})

const Description = styled('p')({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '16px',
   lineHeight: '160%',
   width: '852px',
})
