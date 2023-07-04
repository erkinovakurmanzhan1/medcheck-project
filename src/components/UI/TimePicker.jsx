import * as React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { styled } from '@mui/material/styles'

export default function BasicTimePicker({
   onBlur,
   value,
   onChange,
   error,
   ...rest
}) {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer
            components={['TimePicker']}
            sx={{ overflow: 'initial', paddingTop: 0 }}
         >
            <StyledTimePicker
               value={value}
               onChange={(time) => onChange(time)}
               {...rest}
               ampm={false}
               onBlur={onBlur}
               className="time_picker"
               inputFormat="HH:mm"
               error={error}
               slotProps={{
                  openPickerButton: {
                     classes: { root: 'custom_adornment_icon_class' },
                  },
                  inputAdornment: {
                     classes: {
                        root: 'custom_adornment_class',
                     },
                  },
                  actionBar: {
                     sx: { display: 'none' },
                  },
                  popper: {
                     sx: {
                        '& .MuiList-root.MuiMultiSectionDigitalClock-root::after':
                           {
                              height: 0,
                           },
                     },
                  },
                  textField: {
                     placeholder: '00:00',
                     sx: {
                        '&.MuiTextField-root': {
                           minWidth: 0,
                        },
                     },
                  },
                  desktopPaper: {
                     sx: {
                        '& .MuiMultiSectionDigitalClock-root': {
                           maxHeight: '140px',
                        },
                     },
                  },
               }}
            />
         </DemoContainer>
      </LocalizationProvider>
   )
}
const StyledTimePicker = styled(TimePicker)(({ error }) => ({
   '& .MuiInputBase-root': {
      width: '97px',
      height: '38px',
      borderRadius: '10px',
      overflowY: 'none',
      border: error ? '1px solid #d32f2f' : '1px solid #D9D9D9',
   },
   '& .MuiOutlinedInput-root': {
      paddingLeft: '9px',
      fontSize: '16px',
      fontWeight: 400,
   },
   '& .custom_adornment_class': {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      marginLeft: 0,
      maxHeight: '100%',
   },
   '& .custom_adornment_icon_class': {
      opacity: 0,
      width: '100%',
      display: 'block',
   },
   '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
}))
