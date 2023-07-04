import { Grid, IconButton, Menu } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
// import { useDebounce } from 'use-debounce'
import GeoPoint from '../../../assets/icons/GeoPoint.svg'
import Timer from '../../../assets/icons/Timer.svg'
import { ReactComponent as ProfileIcon } from '../../../assets/icons/ProfileIcon.svg'
import { ReactComponent as InstagramIcon } from '../../../assets/icons/InstagramIcon.svg'
import { ReactComponent as TelegramIcon } from '../../../assets/icons/TelegramIcon.svg'
import { ReactComponent as WhatsappIcon } from '../../../assets/icons/WhatsappIcon.svg'
import { ReactComponent as TelephoneIcon } from '../../../assets/icons/PhoneIcon.svg'
import MainIcon from '../../../assets/icons/MainIcon.svg'
import MedcheckIcon from '../../../assets/icons/MedCheckIcon.svg'
import {
   HeaderStyled,
   AddressTitle,
   Box,
   ContactsBox,
   Container,
   ContainedButtonStyled,
   GeoIconStyled,
   IconBox,
   InfoBox,
   Line,
   TimeIconStyled,
   OutlinedButtonStyled,
   PhoneBox,
   TimeTitle,
   SecondBox,
   NumberTitle1,
   NumberTitle2,
   MainIconStyled,
   MedcheckIconStyled,
   StyledHeaderGlobalContainer,
   StyledPhoneIconButton,
   ProfileButtonStyled,
   ProfileBox,
   MenuItemStyled,
   NavlinkStyle,
   NavlinkStyled,
   SearchInputBox,
} from './header-styled'
import Dropdown from '../../../components/UI/Dropdown'
import SignIn from '../../guest/login/SignIn'
import {
   UserRoles,
   data,
   info,
   services,
} from '../../../utlis/constants/commons'
import { signOut } from '../../../redux/reducers/auth/auth.thunk'
import SignUp from '../../guest/login/SignUp'
import ForgotPassword from '../../guest/login/ForgotPassword'
import useToast from '../../../hooks/useToast'
import OnlineAppointment from '../../../components/online-appointment/OnlineAppointment'
import GlobalSearchInput from '../../../components/GlobalSearchInput'

