import { styled } from '@mui/material'
import React from 'react'
import { ReactComponent as SearchIcon } from '../../assets/icons/SearchIcon.svg'

const SearchInput = ({
   onChange,
   value,
   placeholder = 'Поиск по сайту',
   ...rest
}) => {
   return (
      <ContainerSearhInputStyled>
         <InputStyled
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            {...rest}
         />
         <SearchIcon />
      </ContainerSearhInputStyled>
   )
}

export default SearchInput

const ContainerSearhInputStyled = styled('div')({
   background: '#F3F1F1',
   borderRadius: '24px',
   display: 'flex',
   alignItems: 'center',
   padding: '0.6rem 1.1rem',
   justifyContent: 'space-between',
   width: '100%',
})

const InputStyled = styled('input')({
   border: 'none',
   outline: 'none',
   background: '#F3F1F1',
   width: '95%',
   color: '#716B6B',
   fontStyle: 'normal',
   fontWeight: '400',
   fontSize: '14px',
   lineHeight: '1.1rem',
})
