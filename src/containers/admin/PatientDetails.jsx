import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormLabel, IconButton, Paper, styled } from '@mui/material'
import { format, isValid } from 'date-fns'
import { useDispatch } from 'react-redux'
import Button from '../../components/UI/Button'
import { MED_SERVICE } from '../../utlis/services/img_service'
import { ReactComponent as CloseIcon } from '../../assets/login/CloseIcon.svg'
import { getAllPatientsById } from '../../api/patientsService'
import useToast from '../../hooks/useToast'
import AvatarUpload from '../../components/UI/avatar/AvatarUpload'
import { putDatas } from '../../redux/reducers/patient/patient.thunk'
import { fileInstance } from '../../api/instanses'
import DatePicker from '../../components/UI/DatePicker'
import BasicModal from '../../components/UI/ModalUi'
import buttonPlusIcon from '../../assets/icons/ButtonPlusIcon.svg'
import { PatientSelect } from '../../components/PatientSelect'

const PatientDetails = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { notify: notifyCall } = useToast()
   const [open, setOpen] = useState(false)
   const [name, setName] = useState('')
   const [patients, setPatients] = useState([])
   const [inputDate, setInputDate] = useState('')
   const [selectedFile, setSelectedFile] = useState(null)

   const disabledValue = name && inputDate && selectedFile
   const getAllPatients = async () => {
      try {
         const { data } = await getAllPatientsById(id)
         return setPatients(data)
      } catch (error) {
         return notifyCall('error', error.response?.data.message)
      }
   }

   useEffect(() => {
      getAllPatients()
   }, [])

   const handleOpen = () => {
      setOpen(true)
   }
   const handleClose = () => {
      setOpen(false)
   }

   const cancelHandler = () => {
      setOpen(false)
   }
   const changeHandler = (e) => {
      setName(e.target.value)
   }

   const chooseHandler = (e) => {
      const currentDate = new Date()
      if (currentDate > new Date(e)) {
         setInputDate(e)
      } else {
         notifyCall('warning', 'Выберите правильную дату!')
      }
   }

   const fileChange = (event) => {
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      fileInstance
         .post('api/s3', formData)
         .then((responce) => setSelectedFile(responce.data.link))
         .catch((error) => notifyCall('error', error))
   }
   let date = ''

   if (inputDate && isValid(new Date(inputDate))) {
      date = format(new Date(inputDate), 'yyyy-MM-dd')
   }

   const submitHandler = () => {
      const { id: departmentId } = MED_SERVICE.find((el) => el.id === name)
      try {
         if (name != null && date != null && selectedFile != null) {
            const datasOfPatient = {
               departmentId,
               date: new Date(date),
               patientId: patients.patientId,
               file: selectedFile,
            }

            dispatch(putDatas(datasOfPatient))
            notifyCall('success', 'Данные успешно отправлены!')
            navigate(`${patients?.patientId}/results`)
         }
      } catch (error) {
         notifyCall('error', 'Данные не отправлены!')
      }
   }

   return (
      <Container>
         <HeaderPart>
            <P>
               {patients?.firstName} {patients?.lastName}
            </P>
            <ButtonStyled onClick={handleOpen}>
               <span>
                  <img src={buttonPlusIcon} alt="plus" />
               </span>
               добавить результаты
            </ButtonStyled>
         </HeaderPart>

         <BasicModalStyle open={open} onClose={handleClose}>
            <ModalContainer>
               <IconButtonStyled onClick={cancelHandler}>
                  <CloseIcon />
               </IconButtonStyled>
               <Topic>Добавление результата</Topic>
               <Div>
                  <div className="serviceInput">
                     <LabelServiceStyle htmlFor="id">Услуга</LabelServiceStyle>
                     <SelectUiStyle
                        items={MED_SERVICE}
                        value={name}
                        onChange={changeHandler}
                        placeholder="Выберите услугу"
                     />
                  </div>
                  <div className="calendar">
                     <LabelServiceStyle htmlFor="id">
                        Дата сдачи
                     </LabelServiceStyle>
                     <DatePicker
                        className="calendar"
                        value={inputDate}
                        onChange={chooseHandler}
                     />
                  </div>
               </Div>
               <FileInput>
                  <FormLabelStyle htmlFor="id">Файл</FormLabelStyle>
                  <AvatarUpload onChange={fileChange} />
               </FileInput>
               <ButtonContainer>
                  <Button className="cancel" onClick={cancelHandler}>
                     Отменить
                  </Button>
                  <Button
                     className="add"
                     onClick={submitHandler}
                     disabled={!disabledValue}
                  >
                     добавить
                  </Button>
               </ButtonContainer>
            </ModalContainer>
         </BasicModalStyle>
         <PaperStyled>
            <div>
               <h3>
                  <span>
                     {patients?.firstName} {patients?.lastName}
                  </span>
               </h3>{' '}
               <br />
               <p>
                  имя: <br />
                  <span>{patients?.firstName}</span>
               </p>{' '}
               <br />
               <p>
                  фамиля: <br />
                  <span>{patients?.lastName}</span>
               </p>{' '}
               <br />
               <p>
                  номер телефона: <br />
                  <span>{patients?.phoneNumber}</span>
               </p>{' '}
               <br />
               <p>
                  email: <br />
                  <span>{patients?.email}</span>
               </p>{' '}
               <br />
            </div>
         </PaperStyled>
      </Container>
   )
}

