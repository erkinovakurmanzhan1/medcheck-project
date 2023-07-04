import React from 'react'
import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { ReactComponent as ChooseSpecialistIcon } from '../../assets/online-appoinment-icons/chooseSpecialist.svg'
import SpecialistCard from './SpecialistCard'

const ChooseSpecialist = ({ chooseSpecialist, dateChangeHandler }) => {
   const doctors = useSelector((state) => state.appointment.doctors)
   // console.log(doctors)

   return (
      <div>
         <FreeSpecialistCard>
            <SpecialistIcon />
            <p>Любой свободный специалист</p>
         </FreeSpecialistCard>
         {doctors.map((doctor) => (
            <SpecialistCard
               key={doctor.id}
               id={doctor.id}
               fullName={doctor.fullName}
               image={doctor.image}
               position={doctor.position}
               localDateTimes={doctor.localDateTimes}
               chooseSpecialist={chooseSpecialist}
               dateChangeHandler={dateChangeHandler}
            />
         ))}
      </div>
   )
}

export default ChooseSpecialist

const FreeSpecialistCard = styled('div')(() => ({
   margin: '6px',
   padding: '19px 16px',
   background: '#fff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   borderRadius: '16px',
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   p: {
      fontFamily: 'Manrope',
   },
}))

const SpecialistIcon = styled(ChooseSpecialistIcon)(() => ({
   marginRight: '12px',
}))
