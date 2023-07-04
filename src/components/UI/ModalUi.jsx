import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   minWidth: '400px',
   bgcolor: 'background.paper',
   border: 'none',
   // boxShadow: 24,
   // p: 4,
}

export default function BasicModal({ children, open, onClose, ...rest }) {
   return (
      <Modal
         open={open}
         onClose={onClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         {...rest}
      >
         <Box sx={style}>{children}</Box>
      </Modal>
   )
}
