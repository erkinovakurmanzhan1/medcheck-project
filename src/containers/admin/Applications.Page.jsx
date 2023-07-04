import React, { useEffect, useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Grid, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import SearchInput from '../../components/UI/SeacrchInput'
import AppTable from '../../components/UI/Table'
import CheckboxApp from '../../components/UI/checkbox/Checkbox'
import { ReactComponent as TrashIcon } from '../../assets/icons/TrashTable.svg'
import {
   deleteAllChecked,
   deleteChecked,
} from '../../redux/reducers/applications/applications.thunk'
import { getApplicatonRequest } from '../../api/applicationsService'
import Button from '../../components/UI/Button'
import BasicModal from '../../components/UI/ModalUi'
import useToast from '../../hooks/useToast'
import Spiner from '../../components/UI/Spiner'

const ApplicationsPage = () => {
   const { notify } = useToast()
   const dispatch = useDispatch()

   const { application } = useSelector((state) => state.application)
   const [patients, setPatients] = useState([])
   const [check, setCheck] = useState(false)
   const [inputVal, setInputVal] = useState('')
   const [debouncedQuery] = useDebounce(inputVal, 400)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [confirmationPatient, setConfirmationPatient] = useState({})
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      setPatients(application)
   }, [application])

   useEffect(() => {
      const getData = async () => {
         try {
            if (debouncedQuery) {
               setIsLoading(true)
               const { data } = await getApplicatonRequest(debouncedQuery)
               setPatients(data)
               setIsLoading(false)
            } else {
               setIsLoading(true)
               const { data } = await getApplicatonRequest()
               setPatients(data)
               setIsLoading(false)
            }
         } catch (error) {
            notify('error', 'Ошибка')
         }
      }

      getData()
   }, [debouncedQuery])

   const searchChangeHandler = (event) => {
      setInputVal(event.target.value)
   }

   const checkBoxChangeHandler = ({ target: { id, checked } }) => {
      if (id === 'allSelect') {
         const tempPatient = patients.map((patient) => ({
            ...patient,
            isChecked: checked,
         }))
         setCheck(checked)
         setPatients(tempPatient)
      } else {
         const tempPatient = patients.map((patient) =>
            patient.id.toString() === id
               ? { ...patient, isChecked: checked }
               : patient
         )
         setConfirmationPatient([id])
         setPatients(tempPatient)

         const isTempPatientChecked = tempPatient.some(
            (patient) => patient.isChecked === true
         )

         setCheck(isTempPatientChecked)
      }
   }

   const checkedAllDeleteHandler = () => {
      const checkedIds = patients.reduce((patientId, patient) => {
         if (patient.isChecked) {
            patientId.push(parseInt(patient.id, 10))
         }
         return patientId
      }, [])
      const nullablePatients = patients.map((patient) => ({
         ...patient,
         isChecked: false,
      }))

      setPatients(nullablePatients)
      setCheck(false)
      dispatch(deleteAllChecked(checkedIds))
      setIsModalOpen(false)
   }

   const checkedProcessedHandler = (id) => {
      const checkPatient = patients.map((item) =>
         item.id === id
            ? {
                 ...item,
                 processedChecked: !item.processedChecked || false,
              }
            : item
      )
      setPatients(checkPatient)
   }

   const openModal = (patient) => {
      if (!patient.processedChecked) {
         notify('error', 'Вы не можете удалить необработанного пациента!')
      } else {
         setConfirmationPatient(patient)
         setIsModalOpen(true)
      }
   }
   const openModalAll = (patient) => {
      setConfirmationPatient(patient)
      setIsModalOpen(true)
   }
   const confirmDeleteHandler = (id) => {
      dispatch(deleteChecked(id))
      setIsModalOpen(false)
   }

   const closeModal = () => {
      setIsModalOpen(false)
   }

   const allCheckedValue =
      patients.length > 0 && patients.every((patient) => patient.isChecked)

   const column = useMemo(
      () => [
         {
            header: (
               <CheckboxApp
                  id="allSelect"
                  checked={allCheckedValue}
                  onChange={checkBoxChangeHandler}
               />
            ),
            key: 'checkbox',
            render: (patient) => (
               <Grid>
                  <CheckboxApp
                     id={patient.id.toString()}
                     checked={patient.isChecked || false}
                     onChange={checkBoxChangeHandler}
                  />
               </Grid>
            ),
         },
         {
            header: (
               <Grid>
                  {check && (
                     <IconButton onClick={openModalAll}>
                        <TrashIcon />
                     </IconButton>
                  )}
               </Grid>
            ),
            key: 'delete',
         },
         {
            header: '№',
            key: 'id',
            index: true,
         },
         {
            header: 'Имя',
            key: 'name',
         },
         {
            header: 'Дата',
            key: 'date',
         },
         {
            header: 'Номер телефона',
            key: 'phoneNumber',
         },
         {
            header: 'Обработан',
            key: 'processed',
            render: (patient) => (
               <Grid style={{ textAlign: 'start' }}>
                  <IconButton>
                     <CheckboxApp
                        checked={patient.processedChecked || false}
                        onChange={() => checkedProcessedHandler(patient.id)}
                     />
                  </IconButton>
               </Grid>
            ),
         },
         {
            header: 'Действия',
            key: 'action',
            render: (patient) => (
               <Grid style={{ textAlign: 'center' }}>
                  <IconButton onClick={() => openModal(patient)}>
                     <TrashIcon />
                  </IconButton>
               </Grid>
            ),
         },
      ],
      [patients, check]
   )

   return (
      <div>
         <MainContainer>
            <BoxTitleAndButton>
               <Title>Заявки</Title>
            </BoxTitleAndButton>
            <SearchInputBox>
               <SearchInput
                  placeholder="Поиск"
                  onChange={searchChangeHandler}
                  value={inputVal}
               />
            </SearchInputBox>
            <div>
               {isLoading ? (
                  <Spiner />
               ) : (
                  <AppTable columns={column} rows={patients} />
               )}
            </div>
            <StyleModal open={isModalOpen} onClose={closeModal}>
               <ModalBoxStyle>
                  <ModalTitleStyle>
                     {patients.filter(
                        (patient) =>
                           patient.isChecked || patient.processedChecked
                     ).length === 1 ? (
                        <>
                           Вы уверены, что хотите удалить запись{' '}
                           <span>
                              {
                                 patients.find(
                                    (patient) =>
                                       patient.isChecked ||
                                       patient.processedChecked
                                 )?.name
                              }
                              ?
                           </span>
                        </>
                     ) : (
                        'Вы уверены, что хотите удалить все записи?'
                     )}
                  </ModalTitleStyle>
                  <CancelButtonStyled onClick={closeModal}>
                     Отменить
                  </CancelButtonStyled>
                  {patients.filter((patient) => patient.processedChecked)
                     .length === 1 ? (
                     <DeleteButtonStyled
                        onClick={() =>
                           confirmDeleteHandler(confirmationPatient.id)
                        }
                     >
                        Удалить
                     </DeleteButtonStyled>
                  ) : (
                     <DeleteButtonStyled onClick={checkedAllDeleteHandler}>
                        Удалить
                     </DeleteButtonStyled>
                  )}
               </ModalBoxStyle>
            </StyleModal>
         </MainContainer>
      </div>
   )
}

