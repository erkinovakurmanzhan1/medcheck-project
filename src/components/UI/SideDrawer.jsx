import { Box, Drawer } from '@mui/material'
import React from 'react'

const SideDrawer = ({ open, onClose, anchor = 'right', children }) => {
   return (
      <Drawer anchor={anchor} open={open} onClose={onClose}>
         <Box minWidth="380px">{children}</Box>
      </Drawer>
   )
}
export default SideDrawer
