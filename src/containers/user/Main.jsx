import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router'
// import { useSearchParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import Button from '../../components/UI/Button'
import mainPageDoctor from '../../assets/images/mainDoctorImage.png'
import welcomeWord from '../../assets/images/Добро пожаловать в клинику MedCheck.png'
import { doctorImages, mainMedService } from '../../utlis/services/img_service'
import AboutClinicPart from '../../components/AboutClinicPart'
import { FeedbackSlider } from '../../components/feedback-slider/FeedbackSlider'
import { CardApplication } from '../../components/UI/card/CardApplication'
import BasicModal from '../../components/UI/ModalUi'
import { ApplicationModal } from '../../components/ApplicationModal'
// import { UserRoles } from '../../utlis/constants/commons'

const Main = () => {
   window.scrollTo({ top: 0 })
   const navigate = useNavigate()

   const [showApplicationModal, setShowApplicationModal] = useState(false)

   const showModalHandler = () => {
      setShowApplicationModal(true)
   }

   const closeModalHandler = () => {
      setShowApplicationModal(false)
   }
   const serviceNavigatePage = () => {
      navigate('service')
   }
   const allDoctorNavigatePage = () => {
      navigate('doctors')
   }
   return (
      <>
         <GlobalContainer>
            <div>
               <Box>
                  <InfoBox>
                     <img src={welcomeWord} alt="welcomeWord" />
                     <p>
                        Международный Медицинская клиника «MedCheck — это
                        клиника, в которой применяются новейшие диагностические
                        и лечебные технологии и ведут прием лучшие специалисты.
                     </p>
                     <ApplicationButton onClick={showModalHandler}>
                        оставьте заявку
                     </ApplicationButton>
                     <BasicModalStyle
                        open={showApplicationModal}
                        onClose={closeModalHandler}
                     >
                        <ApplicationModal onClose={closeModalHandler} />
                     </BasicModalStyle>
                  </InfoBox>
                  <img src={mainPageDoctor} alt="mainPageDoctor" />
               </Box>
               <DetailsBox>
                  <h1>
                     Почему <span>нас выбирают?</span>
                  </h1>
                  <MainInfoDepartmentBox>
                     <InfoDepartmentBox>
                        <span>1</span>
                        <h3>Высокий профессионализм сотрудников</h3>
                        <p>
                           Медицинская лицензия, большой опыт врачей и
                           постоянное повышение квалификации.
                        </p>
                     </InfoDepartmentBox>
                     <InfoDepartmentBox>
                        <span>2</span>
                        <h3>Наши пациенты - наши лучшие друзья</h3>
                        <p>
                           Все аппараты и медицинские препараты сертифицированы
                           и лицензированы.
                        </p>
                     </InfoDepartmentBox>
                     <InfoDepartmentBox>
                        <span>3</span>
                        <h3>Комфортные условия</h3>
                        <p>
                           Уютная обстановка и отзывчивый персонал сделают поход
                           в клинику максимально приятным.
                        </p>
                     </InfoDepartmentBox>
                  </MainInfoDepartmentBox>
                  <div>
                     <h1>
                        Наши <span>услуги</span>
                     </h1>
                     <Title>
                        За все время работы клиника приняла более 1 млн.
                        пациентов.
                     </Title>
                     <ServiceBox>
                        {mainMedService.map((service) => (
                           <div key={service.id}>
                              <ServiceStyle>{service.img}</ServiceStyle>
                              <ServiceTitle>{service.title}</ServiceTitle>
                           </div>
                        ))}
                     </ServiceBox>
                     <ButtonBox>
                        <ShowAllButtonStyle onClick={serviceNavigatePage}>
                           Смотреть все
                        </ShowAllButtonStyle>
                     </ButtonBox>
                  </div>
               </DetailsBox>
            </div>
         </GlobalContainer>
         <AboutClinicPart place="main" />
         <GlobalDoctorContainer>
            <MainDoctorsBox>
               <h1>
                  Лучшие <span>врачи</span>
               </h1>
               <TitleStyle>
                  Попасть в команду медицинской клиники «MedCheck» могут только
                  лучшие специалисты с многолетней практикой и доказанным
                  опытом.
               </TitleStyle>
               <DoctorsBox>
                  {doctorImages.map((doctor) => (
                     <DoctorBox key={doctor.id}>
                        <DoctorsImageBox>
                           <img src={doctor.img} alt="doctorImg" />
                        </DoctorsImageBox>
                        <DoctorTitleBox>
                           <p>{doctor.name}</p>
                           <span>{doctor.description}</span>
                        </DoctorTitleBox>
                     </DoctorBox>
                  ))}
               </DoctorsBox>
               <ButtonBox>
                  <AllDoctorsButtonStyle onClick={allDoctorNavigatePage}>
                     Все врачи клиники
                  </AllDoctorsButtonStyle>
               </ButtonBox>
            </MainDoctorsBox>
         </GlobalDoctorContainer>
         <FeedbackSlider />
         <CardApplication onClose={closeModalHandler} />
      </>
   )
}

