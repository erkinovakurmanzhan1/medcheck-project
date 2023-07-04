import { Stack } from '@mui/system'
import styled from '@emotion/styled'
import React from 'react'
import { Container, StyledNavLink } from '../admin/specialist-style'
import { Hr } from './Service'

const Contacts = () => {
   window.scrollTo({ top: 0 })

   return (
      <div>
         <Hr />
         <Wrapper>
            <Stack spacing={2}>
               <Container separator="›" aria-label="breadcrumb">
                  <StyledNavLink to="/admin/specialists">
                     <p>Специалисты</p>
                  </StyledNavLink>
                  <p>Контакты</p>
               </Container>
            </Stack>
            <Titl>
               Наши <span style={{ color: '#048741' }}>контакты</span>
            </Titl>
            <Title>
               Комфорт и спокойствие пациента — это часть качественного лечения!
               Предупредите администратора, что вы едете к нам на машине и мы
               предложим бесплатную подземную парковку при нашей клинике.
            </Title>
            <ContainerInfo>
               <ContactInfo>Контактные номера:</ContactInfo>
               <ContactInfoP>
                  +996(800) 000 000 ; +996(505) 000 000{' '}
               </ContactInfoP>
            </ContainerInfo>
            <ContainerInfo>
               <ContactInfo>Наш адрес:</ContactInfo>
               <ContactInfoP>
                  Кыргызстан, г. Бишкек, Гражданская 119
               </ContactInfoP>
            </ContainerInfo>
            <ContainerInfo>
               <ContactInfo>Режим работы клиники:</ContactInfo>
               <ContactInfoP>
                  Понедельник - суббота с 08:00 до 18:00.
               </ContactInfoP>
            </ContainerInfo>
            <ContainerInfo>
               <ContactInfo>Электронная почта :</ContactInfo>
               <ContactInfoP> medchek.kg</ContactInfoP>
            </ContainerInfo>
         </Wrapper>
         <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.8663069501154!2d74.62509847469657!3d42.8756659023736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7bb28a68e35%3A0x7b32540e6affd011!2zMTE5INGD0LsuINCT0YDQsNC20LTQsNC90YHQutCw0Y8sINCR0LjRiNC60LXQug!5e0!3m2!1sru!2skg!4v1687678938749!5m2!1sru!2skg"
            width="100%"
            height="400"
            style={{ border: 0, marginBottom: '-123px' }}
            allowfullscreen=""
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
            title="map"
         />
      </div>
   )
}

export default Contacts

const Wrapper = styled('div')(() => ({
   '&': {
      paddingLeft: '100px',
      paddingBottom: '120px',
   },
}))

const Titl = styled('h2')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: '49px',
      color: '#222222',
   },
}))

const Title = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '18px',
      color: '#4D4E51',
      width: '681px',
      paddingTop: '34px',
      paddingBottom: '40px',
   },
}))

const ContactInfo = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '18px',
      color: '#222222',
   },
}))

const ContactInfoP = styled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '18px',
      color: '#048741',
   },
}))

const ContainerInfo = styled('div')(() => ({
   '&': {
      paddingTop: '20px',
   },
}))
