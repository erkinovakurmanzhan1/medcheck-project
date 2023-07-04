import {
   Breadcrumbs,
   InputLabel,
   TextField,
   TextareaAutosize,
} from '@mui/material'
import styled from '@emotion/styled'
import { styled as muiStyled } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'
// import Input from '../../components/UI/input/Input'

export const MainContainer = muiStyled('div')(() => ({
   '&': {
      width: '100%',
      height: '100%',
      background: 'rgba(245, 245, 245, 0.61)',
      padding: '30px 70px',
      fontFamily: 'Manrope',
   },
}))
export const Container = muiStyled(Breadcrumbs)({
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '19px',
   marginTop: '30px',
   marginBottom: '26px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   '& .css-1bifq5f-MuiTypography-root-MuiBreadcrumbs-root': {
      fontFamily: 'Manrope',
   },
   ':last-child': {
      color: '#048741',
   },
})

export const StyledNavLink = muiStyled(NavLink)({
   textDecoration: 'none',
   color: ' #959595',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
})

export const AddContainer = muiStyled('div')(() => ({
   '&': {
      background: '#FFFFFF',
      borderRadius: '6px',
      height: '100%',
   },
}))

export const InputStyled = styled(TextField)(() => ({
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         border: '1px solid #909CB5',
      },
      '&:hover fieldset': {
         borderColor: '#909CB5',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#909CB5',
      },
      input: {
         fontFamily: 'Manrope',
         fontWeight: 400,
         color: '#222222',
      },
   },
   input: {
      paddingLeft: '10px',
      height: '24px',
      width: '372px',
      fontSize: '14px',
      padding: '5px',
   },
}))

export const StyledTextField = styled(TextareaAutosize)((styles) => ({
   '&': {
      width: '100%',
      color: '#959595',
      fontSize: '16px',
      paddingLeft: '20px',
      paddingTop: '16px',
      border: '1px solid white',
      fontWeight: styles.bold ? 700 : 400,
      fontStyle: styles.italic ? 'italic' : '',
      textDecoration: styles.underline ? 'underline' : '',
      listStyle: 'square',
      '& .ccs-btngv5': {
         outline: 'none',
      },
   },
}))

export const Wrapper = styled('div')(() => ({
   '&': {
      paddingTop: '40px',
      display: 'flex',
      marginRight: '43px',
   },
}))
export const TitlePhoto = muiStyled('p')(() => ({
   '&': {
      fontFamily: 'Manrope',
      color: '#909CB5',
      textAlign: 'center',
      fontSize: '12px',
      paddingLeft: '1rem',
   },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
   color: '#464444',
   fontWeight: 400,
   fontSize: '14px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
}))
