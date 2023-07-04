import React from 'react'
import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import Footer from '../../components/footer/Footer'

const UserLayout = () => {
   return (
      <div>
         <Header />
         <Grid>
            <Outlet />
         </Grid>
         <Footer />
      </div>
   )
}

export default UserLayout
