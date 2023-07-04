import { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import SideDrawer from '../UI/SideDrawer'
import ChooseDate from './ChooseDate'
import ChooseSpecialist from './ChooseSpecialist'
import MainOnlineAppointment from './MainOnlineAppointment'
import { ReactComponent as CloseIcon } from '../../assets/online-appoinment-icons/closeIcon.svg'
import { ReactComponent as GoBackIcon } from '../../assets/online-appoinment-icons/goBack.svg'
import { getDoctors } from '../../redux/reducers/appointment/appointment.thunk'
import { MED_SERVICE, MED_SERVICE_EN } from '../../utlis/services/img_service'
import AppointmentForm from './form/AppointmentForm'
import Registered from './Registered'

const OnlineAppointment = ({ open, onClose }) => {
   const [mainPage, setMainPage] = useState(true)
   const [specialistPage, setSpecialistPage] = useState(false)
   const [datePage, setDatePage] = useState(false)
   const [formPage, setFormPage] = useState(false)
   const [registeredPage, setRegisteredPage] = useState(false)

   const [service, setService] = useState('')
   const [specialist, setSpecialist] = useState(null)
   const [date, setDate] = useState('')
   // console.log(service)
   // console.log(specialist)
   // console.log(date)

   const dispatch = useDispatch()

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

   useEffect(() => {
      console.log(service)
      if (service) {
         const department = translateNameofService(service)

         const data = {
            department,
            timeZone: 'Asia/Bishkek',
         }
         dispatch(getDoctors(data))
      }
   }, [service])

   const serviceChangeHandler = (e) => {
      setService(e.target.value)
      setDate('')
   }

   const openChooseSpecialist = () => {
      setMainPage(false)
      setSpecialistPage(true)
   }

   const openDate = () => {
      setMainPage(false)
      setDatePage(true)
   }

   const openForm = () => {
      setMainPage(false)
      setFormPage(true)
   }

   const openRegistered = () => {
      setFormPage(false)
      setRegisteredPage(true)
   }

   const goBack = () => {
      setSpecialistPage(false)
      setDatePage(false)
      setFormPage(false)
      setRegisteredPage(false)
      setMainPage(true)
   }

   const dateChangeHandler = (date) => {
      setDate(date)
      goBack()
   }

   const chooseSpecialist = (specialist) => {
      setSpecialist(specialist)
      goBack()
   }

   // const closeAndClearData = () => {
   //    setService('')
   //    setSpecialist('')
   //    setDatePage('')
   //    onClose()
   // }

   return (
      <SideDrawer open={open} onClose={onClose}>
         <Container>
            {mainPage ? (
               <Close onClick={onClose} />
            ) : (
               <GoBack onClick={goBack} />
            )}
            <Header>
               <Title>
                  {mainPage && 'Онлайн Запись'}
                  {specialistPage && 'Выбрать специалиста'}
                  {datePage && 'Выбрать дату и время'}
                  {formPage && 'Запись'}
                  {registeredPage && 'Онлайн Запись'}
               </Title>
            </Header>
            {mainPage && (
               <MainOnlineAppointment
                  onClose={onClose}
                  openChooseSpecialist={openChooseSpecialist}
                  openDate={openDate}
                  openForm={openForm}
                  service={service}
                  specialist={specialist}
                  date={date}
                  serviceChangeHandler={serviceChangeHandler}
               />
            )}
            {specialistPage && (
               <ChooseSpecialist
                  chooseSpecialist={chooseSpecialist}
                  dateChangeHandler={dateChangeHandler}
               />
            )}
            {datePage && <ChooseDate dateChangeHandler={dateChangeHandler} />}
            {formPage && (
               <AppointmentForm
                  service={service}
                  specialist={specialist}
                  date={date}
                  translateNameofService={translateNameofService}
                  openRegistered={openRegistered}
               />
            )}
            {registeredPage && <Registered goBack={goBack} />}
         </Container>
      </SideDrawer>
   )
}

export default OnlineAppointment

const Container = styled('div')(() => ({
   '&': {
      background: ' #F3F1F1',
      height: '100vh',
   },
}))

const Header = styled('div')(() => ({
   background: '#fff',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const Close = styled(CloseIcon)(() => ({
   cursor: 'pointer',
   position: 'absolute',
   top: '16px',
   left: '16px',
}))
const GoBack = styled(GoBackIcon)(() => ({
   cursor: 'pointer',
   position: 'absolute',
   top: '16px',
   left: '16px',
}))

const Title = styled('h4')(() => ({
   margin: '17px auto',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: '700',
   fontSize: '16px',
   color: '#048741',
}))
