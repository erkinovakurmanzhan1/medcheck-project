import { styled as styledMui } from '@mui/material/styles'
import { TextField } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useRef, useState } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import getResultBackgroundImage from '../../../assets/images/getResultBackgroundImage.png'
import medcheckIcon from '../../../assets/icons/MedcheckLogo.svg'
import medcheck from '../../../assets/icons/MedCheckIcon.svg'
import Button from '../../../components/UI/Button'
import { getResultRequest } from '../../../api/getResultService'
import cross from '../../../assets/icons/cross.svg'
import pdfIcon from '../../../assets/icons/PdfIcon.svg'
import printIcon from '../../../assets/icons/printIcon.svg'
import useToast from '../../../hooks/useToast'
import barcodeIcon from '../../../assets/icons/barcodeIcon.svg'
import './printStyle.css'

const GetResults = () => {
   const { notify } = useToast()
   const [resultInputValue, setResultInputValue] = useState('')
   const [getResult, setGetResult] = useState([])
   const [successfullyGetResult, setSuccessfullyGetResult] = useState(false)
   const pdfRef = useRef(null)
   const componentRef = useRef(null)

   const getResultInputChangeHandler = (event) => {
      setResultInputValue(event.target.value)
      setSuccessfullyGetResult(false)
   }

   const getResultHandler = async () => {
      try {
         const { data } = await getResultRequest(resultInputValue)
         setGetResult(data)
         setSuccessfullyGetResult(true)
         setResultInputValue('')
      } catch (error) {
         notify('error', 'Данные не найдены')
      }
   }
   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
   })

   const closeResultHandler = () => {
      setSuccessfullyGetResult(false)
   }
   const handleSavePDF = () => {
      try {
         html2canvas(pdfRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            // eslint-disable-next-line new-cap
            const pdf = new jsPDF('p', 'px')
            pdf.addImage(imgData, 'PNG', 0, 0)
            pdf.save('document.pdf')
         })
      } catch (error) {
         notify('error', 'Произошла ошибка при сохранении PDF')
      }
   }

   return (
      <ImageStyle>
         <Box>
            <LogoBox>
               <NavLink to="/">
                  <img src={medcheckIcon} alt="logo" />
               </NavLink>
               <NavLink to="/">
                  <LogoStyle src={medcheck} alt="medcheck" />
               </NavLink>
            </LogoBox>
            <UiBox>
               <InputStyle
                  placeholder="Введите номер результата..."
                  onChange={getResultInputChangeHandler}
                  value={resultInputValue}
               />
               <div>
                  <ButtonStyle onClick={getResultHandler} variant="contained">
                     найти
                  </ButtonStyle>
               </div>
            </UiBox>
         </Box>
         <LineBox>
            <Line />
         </LineBox>
         <ContainerPdf>
            <InfoBoxStyle>
               <ButtonResultBox>
                  <h3>Выдача результатов</h3>
                  {successfullyGetResult ? (
                     <ContainerButtons>
                        <CloseResultButton onClick={closeResultHandler}>
                           <img src={cross} alt="крестикинолики:)" />
                           Закрыть
                        </CloseResultButton>
                        <PdfButtonStyle onClick={handleSavePDF}>
                           <img src={pdfIcon} alt="pdf" />
                           PDF
                        </PdfButtonStyle>
                        <ReactToPrint
                           // eslint-disable-next-line react/no-unstable-nested-components
                           trigger={() => (
                              <PrintButtonStyle onClick={handlePrint}>
                                 <img src={printIcon} alt="print" />
                                 Распечатать
                              </PrintButtonStyle>
                           )}
                           content={() => componentRef.current}
                        />
                     </ContainerButtons>
                  ) : null}
               </ButtonResultBox>

               <p>Вы можете:</p>
               <ul>
                  <li>
                     Просмотреть свои результаты анализов онлайн Вы можете,
                     введя в поле слева индивидуальный цифровой код, который
                     указан в верхней части Вашей квитанции под штрих-кодом;
                  </li>
                  <li>
                     Распечатать результат можно непосредсвенно с этой страницы
                     или сохранить в PDF формате с помощью кнопок, расположенной
                     в верхней части сайта;
                  </li>
                  <li>
                     При возникновении проблем с отображением результатов,
                     Вы можете оставить заявку на получение результатов
                     по электронной почте, позвонив в Службу поддержки клиентов
                     по номеру 909 090
                  </li>
               </ul>
            </InfoBoxStyle>

            {successfullyGetResult ? (
               <div style={{ marginLeft: '70px' }}>
                  <div ref={componentRef} className="print-container">
                     <div ref={pdfRef}>
                        <ReferenceBoxStyle>
                           <LogoReferenceBox className="print-logo-box">
                              <div className="logo-box">
                                 <LogoReferenceStyle
                                    src={medcheckIcon}
                                    alt="logo"
                                 />
                                 <LogoMedcheckStyle
                                    src={medcheck}
                                    alt="medcheck"
                                 />
                              </div>
                              <BoxStyle>
                                 <p className="print-header-title">
                                    № заявки для просмотра результатов анализов
                                    на сайте
                                    <a href="/">MedCheck-me.ru</a>
                                 </p>
                                 <img src={barcodeIcon} alt="barcode" />
                              </BoxStyle>
                           </LogoReferenceBox>

                           <GetResultsInfoStyle>
                              <div className="server-box">
                                 <h3>Услуга: {getResult.name}</h3>
                              </div>
                              <div className="patient-box">
                                 <div>
                                    <p>Пациент : {getResult.patientFullName}</p>
                                 </div>
                                 <div>
                                    <p>
                                       Телефон :{getResult.patientPhoneNumber}
                                    </p>
                                 </div>
                                 <div>
                                    <p>Email :{getResult.patientEmail}</p>
                                 </div>
                              </div>
                              <div className="order-box">
                                 № заявки
                                 <h2>{getResult.orderNumber}</h2>
                              </div>
                           </GetResultsInfoStyle>
                           <div className="attention-box">
                              <h3 className="attention-title">Внимание!!!</h3>
                              <p className="print-title">
                                 В случае сомнительного результата,лаборатория
                                 оставляет за собой право задержать результат
                                 для перепроверки.
                              </p>
                           </div>
                        </ReferenceBoxStyle>
                     </div>
                  </div>
               </div>
            ) : null}
         </ContainerPdf>
      </ImageStyle>
   )
}

