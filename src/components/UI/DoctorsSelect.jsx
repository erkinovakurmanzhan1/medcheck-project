import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, Select } from '@mui/material'
import styled from '@emotion/styled'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const menuProps = {
   PaperProps: {
      style: {
         maxHeight: 292,
      },
   },
}

export const DoctorsSelect = ({
   items = [],
   label,
   value,
   onChange,
   placeholder,
   ...rest
}) => {
   const renderedValue = items?.find((item) => item.id === value) || undefined
   return (
      <FormControl fullWidth>
         <SelectMui
            disabled={items.length === 0}
            value={value}
            label={label}
            onChange={onChange}
            IconComponent={KeyboardArrowDownIcon}
            {...rest}
            MenuProps={menuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            displayEmpty
            renderValue={() => {
               if (renderedValue) {
                  return (
                     <>
                        {renderedValue.firstName} {renderedValue.lastName}
                     </>
                  )
               }
               return placeholder
            }}
            placeholder={placeholder}
         >
            {items &&
               items.map((item) => (
                  <MenuItemStyle key={item.id} value={item.id}>
                     <ImageStyle src={item.image} alt="doctorImage" />
                     {item.firstName} {item.lastName}
                  </MenuItemStyle>
               ))}
         </SelectMui>
      </FormControl>
   )
}

const SelectMui = styled(Select)(() => ({
   maxWidth: '100%',
   height: '38px',
   border: '1px solid #D9D9D9',
   borderRadius: '6px',
   lineHeight: '21.86px',
   color: '#4D4E51',
   fontFamily: 'Manrope',
   fontWeight: 400,
   fontSize: '16px',
   div: {
      span: {
         marginLeft: '7px',
      },
   },
   '&:hover': {
      '&& fieldset': {
         border: '1px solid #959595',
         color: '#4D4E51',
      },
   },
   '&:active': {
      '&& fieldset': {
         border: '1px solid rgba(4, 135, 65, 0.8)',
         color: '#4D4E51',
      },
   },
   '&:disabled': {
      '&& fieldset': {
         border: '1px solid #959595',
         color: '#4D4E51',
      },
   },
}))

const MenuItemStyle = styled(MenuItem)(() => ({
   fontFamily: 'Manrope',
   fontWeight: 400,
   fontSize: '16px',
   color: '#222222',
   display: 'flex',
   padding: '7px 0 7px 7px',
   borderBottom: '1px solid #E0E2E7',
   span: {
      marginLeft: '7px',
   },
   '&:hover': {
      background: '#DBF0E5',
   },
   '&:active': {
      background: '#DBF0E5',
   },
}))
const ImageStyle = styled('img')(() => ({
   width: '50px',
   height: '50px',
   borderRadius: '50%',
   margin: '0 7px',
}))