export default PatientDetails

const FormLabelStyle = styled(FormLabel)({
   fontFamily: 'Manrope',
   fontSize: '14px',
   fontWeight: 400,
   lineHeight: '19px',
   color: '#464444',
   paddingLeft: '5px',
})

const LabelServiceStyle = styled('label')({
   fontFamily: 'Manrope',
   fontSize: '14px',
   fontWeight: 400,
   lineHeight: '19px',
   color: '#464444',
})
const BasicModalStyle = styled(BasicModal)({
   '& .MuiBox-root': {
      borderRadius: '15px',
   },
})
const SelectUiStyle = styled(PatientSelect)({
   width: '270px',
   height: '37px',
})

const Container = styled('div')({
   background: 'rgba(245, 245, 245, 0.61)',
   padding: '0px 70px',
})
const ModalContainer = styled('div')({
   width: '560px',
   padding: '15px 40px 32px 40px',
})

const IconButtonStyled = styled(IconButton)({
   marginLeft: '470px',
})

const P = styled('p')({
   fontSize: '22px',
   marginTop: '40px',
   fontFamily: 'Manrope',
   fontWeight: 400,
})
const HeaderPart = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
})
const ButtonStyled = styled(Button)({
   padding: '10px 15px',
   marginTop: '30px',
   span: {
      width: '12px',
      height: '12px',
      marginRight: '15px',
   },
})
const PaperStyled = styled(Paper)({
   height: '1300px',
   margin: 'auto',
   marginTop: '20px',
   fontFamily: 'Manrope',
   '& div': {
      paddingTop: '20px',
      marginLeft: '20px',

      h3: {
         fontWeight: 500,
         fontSize: '20px',
         lineHeight: '27px',
      },
      p: {
         fontSize: '14px',
         fontWeight: 400,
         lineHeight: '17px',
         color: '#4D4E51',
         span: {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '22px',
            color: '#222222',
         },
      },
   },
})
const Div = styled('div')({
   display: 'flex',
   gap: '15px',
   padding: '32px 0 38px 0',
   '& .serviceInput': {
      width: '400px',
      height: '10px',
      fontSize: '18px',
      color: '#464444',
   },
   '& .calendar': {
      width: '200px',
      height: '38px',
      borderRadius: '6px',
      marginRight: '20px',
   },
})
const Topic = styled('p')({
   fontFamily: ' Manrope',
   fontSize: '24px',
   fontWeight: 500,
   lineHeight: '33px',
   textAlign: 'center',
})
const FileInput = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   paddingBottom: '30px',
})
const ButtonContainer = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   '& .cancel': {
      background: 'none',
      border: '1px solid #959595',
      padding: '10px 80px',
      color: '#959595',
      '&:hover': {
         background: '#959595',
         color: '#fff',
      },
      '&:active': {
         background: '#959595',
         color: '#FFFF',
      },
   },
   '& .add': {
      padding: '10px 80px',
   },
})
