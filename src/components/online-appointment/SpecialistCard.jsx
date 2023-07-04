import React from 'react'
import { styled } from '@mui/material'
import { ReactComponent as Rating } from '../../assets/online-appoinment-icons/star.svg'
import { DAYS_OF_A_WEEK, months } from '../../utlis/constants/commons'
// import { ReactComponent as ProfileImg } from '../.
// ./assets/online-appoinment-icons/specialistImg.svg'

const SpecialistCard = ({
   id,
   fullName,
   image,
   position,
   localDateTimes,
   chooseSpecialist,
   dateChangeHandler,
}) => {
   const chooseDateHandler = (time) => {
      const { date } = localDateTimes[0]
      const data = new Date(date)

      const day = data.getDate()
      const month = months[data.getMonth()]
      const dayOfAWeek = DAYS_OF_A_WEEK[data.getDay()]

      const obj = { day, month, dayOfAWeek, time }
      return obj
   }

   const getDate = (date, months) => {
      let result = ''
      let numberMonth = ''
      let strigMonth = ''
      let day = ''
      if (date.charAt(5) === '0') {
         numberMonth = date.charAt(6)
      } else {
         numberMonth = date.charAt(5) + date.charAt(6)
      }
      strigMonth = months[numberMonth - 1]

      if (date.charAt(date.length - 2) === '0') {
         day = date.charAt(date.length - 1)
      } else {
         day = date.charAt(date.length - 2) + date.charAt(date.length - 1)
      }

      // eslint-disable-next-line prefer-template
      result = day + ' ' + strigMonth
      return result
   }

   const submitDate = (image, fullName, id, time) => {
      chooseSpecialist({ image, fullName, id })
      const obj = chooseDateHandler(time)
      dateChangeHandler(obj)
   }

   return (
      <Card>
         <Profile onClick={() => chooseSpecialist({ image, fullName, id })}>
            <ImageContainer>
               <Image src={image} alt="" />
            </ImageContainer>
            <About>
               <Title>{fullName}</Title>
               <Specialist>{position}</Specialist>
               <RatingContainer>
                  <Rating />
                  <Users>166</Users>
               </RatingContainer>
            </About>
         </Profile>
         <Subtitle>
            {localDateTimes[0]
               ? `Ближайшее время для записи ${getDate(
                    localDateTimes[0].date,
                    months
                 )}
            :`
               : 'Нету записей!'}
         </Subtitle>
         <TimeContainer>
            {localDateTimes.map((time) => (
               <Time
                  key={time.id}
                  onClick={() => submitDate(image, fullName, id, time.timeFrom)}
               >
                  {time.timeFrom}
               </Time>
            ))}
         </TimeContainer>
      </Card>
   )
}

export default SpecialistCard

const Card = styled('div')(() => ({
   margin: '6px',
   padding: '19px 16px',
   background: '#fff',
   color: '#222222',
   fontSize: '16px',
   fontWeight: '500',
   borderRadius: '16px',
   display: 'flex',
   flexDirection: 'column',
   cursor: 'pointer',
   border: '1px solid #D9D9D9',
}))

const Profile = styled('div')(() => ({
   display: 'flex',
}))

const ImageContainer = styled('div')(() => ({
   width: '36px',
   height: '36px',
}))

const Image = styled('img')(() => ({
   width: '100%',
   height: '100%',
   borderRadius: '50%',
}))
const About = styled('div')(() => ({
   marginLeft: '10px',
}))

const Title = styled('h4')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '14px',
   lineHeight: '19px',
}))

const Specialist = styled('p')(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#959595',
   marginBottom: '3px',
}))

const RatingContainer = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const Users = styled('span')(() => ({
   marginLeft: '8px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#707070',
}))

const Subtitle = styled('p')(() => ({
   marginTop: '12px',
   marginBottom: '10px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   color: '#4D4E51',
}))

const Time = styled('div')(() => ({
   width: '98px',
   marginBottom: '6px',
   marginRight: '6px',
   padding: '8px 0',
   border: '1px solid #D9D9D9',
   borderRadius: '16px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '12px',
   lineHeight: '16px',
   color: '#4D4E51',
   display: 'flex',
   justifyContent: 'center',
}))

const TimeContainer = styled('div')(() => ({
   maxWidth: '324px',
   display: 'flex',
   flexWrap: 'wrap',
}))