export default Main

const GlobalContainer = styled('main')`
   max-width: 100%;
   display: flex;
   justify-content: center;
`

const Box = styled('div')(() => ({
   display: 'flex',
   marginTop: '22px',
   paddingLeft: '10px',
}))
const BasicModalStyle = styled(BasicModal)(() => ({
   '& .MuiBox-root': {
      borderRadius: '20px',
      background: '#EBF2FC',
      width: '659px',
      padding: '10px 10px 60px 20px',
   },
}))
const InfoBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'start',
   justifyContent: 'center',

   p: {
      width: '585px',
      fontFamily: 'Manrope',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '130%',
      margin: '27px 0',
   },
}))

const ApplicationButton = styled(Button)(() => ({
   '&': {
      background: 'none',
      color: '#048741',
      border: '1px solid #048741',
      borderRadius: '24px',
      padding: '12px 24px',
   },
}))
const DetailsBox = styled('div')(() => ({
   padding: '30px 0px 90px 10px',
   fontFamily: 'Manrope',

   h1: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: '49px',

      span: {
         color: '#048741',
      },
   },
}))
const InfoDepartmentBox = styled('div')(() => ({
   width: '24rem',
   height: '17rem',
   background: '#DBEBFF',
   borderRadius: '4px',
   padding: '39px 0 0 40px',
   display: 'flex',
   flexDirection: 'column',
   margin: '60px 0 120px 0px',
   span: {
      fontSize: '48px',
      fontWeight: 600,
      color: '#048741',
      fontFamily: 'Manrope',
   },
   h3: {
      width: '309px',
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '130%',
      color: '#222222',
      marginBottom: '18px',
   },
   p: {
      fontFamily: 'Manrope',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '130%',
   },
}))

const MainInfoDepartmentBox = styled('div')(() => ({
   display: 'flex',
   gap: '16px',
}))
const Title = styled('p')(() => ({
   fontSize: '18px',
   fontWeight: 400,
   lineHeight: '25px',
   marginTop: '34px',
}))
const ServiceStyle = styled('div')(() => ({
   border: '1px solid #DEDEDE',
   width: '102px',
   height: '106px',
   borderRadius: '18px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   margin: '60px 0 20px 0',

   '&:hover': {
      background: ' linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%)',
      path: {
         fill: '#ffff',
      },
   },
}))
const ServiceBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
}))
const ServiceTitle = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontSize: '16px',
   fontWeight: 300,
   color: '#000000',
   paddingBottom: '48px',
}))
const ShowAllButtonStyle = styled(Button)(() => ({
   '&': {
      background: 'none',
      color: '#048741',
      border: '1px solid #048741',
      borderRadius: '10px',
      padding: '10px 20px',
   },
}))
const ButtonBox = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
}))
const DoctorsBox = styled('div')(() => ({
   display: 'flex',
   gap: '30px',
   padding: '0px 15px',
}))
const MainDoctorsBox = styled('div')(() => ({
   paddingTop: '120px',
   fontFamily: 'Manrope',
   h1: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: '49px',

      span: {
         color: '#048741',
      },
   },
}))
const DoctorBox = styled('div')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,

   p: {
      fontSize: '16px',
      lineHeight: '20px',
   },
   span: {
      color: '#959595',
      fontSize: '14px',
      textAlign: 'center',
      padding: '2px 0 52px 0',
   },
}))
const DoctorsImageBox = styled('div')(() => ({
   width: '205px',
   height: '205px',
   background:
      'radial-gradient(43.84% 43.84% at 50.16% 55.3%, #FDFDFD 0%, #E4E7EE 100%)',
   borderRadius: '50%',
   paddingTop: '14px',
   paddingLeft: '20px',

   img: {
      width: '160px',
      height: '190px',
      borderRadius: '44%',
   },
}))
const TitleStyle = styled('p')(() => ({
   fontWeight: 400,
   lineHeight: '25px',
   fontSize: '18px',
   width: '42.5rem',
   padding: '34px 0 70px 0',
}))
const DoctorTitleBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   textAlign: 'center',
   paddingTop: '14px',
}))
const GlobalDoctorContainer = styled('div')(() => ({
   maxWidth: '100%',
   display: 'flex',
   justifyContent: 'center',
}))
const AllDoctorsButtonStyle = styled(Button)(() => ({
   '&': {
      background: 'none',
      color: '#048741',
      border: '1px solid #048741',
      borderRadius: '10px',
      padding: '10px 20px',
      marginBottom: '120px',
   },
}))
