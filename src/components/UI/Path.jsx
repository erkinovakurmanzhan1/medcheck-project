import { Stack } from '@mui/material'
import React from 'react'
import {
   Container,
   StyledNavLink,
} from '../../containers/admin/specialist-style'

const Path = () => {
   return (
      <Stack spacing={2}>
         <Container separator="›" aria-label="breadcrumb">
            <StyledNavLink to="/admin/specialists">
               <p>Личный кабинет</p>
            </StyledNavLink>
            <p>Профиль</p>
         </Container>
      </Stack>
   )
}

export default Path