const Header = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const role = useSelector((state) => state.auth.role)
   const { notify } = useToast()
   const [anchorEl, setAnchorEl] = useState(null)
   const [searchParams, setSearchParams] = useSearchParams()
   const { openModal } = Object.fromEntries(searchParams)
   const [search, setSearch] = useState([])

   const phoneNumber = '+996(505) 000 000'

   const handleClose = () => {
      setAnchorEl(null)
   }

   const onCloseModal = () => setSearchParams({})

   const openSignInModal = () => {
      setSearchParams({ openModal: 'sign-in' })
      handleClose()
   }
   const openSignUpModal = () => {
      setSearchParams({ openModal: 'sign-up' })
      handleClose()
   }
   const openForgotModal = () =>
      setSearchParams({ openModal: 'forgot-password' })()
   // const openResetModal = () => setSearchParams({ openModal: 'reset-password' })

   const openOnlineAppointment = () => {
      if (role === UserRoles.PATIENT) {
         setSearchParams({ openModal: 'online-appointment' })
      } else {
         openSignInModal()
      }
   }

   const open = Boolean(anchorEl)
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const navigateResultHandler = () => {
      navigate('/getResults')
   }

   const signOutHandler = () => {
      dispatch(signOut(notify))
      handleClose()
   }

   useEffect(() => {
      setSearch(search)
   }, [search])

   return (
      <HeaderStyled position="static">
         <StyledHeaderGlobalContainer>
            <Container>
               <SignIn
                  open={openModal === 'sign-in'}
                  onClose={onCloseModal}
                  openSignUpHandler={openSignUpModal}
                  openForgotPassword={openForgotModal}
               />
               <SignUp
                  open={openModal === 'sign-up'}
                  onClose={onCloseModal}
                  openSignInHandler={openSignInModal}
               />
               <ForgotPassword
                  open={openModal === 'forgot-password'}
                  onClose={onCloseModal}
               />
               <OnlineAppointment
                  open={openModal === 'online-appointment'}
                  onClose={onCloseModal}
               />
               <Grid>
                  <Box>
                     <GeoIconStyled src={GeoPoint} alt="geopoint" />
                     <AddressTitle>
                        <span>106452, г. Бишкек, Гражданская 119</span>
                     </AddressTitle>
                  </Box>
                  <Box>
                     <TimeIconStyled src={Timer} alt="timer" />
                     <TimeTitle style={{ color: 'black' }}>
                        <span>пн-сб </span>
                        08:00 до 18:00
                     </TimeTitle>
                  </Box>
               </Grid>
               <SearchInputBox>
                  <GlobalSearchInput openModal={openSignInModal} />
               </SearchInputBox>

               <ContactsBox>
                  <IconBox>
                     <IconButton>
                        <NavLink to="https://www.instagram.com/medcheck.kg/">
                           <InstagramIcon />
                        </NavLink>
                     </IconButton>
                     <IconButton>
                        <NavLink to="https://web.telegram.org/z/">
                           <TelegramIcon />
                        </NavLink>
                     </IconButton>
                     <IconButton>
                        <NavLink to="https://www.whatsapp.com/?lang=ru">
                           <WhatsappIcon />
                        </NavLink>
                     </IconButton>
                  </IconBox>
                  <PhoneBox>
                     <StyledPhoneIconButton>
                        <a href={`tel:${phoneNumber}`}>
                           <TelephoneIcon />
                        </a>
                     </StyledPhoneIconButton>
                     <Grid>
                        <NumberTitle1>
                           <span>+996(800) 000 000</span>
                        </NumberTitle1>
                        <NumberTitle2>
                           <span>+996(505) 000 000</span>
                        </NumberTitle2>
                     </Grid>
                     <ProfileBox>
                        <ProfileButtonStyled
                           id="basic-button"
                           aria-controls={open ? 'basic-menu' : undefined}
                           aria-haspopup="true"
                           aria-expanded={open ? 'true' : undefined}
                           onClick={handleClick}
                        >
                           <ProfileIcon />
                        </ProfileButtonStyled>
                        <Menu
                           id="basic-menu"
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleClose}
                           MenuListProps={{
                              'aria-labelledby': 'basic-button',
                           }}
                        >
                           {role === UserRoles.GUEST ? (
                              <Grid>
                                 <MenuItemStyled onClick={openSignInModal}>
                                    Войти
                                 </MenuItemStyled>
                                 <MenuItemStyled onClick={openSignUpModal}>
                                    Регистрация
                                 </MenuItemStyled>
                              </Grid>
                           ) : (
                              <Grid>
                                 <NavlinkStyle to="/myApplications">
                                    <MenuItemStyled onClick={handleClose}>
                                       Мои записи
                                    </MenuItemStyled>
                                 </NavlinkStyle>
                                 <NavlinkStyle to="/personal-data">
                                    <MenuItemStyled onClick={handleClose}>
                                       Профиль
                                    </MenuItemStyled>
                                 </NavlinkStyle>
                                 <NavlinkStyle to="/">
                                    <MenuItemStyled onClick={signOutHandler}>
                                       Выйти
                                    </MenuItemStyled>
                                 </NavlinkStyle>
                              </Grid>
                           )}
                        </Menu>
                     </ProfileBox>
                  </PhoneBox>
               </ContactsBox>
            </Container>

            <Line />

            <SecondBox>
               <Grid>
                  <NavlinkStyled to="/">
                     <MainIconStyled src={MainIcon} alt="mainIcon" />
                     <MedcheckIconStyled
                        src={MedcheckIcon}
                        alt="MedcheckIcon"
                     />
                  </NavlinkStyled>
               </Grid>
               <InfoBox>
                  <NavlinkStyled to="about">О клинике</NavlinkStyled>
                  <NavlinkStyled to="service">
                     <Dropdown services={services} data={data} info={info}>
                        Услуги
                     </Dropdown>
                  </NavlinkStyled>
                  <NavlinkStyled to="doctors">Врачи</NavlinkStyled>
                  <NavlinkStyled to="price">Прайс</NavlinkStyled>
                  <NavlinkStyled to="contacts">Контакты</NavlinkStyled>
               </InfoBox>
               <Grid>
                  <OutlinedButtonStyled
                     variant="outlined"
                     onClick={navigateResultHandler}
                  >
                     получить результаты
                  </OutlinedButtonStyled>
                  <ContainedButtonStyled
                     variant="contained"
                     onClick={openOnlineAppointment}
                  >
                     запись онлайн
                  </ContainedButtonStyled>
               </Grid>
            </SecondBox>
         </StyledHeaderGlobalContainer>
      </HeaderStyled>
   )
}

export default Header
