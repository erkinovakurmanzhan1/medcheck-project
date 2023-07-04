import React from 'react'
import styled from '@emotion/styled'
import { styled as styledMui } from '@mui/material/styles'

import { NavLink } from 'react-router-dom'
import signature from '../../assets/images/image 12.png'
import { ReactComponent as Rectange } from '../../assets/images/Subtract.svg'
import doctorImg from '../../assets/images/mainDoctor.jpg'
import AboutClinicPart from '../../components/AboutClinicPart'
import { Hr } from './Service'

const AboutClinic = () => {
   window.scrollTo({ top: 0 })

   return (
      <>
         <Hr />
         <Container>
            <NavigatePathTitle>
               <p>
                  <NavLinkStyle to="/">Главная {' > '}</NavLinkStyle>
                  <span>О клинике</span>{' '}
               </p>
            </NavigatePathTitle>
            <StyledTitleText>
               Здоровье — самое
               <span style={{ color: '#048741' }}> ценное в жизни</span>
            </StyledTitleText>
            <StyledMainBlock>
               <StyledAboutText>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna
                     aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                     ullamco laboris nisi ut aliquip ex ea commodo consequat.
                     Duis aute irure dolor in reprehenderit in voluptate velit
                     esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                     occaecat cupidatat non proident, sunt in culpa qui officia
                     deserunt mollit anim id est laborum
                  </p>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna
                     aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                     ullamco laboris nisi ut aliquip ex ea commodo consequat.
                     Duis aute irure dolor in reprehenderit in voluptate velit
                     esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                     occaecat cupidatat non proident, sunt in culpa qui officia
                     deserunt mollit anim id est laborum
                  </p>
                  <StyledSignatureImG>
                     <img src={signature} alt="main doctor" />
                  </StyledSignatureImG>
               </StyledAboutText>
               <StyledImageBlock>
                  <Rectange />
                  <StyledDoctorImG src={doctorImg} alt="" />
                  <h3>Руководитель клиники Medical Clinic</h3>
                  <h2> Анна Михайлова </h2>
               </StyledImageBlock>
            </StyledMainBlock>
         </Container>

         <AboutClinicPart />
      </>
   )
}

export default AboutClinic

const NavigatePathTitle = styledMui('div')(() => ({
   fontFamily: 'Manrope',
   fontSize: '14px',
   fontWeight: 400,
   padding: '26px 0',

   span: {
      color: '#048741',
   },
}))

const NavLinkStyle = styledMui(NavLink)(() => ({
   textDecoration: 'none',
   color: '#959595',
}))
const StyledAboutText = styled.div`
   width: 58%;
   height: 156px;

   p {
      font-size: 1rem;
      font-weight: 400;
      line-height: 26px;
      font-family: 'Manrope';
      color: #4d4e51;
   }

   & svg {
      margin-left: 90%;
   }
`

const StyledMainBlock = styled.div`
   display: flex;
   flex-direction: row;
`
const StyledImageBlock = styled.div`
   display: flex;
   flex-direction: column;
   text-align: center;
   margin-left: 140px;

   & svg {
      margin-top: 25px;
   }

   h3 {
      font-size: 1.13rem;
      font-family: 'Manrope';
      font-weight: 400;
      line-height: 25px;
      color: #048741;
      margin-top: 20px;
      margin-left: -140px;
   }

   h2 {
      font-size: 1.4rem;
      font-family: 'Manrope';
      font-weight: 400;
      line-height: 30px;
      color: #222222;
      margin-left: -140px;
      margin-top: 5px;
   }
`
const Container = styled.div`
   margin-left: 90px;
   margin-top: 26px;
   margin-bottom: 120px;
`
const StyledTitleText = styled.h1`
   font-size: 2.25rem;
   font-weight: 600;
   line-height: 49.18px;
   font-family: Manrope;
   margin-bottom: 20px;
`
const StyledDoctorImG = styled('img')(() => ({
   width: '59%',
   height: '438px',
   marginTop: '-415px ',
   marginLeft: '40px ',
}))

const StyledSignatureImG = styled('div')(() => ({
   display: ' flex',
   justifyContent: 'end',

   img: {
      marginTop: '20px ',
   },
}))

// const StyledButton = styled(Button)(() => ({
//   color: '#029847;',
//   border: '1px solid #029847;',
//   marginTop: '26px ',

//   ':hover': {
//      border: '2px solid #029847;',
//   },
// }))
