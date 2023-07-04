import { AppBar, Grid, Menu, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MainIcon from '../../assets/icons/MainIcon.svg'
import MedcheckIcon from '../../assets/icons/MedCheckIcon.svg'
import { ReactComponent as IdminHeaderBtnIcon } from '../../assets/icons/AdmiHeaderBtnIcon.svg'
import { signOut } from '../../redux/reducers/auth/auth.thunk'
import useToast from '../../hooks/useToast'
// import useToast from '../../hooks/useToast'

const Header = () => {
   const dispatch = useDispatch()
   const { notify } = useToast()

   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   const signOutHandler = () => {
      dispatch(signOut(notify))
      handleClose()
   }

   return (
      <AppBarStyled position="static">
         <Container>
            <LogoBox>
               <NavLink to="/">
                  <MainIconStyled src={MainIcon} alt="mainIcon" />
               </NavLink>
               <NavLink to="/">
                  <MedcheckIconStyled src={MedcheckIcon} alt="MedcheckIcon" />
               </NavLink>
            </LogoBox>
            <InfoBox>
               <NavLinkStyled
                  to="appointment"
                  style={({ isActive }) => ({
                     color: isActive ? 'black' : '#707070',
                     borderBottom: isActive && '2px solid #048741',
                  })}
               >
                  Онлайн-запись
               </NavLinkStyled>
               <NavLinkStyled
                  to="applications"
                  style={({ isActive }) => ({
                     color: isActive ? 'black' : '#707070',
                     borderBottom: isActive && '2px solid #048741',
                  })}
               >
                  Заявки
               </NavLinkStyled>
               <NavLinkStyled
                  to="specialists"
                  style={({ isActive }) => ({
                     color: isActive ? 'black' : '#707070',
                     borderBottom: isActive && '2px solid #048741',
                  })}
               >
                  Специалисты
               </NavLinkStyled>
               <NavLinkStyled
                  to="patients"
                  style={({ isActive }) => ({
                     color: isActive ? 'black' : '#707070',
                     borderBottom: isActive && '2px solid #048741',
                     paddingBottom: '1.9rem',
                  })}
               >
                  Пациенты
               </NavLinkStyled>
            </InfoBox>
            <div>
               <ButtonStyled
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  variant="contained"
               >
                  Администратор
                  <AdminHeaderBtnStyled />
               </ButtonStyled>
               <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                     'aria-labelledby': 'basic-button',
                  }}
               >
                  <MenuItemStyled onClick={signOutHandler}>
                     Выйти
                  </MenuItemStyled>
               </Menu>
            </div>
         </Container>
      </AppBarStyled>
   )
}

export default Header
const Container = styled(Grid)(() => ({
   '&': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
}))
const AppBarStyled = styled(AppBar)(() => ({
   '&': {
      padding: '0 70px',
      height: '80px',
      boxShadow: 'none',
   },
}))

const LogoBox = styled('div')(() => ({
   '&': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '10px',
      gap: '10px',
   },
}))
const MainIconStyled = styled('img')(() => ({
   '&': {
      width: '55.32px',
      height: '60px',
   },
}))
const MedcheckIconStyled = styled('img')(() => ({
   '&': {
      width: '112px',
      height: '22px',
   },
}))
const InfoBox = styled('div')(() => ({
   '&': {
      display: 'flex',
      gap: '46px',
      paddingTop: '30px',
   },
}))
const NavLinkStyled = styled(NavLink)(() => ({
   '&': {
      color: '#707070',
      textDecoration: 'none',
      fontFamily: 'Manrope',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '21px',
   },
   '&:active': {
      color: '#22222',
   },
}))
const ButtonStyled = styled('button')(() => ({
   '&': {
      color: '#22222',
      background: 'none',
      border: 'none',
      fontFamily: 'Manrope',
      fontWeight: 500,
      fontSize: '15px',
      lineHeight: '22px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
   },
}))
const AdminHeaderBtnStyled = styled(IdminHeaderBtnIcon)(() => ({
   '&': {
      width: '11.38px',
      height: '6.13px',
   },
}))
const MenuItemStyled = styled(MenuItem)(() => ({
   '&': {
      fontFamily: 'Manrope',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '21px',
   },
   '&:hover': {
      color: '#027B44',
   },
   '&:active': {
      color: '#027B44',
   },
}))
