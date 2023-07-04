import { Stack, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import { useFormik } from 'formik'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectUi } from '../../components/UI/SelectUi'
import { ReactComponent as B } from '../../assets/icons/B.svg'
import { ReactComponent as U } from '../../assets/icons/U.svg'
import { ReactComponent as I } from '../../assets/icons/I.svg'
import { ReactComponent as List } from '../../assets/icons/List.svg'
import { ReactComponent as Num } from '../../assets/icons/Num.svg'
import Button from '../../components/UI/Button'
import AvatarUpload from '../../components/UI/Avatar'
import { department } from '../../utlis/services/department'
import {
   imageSpecialistService,
   postSpecialistsService,
} from '../../api/specialistService'
import {
   AddContainer,
   InputStyled,
   MainContainer,
   StyledNavLink,
   StyledTextField,
   TitlePhoto,
   Wrapper,
   Container,
   StyledInputLabel,
} from './specialist-style'
import { addSpecialistSchema } from '../../utlis/helpers/general'
import useToast from '../../hooks/useToast'

const AddSpecialist = () => {
   const navigate = useNavigate()
   const [selected, setSelected] = useState('')
   const [photo, setPhoto] = useState('')
   const [imgUrl, setImgUrl] = useState('')
   const { notify } = useToast()
   const handleSelection = (event, newSelected) => {
      setSelected(newSelected)
   }
   const bold = selected.includes('bold')
   const italic = selected.includes('italic')
   const underline = selected.includes('underlined')

   const imgChangeHandler = async (e) => {
      const image = e.target.files[0]
      const formData = new FormData()
      formData.append('file', image)
      setPhoto(formData)

      if (image) {
         const reader = new FileReader()
         reader.onload = () => {
            setImgUrl(reader.result)
         }
         reader.readAsDataURL(image)
      }
   }

   const postSpecialistImage = async () => {
      try {
         const imageResponse = await imageSpecialistService(photo)
         const imageUrl = imageResponse.data.link
         setImgUrl(imageUrl)

         return imageUrl
      } catch (error) {
         return notify('error', error.response?.data.message)
      }
   }
   const postSpecialist = async (sendData) => {
      try {
         const { data } = await postSpecialistsService(sendData)
         navigate(-1)
         notify('success', 'Специалист успешно добавлен!')
         return data
      } catch (error) {
         return notify('error', 'Что-то пошло не так')
      }
   }

   const { values, handleChange, handleSubmit, errors, touched } = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         position: '',
         description: '',
         department: '',
      },

      validationSchema: addSpecialistSchema,

      onSubmit: async (values) => {
         const dataSpecialist = {
            departmentId: values.department,
            description: values.description,
            firstName: values.firstName,
            lastName: values.lastName,
            position: values.position,
         }
         const fileResponce = photo && (await postSpecialistImage())
         if (fileResponce) {
            postSpecialist({ ...dataSpecialist, image: fileResponce })
         }
      },
   })

   return (
      <MainContainer>
         <Stack spacing={2}>
            <Container separator="›" aria-label="breadcrumb">
               <StyledNavLink to="/admin/specialists">
                  <p>Специалисты</p>
               </StyledNavLink>
               <p>Добавление специалиста</p>
            </Container>
         </Stack>
         <Title>Специалисты</Title>
         <AddContainer>
            <Wrapper>
               <div style={{ paddingRight: '40px' }}>
                  <TitlePhoto>
                     <AvatarUpload onChange={imgChangeHandler} photo={imgUrl} />
                     <p>
                        Нажмите для добавления <br /> фотографии
                     </p>
                  </TitlePhoto>
               </div>
               <div>
                  <Info>Добавление специалиста</Info>
                  <form onSubmit={handleSubmit}>
                     <FormContainer>
                        <Div>
                           <StyledInputLabel htmlFor="firstName">
                              Имя
                           </StyledInputLabel>
                           <InputStyled
                              placeholder="Напишите имя"
                              style={{ marginBottom: '20px' }}
                              name="firstName"
                              onChange={handleChange}
                              value={values.firstName}
                           />
                           {touched.firstName && errors.firstName && (
                              <StyledSpan>{errors.firstName}</StyledSpan>
                           )}
                           <StyledInputLabel>Отделение</StyledInputLabel>
                           <StyledSelect
                              items={department}
                              onChange={handleChange}
                              value={values.department}
                              placeholder="Выберите отделение"
                              name="department"
                           />
                           {touched.department && errors.department && (
                              <StyledSpan>{errors.department}</StyledSpan>
                           )}
                        </Div>

                        <Div>
                           <StyledInputLabel htmlFor="lastName">
                              Фамилия
                           </StyledInputLabel>
                           <InputStyled
                              placeholder="Напишите фамилию"
                              style={{ marginBottom: '20px' }}
                              onChange={handleChange}
                              value={values.lastName}
                              name="lastName"
                           />
                           {touched.lastName && errors.lastName && (
                              <StyledSpan>{errors.lastName}</StyledSpan>
                           )}

                           <StyledInputLabel htmlFor="position">
                              Должность
                           </StyledInputLabel>
                           <InputStyled
                              placeholder="Напишите должность"
                              onChange={handleChange}
                              value={values.position}
                              name="position"
                           />
                           {touched.position && errors.position && (
                              <StyledSpan>{errors.position}</StyledSpan>
                           )}
                        </Div>
                     </FormContainer>
                     <StyledInputLabel sx={{ marginTop: '1rem' }}>
                        Описание
                     </StyledInputLabel>
                     <div
                        style={{
                           border: '1px solid #909CB5',
                           width: '96%',
                           borderRadius: '5px',
                        }}
                     >
                        <ToggleButtonGroup
                           value={selected}
                           onChange={handleSelection}
                           aria-label="text formatting"
                           style={{
                              display: 'flex',
                              gap: '2rem',
                              border: '1px solid #909CB5',
                           }}
                        >
                           <IconStyled value="bold" aria-label="bold">
                              <B />
                           </IconStyled>
                           <IconStyled value="italic" aria-label="italic">
                              <I />
                           </IconStyled>
                           <IconStyled
                              value="underlined"
                              aria-label="underlined"
                           >
                              <U />
                           </IconStyled>
                           <IconStyled value="list" aria-label="list">
                              <List />
                           </IconStyled>
                           <IconStyled value="number" aria-label="number">
                              <Num />
                           </IconStyled>
                        </ToggleButtonGroup>
                        <StyledTextField
                           placeholder="Введите описание специалиста"
                           onChange={handleChange}
                           value={values.description}
                           name="description"
                           minRows={10}
                           maxRows={30}
                           bold={bold}
                           italic={italic}
                           underline={underline}
                        />
                        {touched.description && errors.description && (
                           <StyledSpan>{errors.description}</StyledSpan>
                        )}
                     </div>
                     <StyledContainerButton>
                        <StyledCancel
                           onClick={() => {
                              navigate('/admin/specialists')
                           }}
                        >
                           Отменить
                        </StyledCancel>
                        <Button style={{ padding: '10px 85px' }} type="submit">
                           Добавить
                        </Button>
                     </StyledContainerButton>
                  </form>
               </div>
            </Wrapper>
         </AddContainer>
      </MainContainer>
   )
}

