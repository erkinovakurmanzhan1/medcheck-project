import React, { useEffect, useMemo, useState } from 'react'
import { Grid, IconButton } from '@mui/material'
import styled from '@emotion/styled'
import { useDebounce } from 'use-debounce'

import AppTable from './UI/Table'
import { ReactComponent as TrashIcon } from '../assets/icons/TrashTable.svg'
import CheckboxApp from './UI/checkbox/Checkbox'
import {
   deleteAppointmentRequest,
   getAppointmentRequest,
} from '../api/appointmentService'
import BasicModal from './UI/ModalUi'
import Button from './UI/Button'
import SearchInput from './UI/SeacrchInput'
import useToast from '../hooks/useToast'
import Spiner from './UI/Spiner'

const OnlineEntry = () => {
   const { notify } = useToast()
   const [patients, setPatients] = useState([])
   const [check, setCheck] = useState(false)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [confirmationPatient, setConfirmationPatient] = useState({})
   const [inputVal, setInputVal] = useState('')
   const [debouncedQuery] = useDebounce(inputVal, 500)
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      const getData = async () => {
         try {
            if (debouncedQuery) {
               setIsLoading(true)
               const { data } = await getAppointmentRequest(inputVal)
               setPatients(data)
               setIsLoading(false)
            } else {
               setIsLoading(true)
               const { data } = await getAppointmentRequest()
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
         const tempPatient = patients.map((patient) => {
            return { ...patient, isChecked: checked }
         })
         setCheck(checked)
         setPatients(tempPatient)
      } else {
         const tempPatient = patients.map((patient) =>
            patient.appointmentId.toString() === id
               ? { ...patient, isChecked: checked }
               : patient
         )
         setPatients(tempPatient)

         const isTempPatientChecked = tempPatient.some(
            (patient) => patient.isChecked === true
         )
         setCheck(isTempPatientChecked)
      }
   }

   const checkedAllDeleteHandler = async () => {
      try {
         const checkedIds = patients.reduce((id, patient) => {
            if (patient.isChecked) {
               id.push(parseInt(patient.appointmentId, 10))
            }
            return id
         }, [])
         const nullablePatients = patients.map((patient) => ({
            ...patient,
            isChecked: false,
         }))
         setPatients(nullablePatients)
         setCheck(false)
         await deleteAppointmentRequest(checkedIds)
         setIsModalOpen(false)
         const { data } = await getAppointmentRequest()
         setPatients(data)
         notify('success', 'Успешно удалено')
      } catch (error) {
         notify('error', 'Ошибка')
      }
   }

   const checkedProcessedHandler = async (id) => {
      try {
         const checkPatient = patients.map((item) =>
            item.appointmentId === id
               ? {
                    ...item,
                    processedChecked: !item.processedChecked || false,
                 }
               : item
         )
         setPatients(checkPatient)
      } catch (error) {
         notify('error', 'Ошибка')
      }
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
   const closeModal = () => {
      setIsModalOpen(false)
   }

   const confirmDeleteHandler = async (id) => {
      try {
         await deleteAppointmentRequest([id])
         setIsModalOpen(false)
         const { data } = await getAppointmentRequest()
         setPatients(data)
         notify('success', 'Успешно удалено')
      } catch (error) {
         notify('error', 'Ошибка')
      }
   }
   const allCheckedValue =
      patients.length > 0 && patients.every((patient) => patient.isChecked)

   const column = useMemo(
      () => [
         {
            header: (
               <CheckboxApp
                  style={{ display: 'flex' }}
                  id="allSelect"
                  checked={allCheckedValue}
                  onChange={checkBoxChangeHandler}
               />
            ),
            key: 'checkbox',
            render: (patient) => (
               <Grid>
                  <CheckboxApp
                     id={patient.appointmentId.toString()}
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
            header: 'Имя и фамилия',
            key: 'fullName',
         },
         {
            header: 'Номер телефона',
            key: 'phoneNumber',
         },

         {
            header: 'Почта',
            key: 'email',
         },
         {
            header: 'Выбор услуги',
            key: 'department',
         },
         {
            header: 'Выбор специалиста',
            key: 'specialist',
         },
         {
            header: 'Дата и время',
            key: 'localDateTime',
            render: (patient) => (
               <DateAndTimeStyled style={{ textAlign: 'center' }}>
                  <DateTitleStyled>{patient.localDate}</DateTitleStyled>
                  <TimeTitleStyled>{patient.localTime}</TimeTitleStyled>
               </DateAndTimeStyled>
            ),
         },
         {
            header: 'Обработан',
            key: 'processed',
            render: (patient) => (
               <Grid style={{ textAlign: 'center' }}>
                  <IconButton>
                     <CheckboxApp
                        checked={patient.processedChecked || false}
                        onChange={() =>
                           checkedProcessedHandler(patient.appointmentId)
                        }
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
      [patients, check, allCheckedValue, checkBoxChangeHandler]
   )

   return (
      <div>
         <SearchInputBox>
            <SearchInput
               placeholder="Поиск"
               onChange={searchChangeHandler}
               value={inputVal}
            />
         </SearchInputBox>
         {isLoading ? (
            <Spiner />
         ) : (
            <AppTable rows={patients} columns={column} />
         )}
         <StyleModal open={isModalOpen} onClose={closeModal}>
            <ModalBoxStyle>
               <ModalTitleStyle>
                  {patients.filter(
                     (patient) => patient.isChecked || patient.processedChecked
                  ).length === 1 ? (
                     <>
                        Вы уверены, что хотите удалить запись{' '}
                        <span>
                           {
                              patients.find(
                                 (patient) =>
                                    patient.isChecked ||
                                    patient.processedChecked
                              )?.fullName
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
                        confirmDeleteHandler(confirmationPatient.appointmentId)
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
      </div>
   )
}

export default OnlineEntry
const DateAndTimeStyled = styled(Grid)`
   display: flex;
   flex-direction: column;
   align-items: start;
   width: 90px;
`
const TimeTitleStyled = styled('p')`
   font-family: 'Manrope';
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #4d4e51;
   margin-left: 7px;
`
const DateTitleStyled = styled('p')`
   font-family: 'Manrope';
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #222222;
`

const StyleModal = styled(BasicModal)(() => ({
   '& .MuiBox-root': {
      borderRadius: '10px',
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
