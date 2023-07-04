import { createTheme } from '@mui/material'

export const appTheme = {
   palette: {
      primary: {
         main: '#FFFFFF',
         black: '#222222',
         gray: '#4D4E51',
         greenLinerGradient: 'rgb(12,187,107)',
         green: '#048741',
         backgroundAdmin: '#F5F5F5',
      },
      secondary: {
         input: '#D9D9D9',
         main: '#E0E2E7',
         whiteRadialGradient: '#e4e7ee',
         secondWhite: '#F3F1F1',
         gray: '#959595',
         orange: '#E4772F',
      },
      tertiary: {
         main: '#DBEBFF',
         secondWhite: '#DBF0E5',
         red: '#F91515',
         firstBlue: '#3977C0',
         secondBlue: '#346EFB',
      },
   },
   typography: {
      fontFamily: ['Manrope', 'Poppins'],
   },
}

export const theme = createTheme(appTheme)
