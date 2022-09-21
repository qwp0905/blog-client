import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Stack,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image'
import { toast } from '../common/utils/popup'
import Confirm from '../components/modals/confirm.modal'
import { useNavigate } from 'react-router-dom'

const WritePage = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag_temp, setTagTemp] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [cancelModal, setCancelModal] = useState(false)

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTag = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTagTemp(e.target.value)
  }

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      if (e.code === 'Enter') {
        e.preventDefault()
        setTags(Array.from(new Set([...tags, tag_temp])))
        setTagTemp('')
      } else if (e.code === 'Backspace' && tag_temp === '') {
        e.preventDefault()
        setTags([...tags.slice(0, tags.length - 1)])
      }
    }
  }

  const tapKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      if (e.code === 'Tab') {
        e.preventDefault()
        setContent(content + '  ')
      }
    }
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0]
    if (!image.type.match(/^image/)) {
      toast.error('올바른 형식의 이미지를 업로드해주세요.')
    } else if (image.size > 10 * 1000 * 1000) {
      toast.error('10MB 이하의 이미지를 업로드해주세요.')
    } else {
      const form = new FormData()
      form.append('file', image)
    }
    e.target.files = null
  }

  const handleCancelModal = () => {
    setCancelModal(true)
  }

  const handleCancel = () => {
    return navigate('/')
  }

  return (
    <Box pt={5}>
      <Grid container>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputBase
              placeholder="제목을 입력하세요."
              sx={{ fontSize: 30, padding: 1 }}
              onChange={handleTitle}
              value={title}
            />
            <Grid container rowSpacing={1}>
              {tags.map((t, i) => (
                <Grid item key={i}>
                  <Box
                    borderRadius={1}
                    display="flex"
                    justifyContent="center"
                    bgcolor="ButtonHighlight"
                    p={0.3}
                    pr={0.9}
                    pl={0.9}
                    mr={1}
                  >
                    <Typography color="primary" fontSize={15}>
                      {t}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              <Grid item sx={{ width: '100%' }}>
                <InputBase
                  placeholder="태그를 입력하세요."
                  value={tag_temp}
                  onChange={handleTag}
                  onKeyDown={addTag}
                  multiline
                  fullWidth
                  sx={{ padding: 1 }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <IconButton
                  size="small"
                  color="inherit"
                  component="label"
                  htmlFor="image-upload"
                >
                  <ImageIcon />
                </IconButton>
                <input id="image-upload" type="file" hidden onChange={handleImage} />
              </Grid>
            </Grid>
            <InputBase
              placeholder="내용을 입력하세요."
              onChange={handleContent}
              value={content}
              multiline
              rows={20}
              sx={{ padding: 1 }}
              onKeyDown={tapKey}
            />
            <Box display="flex" flexDirection="row-reverse">
              <Button variant="outlined" onClick={handleCancelModal}>
                취소
              </Button>
              <Button variant="contained" sx={{ mr: 1 }}>
                제출
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={3} />
      </Grid>
      <Confirm
        open={cancelModal}
        onClose={() => setCancelModal(false)}
        message="취소하시겠습니까?"
        fn={handleCancel}
      />
    </Box>
  )
}

export default WritePage
