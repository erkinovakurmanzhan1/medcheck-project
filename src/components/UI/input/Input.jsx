import React, { forwardRef } from 'react'
import { TextField } from '@mui/material'
import styled from '@emotion/styled'

const Input = forwardRef(
   ({ error, onChange, value, variant, placeholder, ...rest }, ref) => {
      return (
         <StyledInput
            error={Boolean(error)}
            ref={ref}
            variant={variant}
            placeholder={placeholder}
            onChange={onChange}
            classes={{
               root: 'input',
               error: 'invalid',
            }}
            value={value}
            {...rest}
         />
      )
   }
)
export default Input

const StyledInput = styled(TextField)(() => ({
   input: {
      fontFamily: 'Manrope',
   },
   '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
   },
   '& .MuiOutlinedInput-root': {
      '&:hover': {
         borderRadius: '8px',
         border: '1x solid #959595',
      },
      '&:active': {
         borderRadius: '8px',
         border: '1px solid #048741',
         background: 'none',
      },
      '&:invalid': {
         borderRadius: '8px',
         border: '5px solid #f91515',
      },
   },
}))