export default AddSpecialist

const Title = muiStyled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontWeight: 400,
      fontSize: '22px',
   },
}))

const FormContainer = muiStyled('div')(() => ({
   '&': {
      display: 'flex',
   },
}))

const Div = muiStyled('div')(() => ({
   '&': {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '2rem',
   },
}))

const Info = muiStyled('p')(() => ({
   '&': {
      marginBottom: '20px',
      color: '#222222',
      fontSize: '18px',
      letterSpacing: '0.2px',
      fontWeight: 600,
   },
}))

const StyledSelect = styled(SelectUi)(() => ({
   fontSize: '14px',
   height: '35px',
}))

const StyledCancel = styled(Button)(() => ({
   '&': {
      background: 'none',
      color: '#959595',
      border: '1px solid#959595',
      padding: '10px 85px',
      ':hover': {
         background: 'none',
         color: '#959595',
      },
   },
}))

const StyledContainerButton = styled('div')(() => ({
   marginTop: '68px',
   display: 'flex',
   justifyContent: 'end',
   marginRight: '2rem',
   gap: '1rem',
}))

const IconStyled = styled(ToggleButton)(() => ({
   border: 'none',
}))

const StyledSpan = styled('span')(() => ({
   fontSize: '12px',
   color: 'red',
}))
