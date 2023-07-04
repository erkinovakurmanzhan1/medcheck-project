import styled from '@emotion/styled'
import React from 'react'

const FormInput = ({ label, type, value, onChange }) => {
   return (
      <div>
         <StyledLabel>{label}</StyledLabel>
         <StyledInput type={type} value={value} onChange={onChange} />
      </div>
   )
}

export default FormInput

const StyledInput = styled('input')(() => ({
   width: '100%',
   padding: '10px 18px',
   border: '1px solid #D9D9D9',
   borderRadius: '5px',
   outline: 'none',
   '&:hover': {
      border: '1px solid #959595',
   },
   '&:focus': {
      border: '1px solid #048741',
   },
}))

const StyledLabel = styled('p')(() => ({
   margin: '12px 0 6px',
   fontFamily: 'Manrope',
   fontStyle: 'normal',
   fontWeight: '400',
   fontSize: '12px',
   color: '#4D4E51',
}))