export default ApplicationsPage

const StyleModal = styled(BasicModal)(() => ({
   '& .MuiBox-root': {
      borderRadius: '10px',
   },
}))
const MainContainer = styled('div')(() => ({
   '&': {
      width: '100%',
      height: '100vh',
      background: 'rgba(245, 245, 245, 0.61)',
      padding: '30px 70px',
   },
}))
const BoxTitleAndButton = styled('div')(() => ({
   '&': {
      display: 'flex',
      justifyContent: 'space-between',
   },
}))

const SearchInputBox = styled('div')(() => ({
   '&': {
      width: '600px',
      marginBottom: '20px',

      div: {
         background: '#FFFFFF',
      },
      input: {
         background: '#FFFFFF',
      },
   },
}))
const Title = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontWeight: 500,
      fontSize: '22px',
      lineHeight: '26px',
      marginBottom: '34px',
   },
}))
const ModalBoxStyle = styled('div')(() => ({
   '&': {
      textAlign: 'center',
      padding: '24px 48px',
      borderRadius: '10px',
   },
}))

const DeleteButtonStyled = styled(Button)(() => ({
   '&': {
      padding: '10px 20px',
   },
}))
const CancelButtonStyled = styled(Button)(() => ({
   '&': {
      padding: '10px 20px',
      background: 'none',
      border: '1px solid #959595',
      color: '#959595',
      marginRight: '18px',
   },

   '&:hover': {
      background: '#959595',
      border: '1px solid #ffff',
      color: '#ffff',
   },
   '&:active': {
      background: '#959595',
      border: '1px solid #ffff',
      color: '#ffff',
   },
   '&:disabled': {
      background: '#D3D3D3',
      color: '#FFFF',
   },
}))
const ModalTitleStyle = styled('p')(() => ({
   '&': {
      width: '364px',
      fontFamily: 'Manrope',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '25px',
      marginBottom: '20px',
      span: {
         color: '#22222',
         fontWeight: 700,
      },
   },
}))
