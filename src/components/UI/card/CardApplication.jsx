import * as React from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FormLabel, Grid, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { ReactComponent as ButtonIcon } from '../../../assets/serviceIcons/ButtonIcon.svg'
import { ReactComponent as Users } from '../../../assets/serviceIcons/Users.svg'
import { ReactComponent as Phone } from '../../../assets/serviceIcons/phoneForModal.svg'
import { ReactComponent as Women } from '../../../assets/serviceIcons/Women.svg'
import Button from '../Button'
import Input from '../input/Input'
import { postDatas } from '../../../redux/reducers/card/card.thunk'
import useToast from '../../../hooks/useToast'

// eslint-disable-next-line no-unused-vars
export const CardApplication = ({ openSignInModal }) => {
   const dispatch = useDispatch()

   const [name, setName] = useState('')
   const [number, setNumber] = useState('')
   const { notify: notifyCall } = useToast()

   const disabled = name && number
   const nameChangeHandler = (e) => {
      setName(e.target.value)
   }
   const numberChangeHandler = (e) => {
      setNumber(e.target.value)
   }

   const submitHandler = () => {
      try {
         if (name.length >= 2 && number.length === 13) {
            const patientData = {
               name,
               phoneNumber: number,
            }
            dispatch(postDatas(patientData))
            notifyCall('success', 'Заявка успешно отправлено!')
            setName('')
            setNumber('')
         } else {
            notifyCall('error', 'Данные неправильно заполнены!')
         }
      } catch (error) {
         console.error(error)
         notifyCall('error', 'Заявка не отправлено!')
      }
   }

   return (
      <div>
         <ModalContainer>
            <div className="container">
               <DialogTitleStyled>Оставьте заявку</DialogTitleStyled>
               <DialogContent>
                  <DialogContentTextStyled>
                     Оставьте свой номер и наши специалисты свяжутся с Вами
                     <br /> в ближайшее время
                  </DialogContentTextStyled>
                  <InputBoxStyled>
                     <Input1>
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
                     </Input1>
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
               <ButtonBox
                  disabled={!disabled}
                  variant="outlined"
                  onClick={submitHandler}
               >
                  <span>ОТПРАВИТЬ ЗАЯВКУ</span>{' '}
                  <ButtonIconStyle disabled={disabled} />{' '}
               </ButtonBox>
            </div>
            <PhotoContent>
               <Women />
            </PhotoContent>
         </ModalContainer>
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
const Input1 = styled('div')(() => ({
   '&': {
      marginLeft: '61px',
      marginRight: '13px',
   },
}))

const InputBoxStyled = styled(Grid)(() => ({
   '&': {
      display: 'flex',
   },
}))

const FormLabelStyled = styled(FormLabel)(() => ({
   '&': {
      fontSize: '14px',
      color: '#4D4E51',
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      lineHeight: '12px',
      marginBottom: '6px',
   },
}))

const DialogTitleStyled = styled(DialogTitle)(() => ({
   '&': {
      fontStyle: 'normal',
      marginLeft: ' 186px',
      marginTop: '45px',
      fontFamily: 'Manrope',
      fontSize: '36px',
      fontWeight: 500,
      lineHeight: ' 49px',
      color: '#222222',
   },
}))
const ModalContainer = styled('div')(() => ({
   '&': {
      display: 'flex',
      marginTop: '190px',
      marginLeft: '140px',
      marginBottom: '120px',
      width: '660px',
      height: '460px',
   },
   '& .container': {
      border: 'none',
      background: '#DBEBFF',
      borderRadius: '20px',
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
      marginBottom: '50px',
      textAlign: 'center',
   },
}))
const TextFieldStyled = styled(Input)(() => ({
   '&': {
      width: '263px',
      borderRadius: '5px',
      background: '#FFFFFF',
      border: ' 1px solid rgba(0, 147, 68, 0.5)',
      input: {
         fontFamily: 'Manrope',
      },
   },
}))

const ButtonBox = styled(Button)(() => ({
   '&': {
      borderRadius: '24px',
      marginLeft: '221px',
      fontSize: '14px',
      padding: '8px 12px 8px 24px',
      span: {
         marginRight: '16px',
      },
   },
}))
const PhotoContent = styled('div')(() => ({
   '&': {
      marginTop: '-70px',
      width: '580px',
      height: '530px',
      position: 'absolute',
      marginLeft: '580px',
   },
}))
