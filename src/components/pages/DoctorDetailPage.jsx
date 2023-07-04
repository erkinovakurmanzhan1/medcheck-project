/* eslint-disable react/prop-types */
import React from 'react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { ReactComponent as BackVector } from '../../assets/icons/Vector (3).svg'

export const DoctorDetailsPage = (props) => {
   const {
      doctorName,
      doctorImg,
      department,
      positionWork,
      mainTodoName,
      secondaryTodo,
   } = props
   return (
      <Container>
         <StyledNameMain>
            {/* this should be the doctor's name */}
            {doctorName}
         </StyledNameMain>

         <StyledMainText>
            Попасть в команду медицинской клиники «Medical Clinic» могут только
            лучшие специалисты с многолетней практикой и доказанным опытом.
         </StyledMainText>
         <StyledSecondText>
            Мы развиваемся, учимся и оттачиваем мастерство, стажируемся в
            ведущих университетах Европы, чтобы еще на шаг стать ближе к
            совершенству.
         </StyledSecondText>
         <StyledDoctorBlock>
            <StyledDoctorImg>
               {/* there will be a photo */}
               <img src={doctorImg} alt="врач" />
            </StyledDoctorImg>
            <StyledDoctorCard>
               <h2> {doctorName} </h2>
               <StyledDepartmentDoctor>
                  <StyledText>Отделение: </StyledText>
                  <StyledTextLast>
                     Хирург
                     {/* there will be a section */}
                     {department}
                  </StyledTextLast>
               </StyledDepartmentDoctor>
               <StyledDepartmentDoctor>
                  <StyledText>Должность: </StyledText>
                  <StyledTextLast>
                     Главный врач
                     {/* there will be a position */}
                     {positionWork}
                  </StyledTextLast>
               </StyledDepartmentDoctor>
               {/* button will be here */}
               Записаться на прием
            </StyledDoctorCard>
         </StyledDoctorBlock>

         <StyledDoctorTodo>
            {/* here will be the data of the doctor */}
            <li>
               <b>{mainTodoName}</b>
               <ul>
                  <li>{secondaryTodo} </li>
               </ul>
            </li>
         </StyledDoctorTodo>
         <StyledNavlink to="/">
            <BackVector /> Список сотрудников
         </StyledNavlink>
      </Container>
   )
}

const StyledDoctorImg = styled.div`
   height: 100%;
   padding: 14px 20px 0px;
   border-radius: 4px;
   background: radial-gradient(
      43.84% 43.84% at 50.16% 55.3%,
      #fdfdfd 0%,
      #e4e7ee 100%
   );
   img {
      background-image: #e4e7ee;
   }
`
const StyledDoctorBlock = styled.div`
   display: flex;
   margin-top: 60px;
   margin-bottom: 34px;
`
const StyledDoctorCard = styled.div`
   margin-left: 60px;
   margin-top: 100px;

   h2 {
      font-size: 1.5rem;
      line-height: 32px;
      font-weight: 500;
      color: #009344;
      margin-bottom: 15px;
   }
`

const Container = styled.div`
   width: 85%;
   margin-left: 120px;
   margin-top: 26px;
   margin-bottom: 40px;
`

const StyledNameMain = styled.h1`
   font-size: 2.25rem;
   font-weight: 600;
   line-height: 49.18px;
`
const StyledMainText = styled.p`
   width: 80%;
   padding: 24px 80px 0 0;
   font-size: 1.13rem;
   font-weight: 400;
   line-height: 25px;
`
const StyledSecondText = styled.p`
   width: 85%;
   padding: 20px 90px 20px 0;
   font-size: 1.13rem;
   font-weight: 400;
   line-height: 25px;
`
const StyledText = styled.p`
   font-size: 1.13rem;
   font-weight: 400;
   line-height: 25px;
   color: #58595b;
`
const StyledTextLast = styled.p`
   font-size: 1.13rem;
   font-weight: 500;
   line-height: 27px;
   color: #222222;
`

const StyledDepartmentDoctor = styled.div`
   display: flex;

   :last-child {
      margin-bottom: 34px;
   }
`

const StyledDoctorTodo = styled.ul`
   width: 65%;
   font-size: 1rem;
   line-height: 25.6px;
   font-family: 'Manrope';
   color: #222222;
   list-style: none;

   li:first-of-type li {
      width: 65%;
      font-size: 1rem;
      line-height: 25.6px;
      font-weight: 400;
      font-family: 'Manrope';
      margin-left: 25px;
      color: #222222;
      list-style: initial;
   }

   li {
      width: 65%;
      font-size: 1rem;
      line-height: 25.6px;
      font-weight: 400;
      font-family: 'Manrope';
      color: #222222;
      list-style: none;
   }
`
const StyledNavlink = styled(NavLink)(() => ({
   color: '#009344',
   fontSize: '1rem',
   fontWeight: 500,
   lineHeight: '22px',
   textDecoration: 'none',
}))
