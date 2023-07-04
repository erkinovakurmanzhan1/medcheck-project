import React, { useEffect, useMemo, useState } from 'react'
import {
   CircularProgress,
   Grid,
   IconButton,
   // TablePagination,
   TableRow,
   styled,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AppTable from '../../components/UI/Table'
import SwitchApp from '../../components/UI/switch/Switch'
import { ReactComponent as TrashIcon } from '../../assets/icons/TrashTable.svg'
import { ReactComponent as UpdateIcon } from '../../assets/icons/updateIcon.svg'
import Button from '../../components/UI/Button'
import SearchInput from '../../components/UI/SeacrchInput'
import { ReactComponent as Plus } from '../../assets/icons/plus.svg'
import { useDebounce } from '../../utlis/helpers/general'
import { MainContainer } from './specialist-style'
import {
   deleteSpecialistService,
   getSpecialists,
   postSpecialistIsActiveReq,
} from '../../api/specialistService'
import useToast from '../../hooks/useToast'

const Specialists = () => {
   const navigate = useNavigate()
   const [isButtonDisabled, setIsButtonDisabled] = useState(false)
   const [specisalists, setSpecialists] = useState([])
   const [loading, setIsLoading] = useState(false)
   // const [size, setSize] = useState(1)
   // const [page, setPage] = useState(1)
   const [queryParams, setQueryParams] = useState({
      keyWord: null,
   })
   const [searchTerm, setSearchTerm] = useState('')
   const { notify } = useToast()

   const getAllSpecialists = async (queryParams) => {
      try {
         setIsLoading(true)
         const { data } = await getSpecialists(queryParams)
         setIsLoading(false)
         return setSpecialists(data)
      } catch (error) {
         return notify('error', 'Произошла ошибка при загрузке')
      }
   }

   console.log(isButtonDisabled)
   const deleteSpecialist = async ({ id }) => {
      try {
         await deleteSpecialistService(id)

         getAllSpecialists('')
         return notify('success', ' Успешно удалено')
      } catch (error) {
         return notify('error', 'Произошла ошибка при загрузке')
      }
   }

   const postSpecialistIsActive = async ({ id, isActive }) => {
      try {
         await postSpecialistIsActiveReq(id, isActive)
         return getAllSpecialists('')
      } catch (error) {
         return notify('error', 'Что-то пошло не так')
      }
   }

   useEffect(() => {
      getAllSpecialists(queryParams)
   }, [queryParams])

   const changeHandler = (id, isActive) => {
      postSpecialistIsActive({ id, isActive })
   }

   const deleteHandler = (id) => {
      deleteSpecialist({ id })
   }
   const updateHandler = (id) => {
      navigate(`${id}`)
   }

   const handleClick = () => {
      const resultFromBackend = true
      setIsButtonDisabled(resultFromBackend)
   }

   const debouncedSearchTerm = useDebounce(searchTerm, 500)
   const searchCharacters = (word) => {
      setQueryParams((prev) => {
         return {
            ...prev,
            keyWord: word,
         }
      })
   }
   useEffect(() => {
      if (debouncedSearchTerm.length !== 0) {
         searchCharacters(debouncedSearchTerm)
      } else {
         getAllSpecialists(queryParams)
      }
   }, [debouncedSearchTerm])

   // const changeHandlerPage = (newPage) => {
   //    setPage(newPage)
   // }
   // const changeHandlerSize = (event) => {
   //    setSize(event.target.value)
   //    setPage(0)
   // }

   const column = useMemo(
      () => [
         {
            header: '№',
            key: 'id',
            index: true,
         },
         {
            header: 'Статус',
            key: 'statue',
            render: (item) => (
               <TableRow>
                  <Grid>
                     <SwitchApp
                        checked={item.isActive}
                        onChange={() => changeHandler(item.id, !item.isActive)}
                        // disabled={isButtonDisabled}
                        onClick={handleClick}
                     />
                  </Grid>
               </TableRow>
            ),
         },
         {
            header: 'Специалист',
            key: 'specialist',
            render: (specialist) => {
               return (
                  <TableRow
                     style={{
                        color: specialist.isActive ? '' : '#C9C9C9',
                     }}
                  >
                     <Grid sx={{ display: 'flex' }}>
                        <Img src={specialist.image} alt="img" />
                        <ContainerNamesStyled>
                           <FirstNameStyled>
                              {specialist.firstName}
                           </FirstNameStyled>
                           <LastNameStyled>
                              {specialist.lastName}
                           </LastNameStyled>
                        </ContainerNamesStyled>
                     </Grid>
                  </TableRow>
               )
            },
         },
         {
            header: 'Отделение',
            key: 'name',
            render: (el) => (
               <TableRow>
                  <StyledDepatment>{el.departmentName}</StyledDepatment>
               </TableRow>
            ),
         },
         {
            header: 'Расписение до',
            key: 'dataOfFinish',
            render: (item) => {
               const dateString = item.dataOfFinish
               const date = new Date(dateString)
               const formattedDate = `${date.getDate()} ${date.toLocaleString(
                  'ru-RU',
                  { month: 'long' }
               )} ${date.getFullYear()}`

               if (dateString < 1) {
                  return null
               }

               return formattedDate
            },
         },

         {
            header: 'Действия',
            key: 'action',
            render: (item) => (
               <TableRow>
                  <Grid
                     style={{
                        display: 'flex',
                     }}
                  >
                     <IconButton disabled={!item.isActive}>
                        <UpdateIcon onClick={() => updateHandler(item.id)} />
                     </IconButton>
                     <IconButton disabled={item.isActive}>
                        <TrashIcon onClick={() => deleteHandler(item.id)} />
                     </IconButton>
                  </Grid>
               </TableRow>
            ),
         },
      ],
      []
   )

   return (
      <MainContainer>
         <BoxTitleAndButton>
            <Title>Специалисты</Title>
            <StyledContainerButton
               onClick={() => {
                  navigate('addSpecialist')
               }}
            >
               <Plus /> <p>Добавить специалиста</p>
            </StyledContainerButton>
         </BoxTitleAndButton>
         <SearchInputBox>
            <SearchInput
               value={searchTerm}
               placeholder="Поиск"
               onChange={(e) => {
                  setSearchTerm(e.target.value)
               }}
            />
         </SearchInputBox>
         <useToast />
         {loading ? (
            <StyledCircularProgress />
         ) : (
            <AppTable columns={column} rows={specisalists} />
         )}
         {/* <TablePagination
            component="div"
            page={page}
            rowsPerPage={size}
            onPageChange={changeHandlerPage}
            onRowsPerPageChange={changeHandlerSize}
         /> */}
      </MainContainer>
   )
}

export default Specialists

const BoxTitleAndButton = styled('div')(() => ({
   '&': {
      display: 'flex',
      justifyContent: 'space-between',
   },
}))

const Title = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontWeight: 400,
      fontSize: '22px',
   },
}))

const SearchInputBox = styled('div')(() => ({
   '&': {
      width: '600px',
      marginBottom: '20px',
      paddingTop: '20px',

      div: {
         background: '#FFFFFF',
      },
      input: {
         background: '#FFFFFF',
      },
   },
}))

const StyledContainerButton = styled(Button)(() => ({
   '&': {
      paddingLeft: '18px',
      paddingRight: '24px',
      paddingTop: '12px',
      paddingBottom: '12px',
      display: 'flex',
      gap: '12px',
   },
}))

const FirstNameStyled = styled('h6')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontSize: '16px',
   },
}))

const LastNameStyled = styled('p')(() => ({
   '&': {
      color: '#959595',
      fontSize: '14px',
      fontFamily: 'Manrope',
   },
}))

const Img = styled('img')(() => ({
   '&': {
      width: '36px',
      height: '36px',
      borderRadius: '100px',
      marginRight: '12px',
   },
}))

const ContainerNamesStyled = styled('div')(() => ({
   '&': {
      display: 'flex',
      flexDirection: 'column',
   },
}))

const StyledCircularProgress = styled(CircularProgress)`
   color: green;
   display: flex;
   margin: auto;
`
const StyledDepatment = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
   },
}))
