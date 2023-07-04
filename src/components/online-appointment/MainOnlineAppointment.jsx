/* eslint-disable no-unneeded-ternary */
import React from 'react'
import { styled } from '@mui/material'
import { ReactComponent as ChooseServiceIcon } from '../../assets/online-appoinment-icons/chooseService.svg'
import { ReactComponent as ChooseSpecialistIcon } from '../../assets/online-appoinment-icons/chooseSpecialist.svg'
import { ReactComponent as ChooseDateIcon } from '../../assets/online-appoinment-icons/chooseDate.svg'
import { SelectUi } from '../UI/SelectUi'
import Button from '../UI/Button'
import { MED_SERVICE } from '../../utlis/services/img_service'

const MainOnlineAppointment = ({
   openChooseSpecialist,
   openDate,
   openForm,
   service,
   specialist,
   date,
   serviceChangeHandler,
}) => {
   return (
      <Wrapper>
         <Select
            icon={<ChooseServiceIcon />}
            value={service}
            onChange={serviceChangeHandler}
            placeholder="Выбрать услуги"
            items={MED_SERVICE}
            sx={{
               boxShadow: 'none',
               '.MuiOutlinedInput-notchedOutline': { border: 0 },
               '.css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper': {
                  top: 135,
               },
            }}
         />
         <ChooseCard onClick={openChooseSpecialist}>
            {specialist ? (
               <ImageContainer>
                  <Image src={specialist.image} alt="" />
               </ImageContainer>
            ) : (
               <SpecialistIcon />
            )}

            <p>{specialist ? specialist.fullName : 'Выбрать специалиста'}</p>
         </ChooseCard>
         <ChooseCard onClick={openDate}>
            <DateIcon />
            <div>
               <Date>
                  {date && `${date.dayOfAWeek}, ${date.day} ${date.month}`}
               </Date>
               <Time>{date ? `${date.time}` : 'Выбрать дату и время'}</Time>
            </div>
         </ChooseCard>
         <StyledButton onClick={openForm}>Продолжить</StyledButton>
      </Wrapper>
   )
}

export default MainOnlineAppointment

const Wrapper = styled('div')(() => ({
   padding: '0 6px',
}))

const Select = styled(SelectUi)(() => ({
   padding: '10px 0',
   paddingLeft: '50px',
   margin: '6px 0',
   border: '1px solid #fff',
   outline: '1px solid #fff',
   borderRadius: '16px',
   background: '#ffffff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   'select:focus': {
      outline: 'none',
   },
   '&:hover': {
      '&& fieldset': {
         border: '1px solid #fff',
         outline: 'none',
      },
   },
   '&:active': {
      '&& fieldset': {
         border: '1px solid #fff',
         outline: 'none',
      },
   },
   '&:disabled': {
      '&& fieldset': {
         border: '1px solid #fff',
         outline: 'none',
      },
   },
}))

const ChooseCard = styled('div')(() => ({
   marginBottom: '6px',
   padding: '19px 16px',
   background: '#fff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   borderRadius: '16px',
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   fontFamily: 'Manrope',
}))

const SpecialistIcon = styled(ChooseSpecialistIcon)(() => ({
   marginRight: '12px',
}))
const DateIcon = styled(ChooseDateIcon)(() => ({
   marginRight: '12px',
}))

const ImageContainer = styled('div')(() => ({
   width: '36px',
   height: '36px',
   marginRight: '12px',
}))

const Image = styled('img')(() => ({
   width: '100%',
   height: '100%',
   borderRadius: '50%',
}))

const StyledButton = styled(Button)(() => ({
   marginTop: '24px',
   width: '100%',
}))

const Date = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: '500',
   fontSize: '12px',
   lineHeight: '16px',
   color: '#707070',
}))

const Time = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: '500',
   fontSize: '16px',
   lineHeight: '19px',
}))
