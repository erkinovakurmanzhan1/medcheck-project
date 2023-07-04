import React from 'react'
import { styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import ChangePassword from './ChangePassword'
import Path from '../../../../components/UI/Path'
import PersonalData from './PersonalData'

const ProfileLayout = () => {
   return (
      <Container>
         <Path />
         <StyledTitleText>Профиль</StyledTitleText>
         <NavlinkStyle to="/personal-data" element={<PersonalData />}>
            Личные данные
         </NavlinkStyle>
         <NavlinkStyle to="/change-password" element={<ChangePassword />}>
            Сменить пароль
         </NavlinkStyle>
      </Container>
   )
}

export default ProfileLayout

const Container = styled('div')`
   margin-top: 26px;
   margin-bottom: 40px;
`
const StyledTitleText = styled('h1')`
   font-family: 'Manrope';
   font-style: normal;
   font-weight: 400;
   font-size: 14px;

   margin-bottom: 30px;
`

const NavlinkStyle = styled(NavLink)(() => ({
   '&': {
      marginRight: '30px',
      textDecoration: 'none',
      fontFamily: 'Manrope',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: '16px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: '#959595',
   },

   '&:active': {
      color: '#048741',
      textDecoration: 'underline',
   },
   '&:focus': {
      color: '#048741',
      textDecoration: 'underline',
   },
   '&:hover': {
      color: '#048741',
      textDecoration: 'underline',
   },
}))
