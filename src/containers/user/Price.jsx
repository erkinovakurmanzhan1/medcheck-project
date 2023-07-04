import styled from '@emotion/styled'
import React, { useState } from 'react'
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
} from '@mui/material'
import { ReactComponent as ExpandMoreIcon } from '../../assets/serviceIcons/Указатель.svg'
import { priceData } from '../../utlis/price/price'

const Price = () => {
   const [expanded, setExpanded] = useState(false)
   const [colors, setColors] = useState(false)

   const clickHandler = (panel) => (e, isExpanded) => {
      setExpanded(isExpanded ? panel : false)
      setColors(!colors)
   }
   return (
      <>
         <Hr />
         <MainPart>
            <a href="/">Главная {'>'}</a>
            <span className="service"> Прайс</span>
         </MainPart>
         <ServiceStyle>
            <span>Наш</span>
            <span className="our_service"> прайс</span>
         </ServiceStyle>
         <P>
            Цены на услуги формируются в соответствии с действующими
            Прейскурантами. Общая стоимость зависит от объема услуг, оказываемых
            в рамках приёма. Объём оказываемых услуг определяется врачом, исходя
            из показаний для обследования и пожеланий клиента.
         </P>

         <AccordionContainer>
            {priceData.map((data) => (
               <AccordionStyle
                  key={data.title}
                  colors={colors}
                  expanded={expanded === data.title}
                  onChange={clickHandler(data.title)}
               >
                  <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                     <TypographyStyle key={data.title}>
                        {data.title}
                     </TypographyStyle>
                  </StyledAccordionSummary>
                  <AccordionDetailsStyle>
                     <TypographyStyleTitle key={data.title}>
                        <div
                           style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '820px',
                           }}
                        >
                           {' '}
                           <span>{data.description}</span>{' '}
                           <span>{data.totalPrice}</span>
                        </div>
                     </TypographyStyleTitle>
                     {data.info.map((el) => (
                        <li
                           key={el}
                           style={{
                              listStyle: 'none',
                              fontFamily: 'Manrope',
                              fontWeight: 400,
                              fontSize: '16px',
                              lineHeight: '22px',
                              color: '#4D4E51',
                           }}
                        >
                           {el}
                        </li>
                     ))}
                     <hr style={{ width: '820px' }} />
                     <br />
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           width: '820px',
                           fontFamily: 'Manrope',
                           fontWeight: 600,
                           fontSize: '18px',
                           lineHeight: '25px',
                        }}
                     >
                        {' '}
                        <span>{data.description1}</span>{' '}
                        <span>{data.price}</span>
                     </div>
                     <br />
                     <br />
                     <hr style={{ width: '820px' }} />
                     <br />
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           width: '820px',
                        }}
                     >
                        {' '}
                        <TypographyStyleTitle>
                           {data.description2}
                        </TypographyStyleTitle>{' '}
                        <TypographyStyleTitle>
                           {data.price}
                        </TypographyStyleTitle>
                     </div>
                     <br />
                     <hr style={{ width: '820px' }} />
                  </AccordionDetailsStyle>
               </AccordionStyle>
            ))}
         </AccordionContainer>
      </>
   )
}

export default Price

const TypographyStyle = styled(Typography)(() => ({
   fontFamily: 'Manrope',
   fontWeight: 600,
   fontSize: '20px',
   lineHeight: '27px',
}))
const TypographyStyleTitle = styled(Typography)(() => ({
   color: '4D4E51',
   fontFamily: 'Manrope',
   fontWeight: 600,
   fontSize: '18px',
   lineHeight: '25px',
}))
const Hr = styled('hr')(() => ({
   width: '100%',
   height: '10px',
   marginBottom: '30px',
   background: '#DBF0E5',
   border: 'none',
}))

const MainPart = styled('p')(() => ({
   marginLeft: '95px',
   fontFamily: ' Manrope',
   fontSize: '14px',
   fontWeight: 400,
   lineHeight: '19px',
   textAlign: 'left',
   paddingTop: '25px',
   a: {
      color: '#959595',
      textDecoration: 'none',
   },
   '& .service': {
      color: '#048741',
   },
}))

const ServiceStyle = styled('div')(() => ({
   fontSize: '36px',
   fontWeight: 600,
   lineHeight: '49px',
   fontFamily: 'Manrope',
   color: '#222222',
   marginLeft: '95px',
   marginBottom: '34px',
   marginTop: '26px',
   '& .our_service': {
      color: '#048741',
   },
}))
const P = styled('p')(() => ({
   width: '691px',
   height: '100px',
   fontSize: '18px',
   fontWeight: 400,
   lineHeight: '24px',
   color: ' #4D4E51',
   fontFamily: ' Manrope',
   marginLeft: '95px',
   marginBottom: '40px',
}))
const AccordionContainer = styled('div')(() => ({
   width: '852px',
   marginLeft: '95px',
}))

const AccordionStyle = styled(Accordion)(() => ({
   marginBottom: '16px',
   borderRadius: '10px',
   boxShadow: 'none',
}))

const StyledAccordionSummary = styled(AccordionSummary)((colors) => ({
   borderLeft: '10px solid #048741',
   borderRadius: '10px',
   background: '#DBF0E5',
   '&:focus': {
      background: '#048741',
      color: colors ? '#fff' : '#222',
   },
}))

const AccordionDetailsStyle = styled(AccordionDetails)(() => ({
   color: '#4D4E51',
   fontSize: '16px',
   '& li': {
      marginBottom: '20px',
      color: '#4D4E51',
      fontSize: '16px',
      marginTop: '20px',
      marginLeft: '10px',
   },
}))
