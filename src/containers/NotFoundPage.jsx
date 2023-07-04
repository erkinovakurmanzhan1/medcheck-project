import { styled } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/UI/Button'

const NotFoundPage = () => {
   const navigate = useNavigate()
   const navigateHandler = () => {
      navigate('/')
   }
   return (
      <Box>
         <h2>Упс... </h2>
         <h1>Страница не найдена!</h1>
         <ButtonStyled onClick={navigateHandler}>
            Вернуться на главную
         </ButtonStyled>
      </Box>
   )
}

export default NotFoundPage
const Box = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: center;
   font-family: Manrope;
   font-weight: 500;
   color: #4d4e51;
   h2 {
      padding-top: 17%;
   }
`
const ButtonStyled = styled(Button)(() => ({
   marginTop: '20px',

   '&': {
      padding: '10px 20px',
   },
}))
