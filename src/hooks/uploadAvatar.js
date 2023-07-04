import { useState, useRef } from 'react'
import { toast } from 'react-toastify'

export const useUploadAvatar = () => {
   const [avatarUrl, setAvatarUrl] = useState('')
   const [dimensions, setDimensions] = useState([])
   const fileInputRef = useRef(null)

   const handleAvatarChange = (event) => {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
         const img = new Image()
         img.src = reader.result
         img.onload = () => {
            if (img.naturalWidth > 450 && img.naturalHeight > 600) {
               setDimensions([img.naturalWidth, img.naturalHeight])
               setAvatarUrl(reader.result)
            } else {
               toast.warning('width should be min 450!')
            }
         }
      }

      reader.readAsDataURL(file)
   }

   return [avatarUrl, handleAvatarChange, fileInputRef, dimensions]
}
