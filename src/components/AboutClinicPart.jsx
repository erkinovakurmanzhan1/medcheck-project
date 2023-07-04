import React, { useState } from 'react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import building from '../assets/images/Rectangle 387.png'
import conference from '../assets/images/Rectangle 388.png'
import doctors from '../assets/images/Rectangle 389.png'
import consilium from '../assets/images/Rectangle 390.png'
import { ReactComponent as ForwardVector } from '../assets/icons/Vector (4).svg'
import Button from './UI/Button'
import BasicModal from './UI/ModalUi'
import { ApplicationModal } from './ApplicationModal'

const AboutClinicPart = ({ place }) => {
   const [showApplicationModal, setShowApplicationModal] = useState(false)

   const showModalHandler = () => {
      setShowApplicationModal(true)
   }

   const closeModalHandler = () => {
      setShowApplicationModal(false)
   }
   return (
      <Container>
         <div>
            <StyledTitleText>
               О нашей клинике
               <span style={{ color: '#048741' }}> MedCheck</span>
            </StyledTitleText>
            <StyledMainBlock>
               <StyledAboutSecondText>
                  <p>
                     Вся наша команда готова обеспечить вам медицинский уход и
                     заботу на самом высоком уровне. Наша главная задача —
                     оказать Вам теплый прием и обеспечить самый лучший
                     медицинский уход. У нас Вы в хороших руках! В нашей клинике
                     используются только качественные материалы и проверенные
                     технологии. Для каждого клиента специалисты нашей клиники
                     разработают <br />
                     индивидуальный план лечения, подробно рассказывая о каждом
                     этапе.
                  </p>
                  <p>
                     Доброжелательность и уважительное отношение к пациентам, не
                     только материальная, но и моральная ответственность за
                     результаты лечения — все это взято за основу политики
                     Medical Clinic. Профессионализм и высокое качество
                     оказываемых услуг помогают нам привлечь пациентов которые
                     рекомендуют нас своим родным и близким.
                  </p>
                  <p>
                     Уже 20 лет мы работаем на уровне лучших мировых стандартов,
                     внедряя и развивая передовые методы лечения для сохранения
                     здоровья наших пациентов.
                  </p>
                  <BasicModalStyle
                     open={showApplicationModal}
                     onClose={closeModalHandler}
                  >
                     <ApplicationModal onClose={closeModalHandler} />
                  </BasicModalStyle>
                  {place === 'main' ? (
                     <StyledNavlink to="about">
                        Читать подробнее o клинике <ForwardVector />
                     </StyledNavlink>
                  ) : (
                     <StyledButton onClick={showModalHandler}>
                        Записаться на консультацию
                     </StyledButton>
                  )}
               </StyledAboutSecondText>
               <StyledImageBlock>
                  <StyledBuildingImG src={building} alt="" />

                  <StyledSlidingImG>
                     <StyledBuildingImG src={conference} alt="conference" />
                     <StyledCenterBuildingImG src={doctors} alt="doctors" />
                     <StyledBuildingImG src={consilium} alt="consilium" />
                  </StyledSlidingImG>
               </StyledImageBlock>
            </StyledMainBlock>
         </div>
      </Container>
   )
}

export default AboutClinicPart
const StyledAboutSecondText = styled.div`
   width: 51%;
   height: 544px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   font-size: 1rem;
   font-style: normal;
   font-weight: 400;
   line-height: 160%;
   color: #4d4e51;

   & p {
      margin-top: 16px;
      font-size: 1 rem;
      line-height: 26px;
      font-weight: 400;
      font-family: 'Manrope';
      font-style: normal;
      color: #4d4e51;
   }
`
const StyledMainBlock = styled.div`
   height: '544px';
   display: flex;
   flex-direction: row;
`
const StyledImageBlock = styled.div`
   display: flex;
   flex-direction: column;
   text-align: center;
   margin-left: 140px;

   & svg {
      margin-top: 25px;
   }

   h3 {
      font-size: 1.13rem;
      font-family: 'Manrope';
      font-weight: 400;
      line-height: 25px;
      color: #048741;
      margin-left: -140px;
   }

   h2 {
      font-size: 1.4rem;
      font-family: 'Manrope';
      font-weight: 400;
      line-height: 30px;
      color: #222222;
      margin-left: -140px;
      margin-top: -15px;
   }
`
const Container = styled.div`
   padding-left: 90px;
   padding-right: 70px;
   max-width: 100%;
   display: flex;
   justify-content: center;
`
const StyledTitleText = styled.h1`
   font-size: 2.25rem;
   font-weight: 600;
   line-height: 49.18px;
   font-family: Manrope;
`

const StyledBuildingImG = styled('img')(() => ({
   width: '95%',
   height: '398px',
   marginTop: '20px ',
   marginLeft: '5px ',
}))
const StyledCenterBuildingImG = styled('img')(() => ({
   marginLeft: '20px',
   marginRight: '20px',
}))
const StyledSlidingImG = styled('div')(() => ({
   display: ' flex',
   img: {
      width: '29%',
      height: '120px',
      borderRadius: '8px',
      gap: '26px',
      marginTop: '20px ',
   },
}))

const StyledNavlink = styled(NavLink)(() => ({
   color: '#009344',
   fontSize: '1rem',
   fontWeight: 500,
   fontFamily: 'Manrope',
   lineHeight: '22px',
   textDecoration: 'none',
   display: 'flex',
   alignItems: 'center',
   paddingTop: '40px',
   '& :first-of-type': {
      margin: '4px 0 0 10px',
   },
}))

const StyledButton = styled(Button)(() => ({
   '&': {
      alignSelf: 'start',
      marginTop: '30px',
      borderRadius: '10px',
      padding: '10px 20px',
      border: '1px solid #048741',
      color: '#048741',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '19px',
      fontFamily: 'Manrope',
      background: '#fff',
      transition: '0.5s',
      cursor: 'pointer',
   },
   '&:hover': {
      background: 'linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%)',
      color: '#FFFFFF',
   },
   '&:active': {
      background: 'linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%)',
      color: '#FFFFFF',
   },
}))
const BasicModalStyle = styled(BasicModal)(() => ({
   '& .MuiBox-root': {
      borderRadius: '20px',
      background: '#EBF2FC',
      width: '659px',
      padding: '10px 10px 60px 20px',
   },
}))
