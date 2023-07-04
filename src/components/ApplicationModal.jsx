import * as React from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
   FormLabel,
   Grid,
   IconButton,
   InputAdornment,
   TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { ReactComponent as ButtonIcon } from '../assets/serviceIcons/ButtonIcon.svg'
import { ReactComponent as Users } from '../assets/serviceIcons/Users.svg'
import { ReactComponent as Phone } from '../assets/serviceIcons/phoneForModal.svg'
import Button from './UI/Button'
import { postDatas } from '../redux/reducers/card/card.thunk'
import useToast from '../hooks/useToast'
import { ReactComponent as CloseIcon } from '../assets/login/CloseIcon.svg'

// eslint-disable-next-line no-unused-vars
export const ApplicationModal = ({ onClose }) => {
   const dispatch = useDispatch()

   const [name, setName] = useState('')
   const [number, setNumber] = useState('')
   const [successfulSent, setSuccessfulSent] = useState(false)

   const { notify: notifyCall } = useToast()

   const disabledInfo = name && number
   const nameChangeHandler = (e) => {
      setName(e.target.value)
      setSuccessfulSent(false)
   }
   const numberChangeHandler = (e) => {
      setNumber(e.target.value)
      setSuccessfulSent(false)
   }

   const submitHandler = () => {
      try {
         if (name.length >= 2 && number.length === 13) {
            const patientData = {
               name,
               phoneNumber: number,
            }
            dispatch(postDatas(patientData))
            setName('')
            setNumber('')
            setSuccessfulSent(true)
            notifyCall('success', 'Заявка успешно отправлено!')
         } else {
            notifyCall('error', 'Данные неправильно заполнены!')
         }
      } catch (error) {
         notifyCall('error', 'Заявка не отправлено!')
      }
   }

   return (
      <div>
         <CloseIconStyleContianer>
            <IconButton style={{ margin: '10px 10px 0 0' }} onClick={onClose}>
               <CloseIcon className="closeIcon" />
            </IconButton>
         </CloseIconStyleContianer>
         {successfulSent ? (
            <SuccessSmsBox>
               <DialogTitleStyled>Заявка успешно отправлена!</DialogTitleStyled>
               <DialogContentTextStyled>
                  В ближайшее время с вами свяжется администратор <br />
                  для согласования деталей.
               </DialogContentTextStyled>
            </SuccessSmsBox>
         ) : (
            <>
               <DialogTitleStyled>Оставьте заявку</DialogTitleStyled>
               <DialogContent>
                  <DialogContentTextStyled>
                     Оставьте свой номер и наши специалисты свяжутся с Вами
                     <br /> в ближайшее время
                  </DialogContentTextStyled>
                  <InputBoxStyled>
                     <div>
                        <FormLabelStyled>Как к Вам обратиться?</FormLabelStyled>
                        <TextFieldStyled
                           margin="dense"
                           id="name"
                           type="text"
                           variant="outlined"
                           placeholder="Введите имя"
                           onChange={nameChangeHandler}
                           value={name}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <Users />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </div>
                     <div>
                        <FormLabelStyled>
                           Номер мобильного телефона
                        </FormLabelStyled>
                        <TextFieldStyled
                           id="name"
                           margin="dense"
                           type="text"
                           variant="outlined"
                           placeholder="+996 (___) __-__-__"
                           onChange={numberChangeHandler}
                           value={number}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <Phone />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </div>
                  </InputBoxStyled>
               </DialogContent>
               <ButtonContainer>
                  <ButtonStyle
                     disabled={!disabledInfo}
                     variant="outlined"
                     onClick={submitHandler}
                  >
                     <span>ОТПРАВИТЬ ЗАЯВКУ</span>{' '}
                     <ButtonIconStyle disabled={disabledInfo} />{' '}
                  </ButtonStyle>
               </ButtonContainer>
            </>
         )}
      </div>
   )
}
const ButtonIconStyle = styled(ButtonIcon)(({ disabled }) => ({
   '&': {
      ellipse: {
         fill: disabled ? '#13AF5B' : 'gray',
      },
   },
}))
const InputBoxStyled = styled(Grid)(() => ({
   '&': {
      display: 'flex',
      gap: '20px',
   },
}))

const SuccessSmsBox = styled('div')(() => ({
   '&': {
      padding: '65px 32px 60px 31px',
   },
}))
const FormLabelStyled = styled(FormLabel)(() => ({
   '&': {
      fontSize: '14px',
      color: '#4D4E51',
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      lineHeight: '12px',
   },
}))

const DialogTitleStyled = styled(DialogTitle)(() => ({
   '&': {
      fontStyle: 'normal',
      fontFamily: 'Manrope',
      fontSize: '36px',
      fontWeight: 500,
      lineHeight: ' 49px',
      color: '#222222',
      textAlign: 'center',
   },
}))

const DialogContentTextStyled = styled(DialogContentText)(() => ({
   '&': {
      fontStyle: 'normal',
      fontFamily: 'Manrope',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '25px',
      color: '#222222',
      textAlign: 'center',
      paddingBottom: '50px',
   },
}))
const TextFieldStyled = styled(TextField)(() => ({
   '&': {
      borderRadius: '5px',
      background: '#FFFFFF',
      border: ' 1px solid rgba(0, 147, 68, 0.5)',
      input: {
         fontFamily: 'Manrope',
         padding: '10px 128px 10px 0px',
      },
   },
}))

const ButtonStyle = styled(Button)(() => ({
   '&': {
      borderRadius: '24px',
      fontSize: '14px',
      padding: '10px 12px 10px 24px',
      span: {
         marginRight: '16px',
      },
   },
}))
const CloseIconStyleContianer = styled('div')(() => ({
   '&': {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
}))

const ButtonContainer = styled('div')(() => ({
   '&': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: '10px',
   },
}))
