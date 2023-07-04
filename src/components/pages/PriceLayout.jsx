import { useState } from 'react'
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import expandMoreIcon from '../../assets/serviceIcons/Указатель.svg'
import { ReactComponent as RectangleIcon } from '../../assets/icons/Rectangle 30 .svg'

export const PriceLayout = ({ data }) => {
   const [expanded, setExpanded] = useState()

   const changeItemHandler = (panel) => (e, isExpanded) => {
      setExpanded(isExpanded ? panel : false)
   }

   return (
      <AccordionContainer>
         <StyledTitleText>
            Наш <span style={{ color: '#048741' }}>прайс</span>
         </StyledTitleText>
         <StyledPriceText>
            <p>
               Цены на услуги формируются в соответствии с действующими
               Прейскурантами. Общая стоимость зависит от объема услуг,
               оказываемых в рамках приёма. Объём оказываемых услуг определяется
               врачом, исходя из показаний для обследования и пожеланий клиента.
            </p>
         </StyledPriceText>
         {data.map((item) => (
            <AccordionStyle
               key={item.id}
               expanded={expanded === item.id}
               onChange={changeItemHandler(item.id)}
            >
               <StyledAccordionSummary
                  expandIcon={<img src={expandMoreIcon} alt="vector" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
               >
                  <TypographyStyle>{item.title}</TypographyStyle>
               </StyledAccordionSummary>
               <AccordionDetailsStyle>
                  <PriceContainer>
                     <li>
                        <h3>
                           Lorem ipsum dolor sit amet, consectetur adipiscing
                           elit.
                        </h3>
                        <p>2300 com </p>
                     </li>
                  </PriceContainer>
                  <StyledTypography>
                     -Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Suspendisse malesuada lacus ex, sit amet blandit leo
                     lobortis eget.
                  </StyledTypography>

                  <RectangleIcon />
               </AccordionDetailsStyle>
            </AccordionStyle>
         ))}
      </AccordionContainer>
   )
}

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
   borderLeft: '10px solid #048741',
   borderRadius: '10px',
   background: '#DBF0E5',

   '&:focus': {
      background: '#048741',
      '& img': {
         transform: 'rotate(-90deg )',
      },
   },
}))

const AccordionDetailsStyle = styled(AccordionDetails)(() => ({
   marginTop: '23px',
   width: '100%',
   height: '100%',
   marginBottom: '20px',
   color: '#4D4E51',
   fontSize: '1rem',
   '& li': {
      width: '798px',
      marginBottom: '20px',
      color: '#4D4E51',
      fontSize: '1rem',
      marginTop: '0px',
      marginLeft: '2px',
   },
}))

const AccordionStyle = styled(Accordion)(() => ({
   width: '85%',
   marginBottom: '16px',
   borderRadius: '10px',
   boxShadow: 'none',

   '& p': {
      width: '85%',
   },
}))

const TypographyStyle = styled(Typography)(() => ({
   fontSize: '1.3rem',
   fontWeight: 500,
   fontFamily: 'Manrope',
   lineHeight: '27px',
   color: '#4D4E51',
}))

const AccordionContainer = styled('div')(() => ({
   width: '95%',
   marginLeft: '120px',
   marginBottom: '40px',
}))

const StyledTitleText = styled.h1`
   font-size: 2.25rem;
   font-weight: 600;
   line-height: 49.18px;
   font-family: Manrope;
   margin-top: 26px;
   margin-bottom: 20px;
`
const StyledPriceText = styled('div')(() => ({
   width: '75%',
   marginBottom: '40px',

   '& p ': {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: '25px',
      fontFamily: 'Manrope',
      marginBottom: '40px',
   },
}))

const PriceContainer = styled('div')(() => ({
   '& li': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      margin: ' 26px 0 16px 0 ',
   },

   '& p': {
      width: '10%',
      fontSize: '1.25rem',
      fontWeight: 500,
      fontFamily: 'Manrope',
      lineHeight: '25px',
   },
}))

const StyledTypography = styled(Typography)(() => ({
   width: '85%',
   fontSize: '1rem',
   fontWeight: 400,
   fontFamily: 'Manrope',
   lineHeight: '22px',
   color: '#4D4E51',
   margin: ' 0 0 10px 5px ',
}))
