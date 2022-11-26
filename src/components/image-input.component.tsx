import React from 'react'
import ImageIcon from '@mui/icons-material/Image'
import { Box, BoxProps, IconButton, Input } from '@mui/material'
import { toast } from '../common/utils/popup'
import { load } from '../common/utils/loading'
import { requestForm } from '../services/request'
import { Date } from '../common/utils/date'

interface Props extends BoxProps {
  setState: React.Dispatch<React.SetStateAction<string>>
}

const ImageButton = ({ setState, ...props }: Props) => {
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const image = e.target.files[0]
      if (!image?.type.match(/^image/)) {
        toast.error('올바른 형식의 이미지를 업로드해주세요.')
      } else if (image.size > 5 * 1024 * 1024) {
        toast.error('5MB 이하의 이미지를 업로드해주세요.')
      } else {
        load.start()
        const file = new FormData()
        file.append('image', image)
        const response = await requestForm('/upload', file)
        if (response) {
          setState((state) => `${state}\n![${Date()}](${response})  \n`)
        }
        load.end()
      }
      e.target.files = null
    }
  }

  return (
    <Box {...props} display="flex" alignItems="center">
      <IconButton size="small" color="inherit" component="label" htmlFor="image-upload">
        <ImageIcon />
      </IconButton>
      <Input
        id="image-upload"
        type="file"
        sx={{ display: 'none' }}
        onChange={handleImage}
      />
    </Box>
  )
}

export default ImageButton
