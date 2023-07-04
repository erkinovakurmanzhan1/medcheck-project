import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'
import { parseISO } from 'date-fns'

const DatePicker = ({
   value,
   onChange,
   onBlur,
   format,
   maxDate,
   minDate,
   error,
   ...rest
}) => {
   const parsedValue = typeof value === 'string' ? parseISO(value) : value

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <StyledDatePicker
            value={parsedValue}
            onChange={(date) => onChange(date)}
            onBlur={onBlur}
            // format="MM.DD.YYYY"
            {...rest}
            maxDate={maxDate}
            minDate={minDate}
            error={error}
            slotProps={{
               desktopPaper: {
                  sx: {
                     '& .MuiDateCalendar-root': {
                        width: '300px',
                        maxHeight: '294px',
                     },
                     '& MuiPickersCalendarHeader-root': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyItems: 'center',
                     },
                     '& .MuiPickersArrowSwitcher-root': {
                        display: 'inline-flex',
                     },
                     '& .MuiPickersCalendarHeader-label': {
                        textAlign: 'center',
                     },
                     '& .MuiPickersArrowSwitcher-spacer': {
                        width: '210px',
                     },
                     '& .css-31ca4x-MuiPickersFadeTransitionGroup-root': {
                        display: 'flex',
                        position: 'absolute',
                        paddingLeft: '80px',
                     },
                     '& .css-9reuh9-MuiPickersArrowSwitcher-root': {
                        marginLeft: '-2px',
                     },
                     '& .MuiPickersArrowSwitcher-button': {
                        paddingRight: '7px',
                     },
                     '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
                        background: '#048741',
                     },
                  },
               },
            }}
         />
      </LocalizationProvider>
   )
}
export default DatePicker
const StyledDatePicker = styled(MuiDatePicker)(({ error }) => ({
   borderRadius: '6px',
   fontFamily: 'Roboto',
   fontWeight: '400',
   fontSize: '14px',
   border: error ? '1px solid #d32f2f' : '1px solid #D4D4D4',
   input: {
      width: '5.625rem',
      padding: '8px 15px 8px 15px',
      fontSize: '14px',
      color: '#4D4E51',
   },

   '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
}))
