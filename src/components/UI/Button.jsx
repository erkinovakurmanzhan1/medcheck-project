import { Button as ReusableButton } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'

const Button = ({ children, variant, disabled, onClick, ...rest }) => {
   return (
      <ButtonStyled
         disabled={disabled}
         variant={variant}
         onClick={onClick}
         {...rest}
      >
         {children}
      </ButtonStyled>
   )
}

export default Button

const ButtonStyled = styled(ReusableButton)(() => ({
   '&': {
      fontFamily: 'Manrope,sans-serif',
      padding: '14px 67px',
      lineHeight: '16px',
      fontSize: '12px',
      color: '#FFFFFF',
      fontWeight: '600',
      background: 'linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%);',
      borderRadius: '10px',
      letterSpacing: ' 0.03em',
   },

   '&:hover': {
      background: 'linear-gradient(180.61deg, #08DF7D 0.45%, #048F50 82.76%);',
      color: '#fff',
   },
   '&:active': {
      background: 'linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%)',
      color: '#FFFF',
   },
   '&:disabled': {
      background: '#D3D3D3',
      color: '#FFFF',
   },
}))
