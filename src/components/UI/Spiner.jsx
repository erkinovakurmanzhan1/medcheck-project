import { CircularProgress, styled } from '@mui/material'
import React from 'react'

const Spiner = () => {
   return (
      <Container>
         <CircularProgress color="success" />
      </Container>
   )
}

export default Spiner

const Container = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   padding: '5px 0px',
}))
