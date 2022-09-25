import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputBase,
  Stack,
  TextField
} from '@mui/material'
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image'
import AddLinkIcon from '@mui/icons-material/AddLink'
import { toast } from '../common/utils/popup'
import Confirm from '../components/modals/confirm.modal'
import { useNavigate } from 'react-router-dom'
import { formJson, postJson } from '../services/request'
import { load } from '../common/utils/loading'
import Tag from '../components/tag.component'

const WritePage = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag_temp, setTagTemp] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [cancelModal, setCancelModal] = useState(false)
  const [linkModal, setLinkModal] = useState(false)
  const [link, setLink] = useState('')

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
        if (tag_temp && tag_temp.match(/^[0-9a-zA-Zㄱ-힣]*$/)) {
          setTags(Array.from(new Set([...tags, tag_temp])))
          setTagTemp('')
        }
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
        const response = await formJson('/upload', file)
        if (response) {
          setContent(
            content + '\n' + `![${new Date().toISOString()}](${response})  ` + '\n'
          )
        }
        load.end()
      }
      e.target.files = null
    }
  }

  const handleCancelModal = () => {
    setCancelModal(true)
  }

  const openLinkModal = () => {
    setLinkModal(true)
  }

  const closeLinkModal = () => {
    setLinkModal(false)
    setLink('')
  }

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const submitLink = () => {
    setContent(content + `  \n[${link}](${link})  \n`)
    closeLinkModal()
  }

  const handleCancel = () => {
    return navigate('/')
  }

  const submit = async () => {
    if (!title) {
      return toast.error('제목을 입력하세요.')
    }

    if (!tags.length) {
      return toast.error('태그를 등록하세요.')
    }

    if (!content) {
      return toast.error('내용을 입력하세요.')
    }
    const response = await postJson('/article', { title, tags, content })
    if (response) {
      navigate('/')
    }
  }

  return (
    <Box pt={5}>
      <Grid container>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputBase
              fullWidth
              placeholder="제목을 입력하세요."
              sx={{ fontSize: 30, padding: 1 }}
              onChange={handleTitle}
              value={title}
            />
            <Grid container spacing={1}>
              {tags.map((t, i) => (
                <Grid item key={i} display="flex" alignItems="center">
                  <Tag tag={t} />
                </Grid>
              ))}
              <Grid item flexGrow={1}>
                <InputBase
                  placeholder="엔터키로 태그를 입력하세요."
                  value={tag_temp}
                  onChange={handleTag}
                  onKeyDown={addTag}
                  multiline
                  fullWidth
                  sx={{ padding: 1 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
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
              <Grid item>
                <IconButton onClick={openLinkModal} size="small" color="inherit">
                  <AddLinkIcon />
                </IconButton>
              </Grid>
            </Grid>
            <InputBase
              placeholder="내용을 입력하세요."
              onChange={handleContent}
              value={content}
              multiline
              rows={20}
              sx={{
                padding: 2,
                border: '1px solid',
                borderColor: 'ButtonHighlight',
                borderRadius: 1
              }}
              onKeyDown={tapKey}
            />
            <Box display="flex" flexDirection="row-reverse">
              <Button variant="outlined" onClick={handleCancelModal}>
                취소
              </Button>
              <Button variant="contained" onClick={submit} sx={{ mr: 1 }}>
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
      <Dialog fullWidth={true} maxWidth="xs" open={linkModal} onClose={closeLinkModal}>
        <DialogContent>
          <TextField
            value={link}
            onChange={handleLink}
            fullWidth
            autoFocus
            variant="standard"
            label="link"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitLink}>입력</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WritePage