export default GetResults

const LogoStyle = styledMui('img')({
   marginTop: '30px',
})
const ImageStyle = styledMui('div')({
   width: '100vw',
   height: '100vh',
   backgroundImage: `url(${getResultBackgroundImage})`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   display: 'flex',
})

const Box = styledMui('div')({
   width: '35.7vw',
   height: '215px',
   background: '#FFFFFF',
   borderRadius: '10px',
   marginTop: '46px',
   marginLeft: '38px',
})
const LogoBox = styledMui('div')({
   display: 'flex',
   justifyContent: 'center',
   gap: '11.42px',
   paddingTop: '32px',
})
const UiBox = styledMui('div')({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '10px',
   gap: '10px',
})
const InputStyle = styledMui(TextField)({
   paddingTop: '10px',
   '& .MuiOutlinedInput-root': {
      width: '300px',
      borderRadius: '10px',
      '& fieldset': {
         border: '1px solid #909CB5',
      },
      '&:hover fieldset': {
         borderColor: '#909CB5',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#909CB5',
      },
      input: {
         fontFamily: 'Manrope',
         fontWeight: 400,
         color: '#222222',
      },
   },
})

const ButtonStyle = styledMui(Button)({
   '&': {
      padding: '16px 38px',
      background: 'linear-gradient(180.61deg, #0CBB6B 0.45%, #027B44 99.39%)',
      marginTop: '14px',
      borderRadius: '10px',
   },
})

const InfoBoxStyle = styledMui('div')({
   width: '57.2vw',
   background: '#FEFBFB80',
   color: '#346EFB',
   fontFamily: 'Manrope',
   padding: '0px 25px 20px 10px',
   marginLeft: '60px',

   '& h3': {
      padding: '20px 0 0 30px',
      fontWeight: 600,
      lineHeight: '25px',
      fontSize: '18px',
   },
   '& p': {
      paddingLeft: '30px',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '19px',
      marginTop: '18px',
   },
   '& ul': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '22px',
      marginLeft: '30px',
      '& li': {
         paddingTop: '6px',
      },
      '& li:last-child': {
         color: 'red',
      },
   },
})

const ReferenceBoxStyle = styledMui('div')({
   background: '#FFFF',
   width: '53vw',
   padding: '23px',
   fontFamily: 'Manrope',
   marginLeft: '20px',
   marginTop: '20px',
})

const LogoReferenceStyle = styledMui('img')({
   width: '45px',
   height: '45px',
})
const LogoMedcheckStyle = styledMui('img')({
   marginBottom: '14px',
})
const LogoReferenceBox = styledMui('div')({
   display: 'flex',
   justifyContent: 'space-around',
   borderBottom: '1px solid #716B6B',
   fontFamily: 'Manrope',
   paddingBottom: '10px',
})
const BoxStyle = styledMui('div')({
   display: 'flex',
   p: {
      width: '200px',
      fontFamily: 'Roboto',
      fontWeight: 600,

      a: {
         marginLeft: '7px',
      },
   },
   img: {
      width: '200px',
      height: '50px',
   },
})

const CloseResultButton = styledMui(Button)({
   '&': {
      padding: '10px 30px',
      background: '#F91515',
      img: {
         marginRight: '15px',
      },
   },

   '&:hover': {
      background: '#e21818',
      color: '#fff',
   },
   '&:active': {
      background: '#e21818',
      color: '#FFFF',
   },
})
const PdfButtonStyle = styledMui(Button)({
   '&': {
      padding: '10px 15px',
      background: '#3977C0',
      img: {
         marginRight: '10px',
      },
   },

   '&:hover': {
      background: '#056adf',
      color: '#fff',
   },
   '&:active': {
      background: '#056adf',
      color: '#FFFF',
   },
})
const PrintButtonStyle = styledMui(Button)({
   '&': {
      padding: '10px 20px',
      background: '#3977C0',
      img: {
         marginRight: '10px',
      },
   },

   '&:hover': {
      background: '#056adf',
      color: '#fff',
   },
   '&:active': {
      background: '#056adf',
      color: '#FFFF',
   },
})

const GetResultsInfoStyle = styledMui('div')({
   display: 'flex',
   justifyContent: 'space-between',
   margin: '10px 0',
   fontFamily: 'Manrope',

   h2: {
      border: '2px solid  #222222',
      padding: '7px',
   },
})

const ContainerButtons = styledMui('div')({
   display: 'flex',
   marginTop: '25px',
   gap: '12px',
})

const ContainerPdf = styledMui('div')({
   display: 'flex',
   flexDirection: 'column',
})
const ButtonResultBox = styledMui('div')({
   display: 'flex',
   justifyContent: 'space-between',
})
const LineBox = styledMui('div')({
   position: 'relative',
})
const Line = styledMui('div')({
   borderRight: '10px solid #3977C0',
   height: '100%',
   position: 'absolute',
   left: '49px',
})
