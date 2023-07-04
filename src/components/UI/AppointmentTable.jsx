import {
   Paper,
   Grid,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppointmentTable = ({ appointmentData, getStatusTitleChangeHandler }) => {
   const navigate = useNavigate()
   return (
      <Grid>
         <PaperStyled>
            <Table aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCellHeaderStyled>
                        Выбор специалиста
                     </TableCellHeaderStyled>
                     <TableCellHeaderStyled>Дата и время</TableCellHeaderStyled>
                     <TableCellHeaderStyled>Статус</TableCellHeaderStyled>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {appointmentData.map((patient) => (
                     <TableRow key={patient.id}>
                        <TableCell
                           component="th"
                           onClick={() => {
                              navigate(`${patient.appointmentId}/details`)
                           }}
                        >
                           <Box>
                              <IconStyled
                                 src={patient.doctorImage}
                                 alt="patientImage"
                              />

                              <TitleBox>
                                 <ChangeSpecialistTitleStyled>
                                    {patient.doctorFullName}

                                    <a href={patient.webUrl}>
                                       {patient.webTitle}
                                    </a>
                                 </ChangeSpecialistTitleStyled>
                                 <ServiceSelectionTitleStyled>
                                    {patient.doctorPosition}
                                 </ServiceSelectionTitleStyled>
                              </TitleBox>
                           </Box>
                        </TableCell>
                        <TableCell>
                           <DateAndTimeBox>
                              <DateTitleStyled>{patient.date}</DateTitleStyled>
                              <TimeTitleStyled> {patient.time}</TimeTitleStyled>
                           </DateAndTimeBox>
                        </TableCell>
                        <StatusTitleleStyled
                           statusTitle={patient.status}
                           statusColor={patient.status}
                        >
                           {getStatusTitleChangeHandler(patient.status)}
                           {/* {patient.status} */}
                        </StatusTitleleStyled>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </PaperStyled>
      </Grid>
   )
}

export default AppointmentTable

const getStatusColorChangeHandler = (statusColor) => {
   if (statusColor === 'CANCELED') {
      return '#F91515'
   }
   if (statusColor === 'CONFIRMED') {
      return '#346EFB'
   }
   if (statusColor === 'COMPLETED') {
      return '#07AB53'
   }
   return null
}
const StatusTitleleStyled = styled(TableCell, {
   shouldForwardProp: (propName) =>
      propName !== 'statusColor' && propName !== 'statusTitle',
})(({ statusColor }) => ({
   '&': {
      color: getStatusColorChangeHandler(statusColor),
      fontFamily: 'Manrope',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '22px',
   },
}))
const PaperStyled = styled(Paper)(() => ({
   '&': {
      fontFamily: 'Manrope',
      width: '600px',
      boxShadow: 'none',
   },
}))

const IconStyled = styled('img')(() => ({
   '&': {
      width: '40px',
      height: '40px',
      borderRadius: '30px',
   },
}))

const Box = styled('div')(() => ({
   '&': {
      fontFamily: 'Manrope',
      display: 'flex',
      alignItems: 'center',
   },
}))
const ServiceSelectionTitleStyled = styled('span')(() => ({
   '&': {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '19px',
      color: '#959595',
   },
}))
const ChangeSpecialistTitleStyled = styled('span')(() => ({
   '&': {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '22px',
      color: '#222222',
   },
}))
const TitleBox = styled('span')(() => ({
   '&': {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '10px',
   },
}))
const DateAndTimeBox = styled('span')(() => ({
   '&': {
      fontWeight: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      fontSize: '16px',
      lineHeight: '22px',
   },
}))

const DateTitleStyled = styled('span')(() => ({
   '&': {
      color: '#222222',
   },
}))
const TimeTitleStyled = styled('span')(() => ({
   '&': {
      color: '#4d4e51',
   },
}))
const TableCellHeaderStyled = styled(TableCell)(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '19px',
   },
}))
