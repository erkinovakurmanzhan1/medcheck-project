import React, { useEffect, useState } from 'react'
import { MenuItem, Select, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import styled from '@emotion/styled'
import {
   Container,
   InputStyled,
   MainContainer,
   StyledInputLabel,
   StyledNavLink,
   StyledTextField,
   TitlePhoto,
   Wrapper,
} from './specialist-style'
import { department } from '../../utlis/services/department'
import Button from '../../components/UI/Button'
import AvatarUpload from '../../components/UI/Avatar'
import {
   getOneSpecialistService,
   imageSpecialistService,
   updateSpecialistService,
} from '../../api/specialistService'
import useToast from '../../hooks/useToast'

const ITEM_HEIGHT = 60
const ITEM_PADDING_TOP = 0
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 360,
         marginLeft: -16,
      },
   },
}

const UpdateSpecialist = () => {
   const navigate = useNavigate()
   const [doctor, setDoctor] = useState({})
   const { doctorId } = useParams()
   const [oneSpecialist, setOneSpecialist] = useState([])
   const [ids, setId] = useState()
   const [updatePhoto, setUpdatePhoto] = useState('')
   const [updateFirstName, setUpdateFirstName] = useState('')
   const [updateLastName, setUpdateLastName] = useState('')
   const [updatePosition, setUpdatePosition] = useState('')
   const [updateDescription, setUpdateDescription] = useState('')
   const [updateDepartment, setUpdateDepartment] = useState('')
   const { notifyCall } = useToast()

   const getOneSpecialist = async (id) => {
      try {
         const { data } = await getOneSpecialistService(id)
         setOneSpecialist(data)
         return data
      } catch (error) {
         return error
      }
   }

   useEffect(() => {
      getOneSpecialist(doctorId)
   }, [doctorId])

   useEffect(() => {
      setDoctor(oneSpecialist)
      setUpdateFirstName(oneSpecialist.firstName)
      setUpdateLastName(oneSpecialist.lastName)
      setUpdatePosition(oneSpecialist.position)
      setUpdateDescription(oneSpecialist.description)
      setUpdateDepartment(oneSpecialist.departmentName)
      setUpdatePhoto(oneSpecialist.image)
      setId(oneSpecialist.id)
   }, [oneSpecialist])

   const updateSpecialist = async (putSpecialist) => {
      try {
         await updateSpecialistService(putSpecialist)
         return navigate('/admin/specialists')
      } catch (error) {
         return notifyCall('error', error.response?.data.message)
      }
   }

   const changeFirstName = (e) => {
      setUpdateFirstName(e.target.value)
   }
   const changeLastName = (e) => {
      setUpdateLastName(e.target.value)
   }
   const changeposition = (e) => {
      setUpdatePosition(e.target.value)
   }
   const changeDescription = (e) => {
      setUpdateDescription(e.target.value)
   }

   const changeDepartment = (e) => {
      setUpdateDepartment(e.target.value)
   }

   const imgChangeHandler = async (e) => {
      try {
         const image = e.target.files[0]
         const formData = new FormData()
         formData.append('file', image)
         const data = await imageSpecialistService(formData)
         return setUpdatePhoto(data.data.link)
      } catch (error) {
         return error
      }
   }

   const updateHandler = (event) => {
      event.preventDefault()
      const dataSpecialist = {
         doctorId,
         departmentId: ids,
         firstName: updateFirstName,
         lastName: updateLastName,
         position: updatePosition,
         image: updatePhoto,
         description: updateDescription,
      }

      updateSpecialist(dataSpecialist)
   }

   const clickO = (id) => {
      setId(id)
   }

   return (
      <MainContainer key={doctor.id}>
         <Stack spacing={2}>
            <Container separator="›" aria-label="breadcrumb">
               <StyledNavLink to="/admin/specialists">
                  <p>Специалисты</p>
               </StyledNavLink>
               <StyledNamesContainer>
                  <p>{doctor.firstName}</p>
                  <p>{doctor.lastName}</p>
               </StyledNamesContainer>
            </Container>
         </Stack>
         <StyledNamesContainer>
            <Stylednames>{doctor.firstName}</Stylednames>
            <Stylednames>{doctor.lastName}</Stylednames>
         </StyledNamesContainer>
         <UpdateContainer>
            <Wrapper>
               <div style={{ paddingRight: '40px' }}>
                  <TitlePhoto>
                     <AvatarUpload
                        onChange={imgChangeHandler}
                        photo={updatePhoto}
                     />
                     <p>Сменить фото</p>
                  </TitlePhoto>
               </div>
               <form onSubmit={updateHandler}>
                  <FormContainer>
                     <Div>
                        <StyledInputLabel htmlFor="firstName">
                           Имя
                        </StyledInputLabel>
                        <InputStyled
                           style={{ marginBottom: '20px' }}
                           name="firstName"
                           onChange={changeFirstName}
                           value={updateFirstName}
                        />
                        <StyledInputLabel htmlFor="lastName">
                           Отделение
                        </StyledInputLabel>
                        <StyledSelect
                           sx={{
                              fontFamily: 'Manrope',
                              fontWeight: 400,
                              color: '#222222',
                           }}
                           name="select"
                           onChange={changeDepartment}
                           value={updateDepartment}
                           MenuProps={MenuProps}
                        >
                           {department.map((elem) => (
                              <MenuItem
                                 onClick={() => clickO(elem.id)}
                                 key={elem.id}
                                 value={elem.title}
                                 sx={{
                                    maxHeight: '100px',
                                    fontFamily: 'Manrope',
                                 }}
                              >
                                 {elem.title}
                              </MenuItem>
                           ))}
                        </StyledSelect>
                     </Div>
                     <Div>
                        <StyledInputLabel htmlFor="position">
                           Фамилия
                        </StyledInputLabel>
                        <InputStyled
                           style={{ marginBottom: '20px' }}
                           name="position"
                           onChange={changeLastName}
                           value={updateLastName}
                        />
                        <StyledInputLabel htmlFor="description">
                           Должность
                        </StyledInputLabel>
                        <InputStyled
                           style={{ marginBottom: '20px' }}
                           name="description"
                           onChange={changeposition}
                           value={updatePosition}
                        />
                     </Div>
                  </FormContainer>
                  <StyledInputLabel htmlFor="description">
                     Описание
                  </StyledInputLabel>
                  <TextFieldDiv>
                     <StyledTextField
                        name="description"
                        minRows={10}
                        maxRows={30}
                        value={updateDescription}
                        onChange={changeDescription}
                     />
                  </TextFieldDiv>
                  <StyledContainerButton>
                     <StyledCancel
                        onClick={() => {
                           navigate('/admin/specialists')
                        }}
                     >
                        Назад
                     </StyledCancel>

                     <Button style={{ padding: '10px 85px' }} type="submit">
                        Редактировать
                     </Button>
                  </StyledContainerButton>
               </form>
            </Wrapper>
         </UpdateContainer>
      </MainContainer>
   )
}

export default UpdateSpecialist

const StyledNamesContainer = styled('div')({
   display: 'flex',
   gap: '0.5rem',
})

const Stylednames = styled('p')({
   color: '#222222',
   fontSize: '22px',
   fontFamily: 'Manrope',
})

const UpdateContainer = styled('div')(() => ({
   '&': {
      background: '#FFFFFF',
      borderRadius: '6px',
      height: '100%',
   },
}))

const Div = styled('div')(() => ({
   '&': {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '2rem',
   },
}))

const FormContainer = styled('div')(() => ({
   '&': {
      display: 'flex',
   },
}))

const TextFieldDiv = styled('div')(() => ({
   border: '1px solid #909CB5',
   width: '96%',
   borderRadius: '5px',
}))

const StyledCancel = styled(Button)(() => ({
   '&': {
      background: 'none',
      color: '#048741',
      border: '1px solid #048741',
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

const StyledSelect = styled(Select)(() => ({
   padding: '1px',
   fontSize: '14px',
   height: '36px',
   fontFamily: 'Manrope',
   fontWeight: 400,
   color: '#222222',
   border: '1px solid #D9D9D9',
   '&:hover': {
      color: '#4D4E51',
   },
}))
