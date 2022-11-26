import { Box, Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Markdown from '../components/markdown.component'
import { requestGet, requestPatch } from '../services/request'
import { AuthState } from '../store/slices/auth.slice'
import { toast } from '../common/utils/popup'
import ConfirmModal from '../components/modals/confirm.modal'
import PreviewInputSet from '../components/preview-input.component'

interface Profile {
  content: string
}

const AboutPage = () => {
  const { role } = useSelector(AuthState)

  const [edit, setEdit] = useState<boolean>(false)

  const [profile, setProfile] = useState<Profile | null>(null)
  const [content, setContent] = useState('')

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

  const getProfile = async () => {
    const response = await requestGet('/profile')
    setProfile(response)
  }

  const submitUpdate = async () => {
    if (!edit) return
    const response = await requestPatch('/profile', { content })
    if (response) {
      setProfile((profile) => ({ ...profile, content }))
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
                <PreviewInputSet state={content} setState={setContent} />
              ) : (
                <Markdown content={profile.content} />
              )
            ) : null}
          </Box>
        </Grid>
        <Grid item md={3} />
      </Grid>

      <ConfirmModal
        open={cancelModal}
        onClose={() => setCancelModal(false)}
        message="취소하시겠습니까?"
        fn={cancelEdit}
      />
    </Box>
  )
}

export default AboutPage
