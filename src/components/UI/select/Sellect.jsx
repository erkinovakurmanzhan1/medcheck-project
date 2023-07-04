import React, { useState } from 'react'
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import { ReactComponent as ExpandMoreIcon } from '../../../assets/serviceIcons/Указатель.svg'

const Sellect = ({ data = [] }) => {
   const [expanded, setExpanded] = useState()

   const clickHandler = (panel) => (e, isExpanded) => {
      setExpanded(isExpanded ? panel : false)
   }
   return (
      <AccordionContainer>
         {data.map((data) => (
            <AccordionStyle
               key={data.id}
               expanded={expanded === data.id}
               onChange={clickHandler(data.id)}
            >
               <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <TypographyStyle key={data.id}>{data.title}</TypographyStyle>
               </StyledAccordionSummary>
               <AccordionDetailsStyle>
                  <TypographyTitle key={data.id}>
                     {data.description}
                  </TypographyTitle>

                  {data.text.map((el) => (
                     <List key={el}>{el}</List>
                  ))}
               </AccordionDetailsStyle>
            </AccordionStyle>
         ))}
      </AccordionContainer>
   )
}
export default Sellect

const TypographyStyle = styled(Typography)(() => ({
   fontFamily: 'Manrope',
   fontWeight: 500,
   fontSize: '20px',
   lineHeight: '27px',
   cursor: 'pointer',
}))
const TypographyTitle = styled(Typography)(() => ({
   fontFamily: 'Manrope',
   fontWeight: 400,
   fontSize: '16px',
   lineHeight: '22px',
}))

const AccordionContainer = styled('div')(() => ({
   width: '852px',
   fontFamily: 'Manrope',
}))

const AccordionStyle = styled(Accordion)(() => ({
   width: '852px',
   marginBottom: '16px',
   borderRadius: '10px',
   boxShadow: 'none',
}))

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
   borderLeft: '10px solid #048741',
   borderRadius: '10px',
   background: '#DBF0E5',
   '&:focus': {
      background: '#048741',
      color: '#FFFF',
   },
}))

const AccordionDetailsStyle = styled(AccordionDetails)(() => ({
   marginTop: '23px',
   width: '806px',
   marginBottom: '20px',
   color: '#4D4E51',
   fontSize: '16px',
   '& li': {
      width: '798px',
      color: '#4D4E51',
      fontSize: '16px',
      marginLeft: '26px',
   },
   '&::marker': {
      color: 'green',
   },
}))

const List = styled('li')(() => ({
   color: 'black',
   '&:: marker': {
      color: 'green',
   },
}))
