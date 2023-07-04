import styled from '@emotion/styled'
import { Avatar, IconButton, Stack } from '@mui/material'
// import Measure from 'react-measure'
import { useUploadAvatar } from '../../../hooks/uploadAvatar'
import { ReactComponent as AddPhoto } from '../../../assets/table/File.svg'

const AvatarUpload = ({ ...rest }) => {
   const [avatarUrl, handleAvatarChange, fileInputRef] = useUploadAvatar()
   return (
      <ContainerFile>
         <IconButton
            {...rest}
            color="primary"
            aria-label="upload picture"
            component="label"
         >
            <input
               hidden
               accept="image/*"
               type="file"
               onChange={handleAvatarChange}
               ref={fileInputRef}
            />
            <Stack direction="row" spacing={2}>
               <AvatarGroupStyle sx={{ bgcolor: '#E2E4E8' }} variant="rounded">
                  <img src={avatarUrl} alt="" />
                  <AddPhoto />
               </AvatarGroupStyle>
            </Stack>
         </IconButton>
         <div>
            <DivStyle>Нажмите или перетащите файл</DivStyle>
            <P>Минимальное разрешение 450x600</P>
         </div>
      </ContainerFile>
   )
}
export default AvatarUpload
const AvatarGroupStyle = styled(Avatar)`
   width: 88px;
   height: 88px;
   border-radius: 8px;
`
const ContainerFile = styled('div')`
   display: flex;
   align-items: center;
   gap: 20px;
`
const DivStyle = styled('p')`
   font-family: Manrope;
   font-size: 14px;
   font-weight: 400;
   line-height: 20px;
   letter-spacing: 0em;
   text-align: left;
   color: #4d4e51;
`
const P = styled('p')`
   width: 124px;
   height: 34px;
   margin-top: 8px;
   font-family: Manrope;
   font-size: 12px;
   font-weight: 400;
   line-height: 17px;
   letter-spacing: 0em;
   text-align: left;
   color: #959595;
`
