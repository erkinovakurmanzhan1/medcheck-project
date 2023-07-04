import styled from '@emotion/styled'
import { Avatar, IconButton, Stack } from '@mui/material'
// import { useUploadAvatar } from '../../hooks/uploadAvatar'
import { ReactComponent as AddPhoto } from '../../assets/icons/AddPhoto.svg'

const AvatarUpload = ({ photo, onChange, ...rest }) => {
   // const [avatarUrl, handleAvatarChange] = useUploadAvatar()
   return (
      <IconButton
         {...rest}
         color="primary"
         aria-label="upload picture"
         component="label"
      >
         <input hidden accept="image/*" type="file" onChange={onChange} />
         <Stack direction="row" spacing={2}>
            <AvatarGroupStyle sx={{ bgcolor: '#E2E4E8' }} variant="rounded">
               <img src={photo} alt="" />
               <AddPhoto />
            </AvatarGroupStyle>
         </Stack>
      </IconButton>
   )
}
export default AvatarUpload
const AvatarGroupStyle = styled(Avatar)`
   width: 140px;
   height: 140px;
   border-radius: 100px;
`
