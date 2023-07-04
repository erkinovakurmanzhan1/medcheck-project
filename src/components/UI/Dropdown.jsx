import React, { useState } from 'react'
import {
   DataContainer,
   NavlinkStyled,
   PopoverStyled,
   ServiceButtonStyled,
} from '../../layout/user/header/header-styled'

const Dropdown = ({ children, services, data, info }) => {
   const [popover, setPopover] = useState(null)

   const handlePopoverOpen = (event) => {
      setPopover(event.currentTarget)
   }

   const handlePopoverClose = () => {
      setPopover(null)
   }

   const openPopover = Boolean(popover)
   const id = openPopover ? 'simple-popover' : undefined

   return (
      <div>
         <ServiceButtonStyled
            aria-describedby={id}
            onMouseEnter={handlePopoverOpen}
         >
            {children}
         </ServiceButtonStyled>
         <PopoverStyled
            id={id}
            open={openPopover}
            anchorEl={popover}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            BackdropProps={{ invisible: true }}
         >
            <DataContainer onMouseLeave={handlePopoverClose}>
               <div>
                  {services.map((service) => (
                     <div key={service.id}>
                        <NavlinkStyled
                           to={`service/${service.id}/details`}
                           state={{ departName: service.name }}
                        >
                           {service.name}
                        </NavlinkStyled>
                     </div>
                  ))}
               </div>
               <div>
                  {data.map((el) => {
                     return (
                        <div key={el.id}>
                           <NavlinkStyled
                              to={`service/${el.id}/details`}
                              state={{ departName: el.name }}
                           >
                              {el.name}
                           </NavlinkStyled>
                        </div>
                     )
                  })}
               </div>
               <div>
                  {info.map((el) => {
                     return (
                        <div key={el.id}>
                           <NavlinkStyled
                              to={`service/${el.id}/details`}
                              state={{ departName: el.name }}
                           >
                              {el.name}
                           </NavlinkStyled>
                        </div>
                     )
                  })}
               </div>
            </DataContainer>
         </PopoverStyled>
      </div>
   )
}

export default Dropdown
