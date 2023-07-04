import * as React from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const SwitchApp = ({ checked, onChange, ...rest }) => {
   return (
      <FormGroup>
         <FormControlLabel
            control={
               <IOSSwitch
                  sx={{ m: 1 }}
                  defaultChecked={false}
                  checked={checked}
                  onChange={onChange}
                  {...rest}
               />
            }
         />
      </FormGroup>
   )
}

const IOSSwitch = styled((props) => (
   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
   paddingRight: '200px',

   width: 42,
   height: 26,
   padding: 0,
   '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
         transform: 'translateX(16px)',
         color: '#fff',
         '& + .MuiSwitch-track': {
            backgroundColor: '#2ECA45',
            opacity: 1,
            border: 0,
         },
      },
   },
   '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
   },
   '& .MuiSwitch-track': {
      borderRadius: '30px',
      backgroundColor: '#E9E9EA',
      opacity: 1,
   },
}))

export default SwitchApp
