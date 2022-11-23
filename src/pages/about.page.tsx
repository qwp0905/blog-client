import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Input,
  InputBase,
  Stack,
  Tab,
  Tabs,
  TextField
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Markdown from '../components/markdown.component'
import { requestForm, requestGet, requestPatch } from '../services/request'
import { AuthState } from '../store/slices/auth.slice'
import ImageIcon from '@mui/icons-material/Image'
import AddLinkIcon from '@mui/icons-material/AddLink'
import { toast } from '../common/utils/popup'
import { load } from '../common/utils/loading'
import { Date } from '../common/utils/date'
import Confirm from '../components/modals/confirm.modal'

interface Profile {
  content: string
}

const AboutPage = () => {
  const { role } = useSelector(AuthState)

  const [edit, setEdit] = useState<boolean>(false)
  const [mode, setMode] = useState('write')

  const [profile, setProfile] = useState<Profile | null>(null)
  const [content, setContent] = useState('')

  const [linkModal, setLinkModal] = useState(false)
  const [link, setLink] = useState('')

  const [cancelModal, setCancelModal] = useState(false)

  const openEdit = () => {
    if (profile) {
      setContent(profile.content)
      setEdit(true)
    }
  }

  const cancelEdit = () => {
    setEdit(false)
  }

  const handleMode = (e: React.SyntheticEvent, newValue: string) => {
    setMode(newValue)
  }

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      if (e.code === 'Tab') {
        e.preventDefault()
        const start = e.currentTarget.selectionStart as number
        const end = e.currentTarget.selectionEnd as number
        setContent(content.slice(0, start) + '    ' + content.slice(end, content.length))
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
        const response = await requestForm('/upload', file)
        if (response) {
          setContent(`${content}\n![${Date()}](${response})  \n`)
        }
        load.end()
      }
      e.target.files = null
    }
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

  const getProfile = async () => {
    const response = await requestGet('/profile')
    setProfile(response)
  }

  const submitUpdate = async () => {
    if (!edit) return
    const response = await requestPatch('/profile', { content })
    if (response) {
      setProfile({ ...profile, content })
      toast.success('성공적으로 수정되었습니다.')
      return window.location.reload()
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <Box>
      <Grid container>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          {role === 'admin' ? (
            <Box padding={2} display="flex" flexDirection="row-reverse">
              {edit ? (
                <Box display="flex">
                  <Button onClick={() => setCancelModal(true)} sx={{ mr: 1 }}>
                    취소
                  </Button>
                  <Button onClick={submitUpdate} variant="contained">
                    제출
                  </Button>
                </Box>
              ) : (
                <Button variant="contained" onClick={openEdit}>
                  수정
                </Button>
              )}
            </Box>
          ) : null}
          <Box mt={1}>
            {profile ? (
              edit ? (
                <Stack spacing={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Tabs value={mode} onChange={handleMode}>
                        <Tab value="write" label="WRITE" />
                        <Tab value="preview" label="PREVIEW" />
                      </Tabs>
                    </Box>
                    <Box display="flex">
                      <Box display="flex" alignItems="center" mr={1}>
                        <IconButton
                          size="small"
                          color="inherit"
                          component="label"
                          htmlFor="image-upload"
                        >
                          <ImageIcon />
                        </IconButton>
                        <Input
                          id="image-upload"
                          type="file"
                          sx={{ display: 'none' }}
                          onChange={handleImage}
                        />
                      </Box>
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={openLinkModal} size="small" color="inherit">
                          <AddLinkIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  {mode === 'write' ? (
                    <InputBase
                      value={content}
                      placeholder="내용을 입력해주세요"
                      multiline
                      onChange={handleContent}
                      fullWidth
                      rows={20}
                      sx={{
                        padding: 2,
                        border: '1px solid',
                        borderColor: 'ButtonHighlight',
                        borderRadius: 1
                      }}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <Box
                      sx={{
                        padding: 2,
                        border: '1px solid',
                        borderColor: 'ButtonHighlight',
                        borderRadius: 1
                      }}
                    >
                      <Markdown content={content} />
                    </Box>
                  )}
                </Stack>
              ) : (
                <Markdown content={profile.content} />
              )
            ) : null}
          </Box>
        </Grid>
        <Grid item md={3} />
      </Grid>

      <Confirm
        open={cancelModal}
        onClose={() => setCancelModal(false)}
        message="취소하시겠습니까?"
        fn={cancelEdit}
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

export default AboutPage
