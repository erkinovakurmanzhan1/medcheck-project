import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router'
import { styled, FormControl, InputLabel } from '@mui/material'
import Button from '../../../../components/UI/Button'
import Input from '../../../../components/UI/input/Input'
import useToast from '../../../../hooks/useToast'
import {
   getDataPatiendService,
   postDataProfileService,
} from '../../../../api/profileService'
import { postDataProfieValid } from '../../../../utlis/helpers/general'
import ProfileLayout from './ProfileLayout'

const PersonalData = () => {
   const { notify } = useToast()
   const navigate = useNavigate()

   const postDataProfile = async (dataProfile) => {
      try {
         await postDataProfileService(dataProfile)
         navigate('/')
         return notify('success', 'отправлено успешно')
      } catch (error) {
         return notify('error', 'ошибка')
      }
   }

   const { values, handleChange, handleSubmit, errors, touched, setValues } =
      useFormik({
         initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
         },

         validationSchema: postDataProfieValid,
         onSubmit: (values) => {
            const dataProfile = {
               firstName: values.firstName,
               lastName: values.lastName,
               phoneNumber: String(values.phoneNumber),
               email: values.email,
            }

            postDataProfile(dataProfile)
         },
      })

   async function getPatientData() {
      try {
         const { data } = await getDataPatiendService()
         console.log(data, 'data')
         return setValues(data)
      } catch (error) {
         return notify('error', 'ошибка')
      }
   }

   useEffect(() => {
      getPatientData()
   }, [postDataProfieValid])

   return (
      <Container onSubmit={handleSubmit} noValidate autoComplete="off">
         <ProfileLayout />
         <StyledTitleText>Ваши личные данные</StyledTitleText>
         <StyledForm>
            <div>
               <StyledInputLabel htmlFor="name">Имя</StyledInputLabel>
               <FormControl>
                  <StyledInput
                     variant="outlined"
                     type="text"
                     label=""
                     id="name"
                     name="firstName"
                     onChange={handleChange}
                     value={values.firstName}
                  />
               </FormControl>
               {touched.firstName && errors.firstName && (
                  <StyledSpan>{errors.firstName}</StyledSpan>
               )}

               <StyledInputLabel htmlFor="email">E-mail</StyledInputLabel>

               <FormControl>
                  <StyledInput
                     variant="outlined"
                     type="email"
                     label=""
                     id="email"
                     onChange={handleChange}
                     value={values.email}
                  />
               </FormControl>
               {touched.email && errors.email && (
                  <StyledSpan>{errors.email}</StyledSpan>
               )}
            </div>
            <div>
               <StyledInputLabel htmlFor="lastName">Фамилия</StyledInputLabel>

               <FormControl>
                  <StyledInput
                     variant="outlined"
                     type="text"
                     label=""
                     id="lastName"
                     onChange={handleChange}
                     value={values.lastName}
                  />
               </FormControl>
               {touched.lastName && errors.lastName && (
                  <StyledSpan>{errors.lastName}</StyledSpan>
               )}

               <StyledInputLabel htmlFor="phoneNumber">
                  Телефон
               </StyledInputLabel>
               <FormControl>
                  <StyledInput
                     variant="outlined"
                     type="phone"
                     label=""
                     id="phoneNumber"
                     onChange={handleChange}
                     value={values.phoneNumber}
                  />
               </FormControl>
               <StyledSpan>
                  {errors.phoneNumber}
                  {values.phoneNumber &&
                     !/^\+996\d{9}$/i.test(values.phoneNumber) && (
                        <StyledSpan>
                           номер должен содержить <SpanStyled>+</SpanStyled> и
                           <SpanStyled> 996</SpanStyled>
                        </StyledSpan>
                     )}
               </StyledSpan>
            </div>
         </StyledForm>
         <StyledBoxButton>
            <StyledButton type="submit" variant="contained">
               Назад
            </StyledButton>
            <Button type="submit" variant="outlined">
               Редактировать
            </Button>
         </StyledBoxButton>
      </Container>
   )
}

export default PersonalData

const Container = styled('form')`
   width: 85%;
   margin-top: 26px;
   margin-bottom: 40px;
   margin: auto;
`

const StyledTitleText = styled('h1')`
   font-family: 'Manrope';
   font-weight: 600;
   font-size: 1.13rem;
   line-height: 25px;
   color: #222222;
   margin-bottom: 20px;
   letter-spacing: 0.2px;
`
const StyledForm = styled('div')(() => ({
   '& ': {
      width: '100%',
      display: 'flex',
      justifyContent: 'start',
      gap: '30px',
      marginBottom: '5px',
   },
   '& div ': {
      width: '100%',
      borderRadius: ' 8px',
   },
}))

const StyledInput = styled(Input)(() => ({
   '& ': {
      width: '100%',
      borderRadius: '8px',
      border: '1px solid #c5c5c5',
      margin: '4px 5px 26px 2px ',
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      color: '#959595',
   },
   '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
      fontSize: '1rem',
      color: '#222222',
      fontFamily: 'Manrope',
      fontWeight: 400,
      lineHeight: '22px',
   },
   '& :hover': {
      borderRadius: '8px',
      border: '1px  #83edf5',
   },
   ' &:focus': {
      borderRadius: '8px',
      border: '1px solid #959595',
   },
   '&:active': {
      borderRadius: '8px',
      border: '1px solid #048741',
   },
   '& :invalid': {
      borderRadius: '8px',
      border: '2px solid #f91515',
   },
}))
const StyledBoxButton = styled('div')`
   width: 100%;
   display: flex;
   justify-content: end;
   margin-top: 26px;
   margin-bottom: 40px;

   & button {
      margin-left: 20px;
      width: 23%;
   }
`

const StyledInputLabel = styled(InputLabel)(() => ({
   '&': {
      fontSize: '1rem',
      color: '#464444',
      fontFamily: 'Manrope',
      fontWeight: 400,
      lineHeight: '19px',
   },
}))
const StyledButton = styled(Button)(() => ({
   '&': {
      fontFamily: 'Manrope,sans-serif',
      padding: '14px 67px',
      lineHeight: '16px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#027B44',
      background: '#FFFFFF',
      border: '2px solid #027B44',
      borderRadius: '10px',
      letterSpacing: ' 0.03em',
   },
   '&:hover': {
      color: '#027B44',
      background: '#FFFFFF',
   },
   '&:active': {
      background: 'linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%)',
      color: '#FFFF',
   },
   '&:disabled': {
      background: '#D3D3D3',
      color: '#FFFF',
   },
}))

const StyledSpan = styled('span')(() => ({
   fontSize: '12px',
   color: 'red',
}))

const SpanStyled = styled('span')(() => ({
   color: 'green',
}))
