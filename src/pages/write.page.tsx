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
import React, { useEffect, useState } from 'react'
import ImageIcon from '@mui/icons-material/Image'
import AddLinkIcon from '@mui/icons-material/AddLink'
import { toast } from '../common/utils/popup'
import Confirm from '../components/modals/confirm.modal'
import { useNavigate } from 'react-router-dom'
import { requestForm, requestGet, requestPatch, requestPost } from '../services/request'
import { load } from '../common/utils/loading'
import Tag from '../components/tag.component'
import { useSelector } from 'react-redux'
import { AuthState } from '../store/slices/auth.slice'
import { ArticleDetail } from './article.page'
import { decryptAES, encryptAES } from '../common/utils/aes'
import { Date } from '../common/utils/date'
import Markdown from '../components/markdown.component'

const WritePage = () => {
  const url = new URL(window.location.href)
  const encrypted_article_id = url.searchParams.get('id') as string

  const navigate = useNavigate()

  const { role, id } = useSelector(AuthState)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag_temp, setTagTemp] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [cancelModal, setCancelModal] = useState(false)
  const [linkModal, setLinkModal] = useState(false)
  const [link, setLink] = useState('')
  const [articleId, setArticleId] = useState<number | null>(null)
  const [mode, setMode] = useState('write')

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
        const response = await requestForm('/upload', file)
        if (response) {
          setContent(`${content}\n![${Date()}](${response})  \n`)
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

  const handlePreview = (e: React.SyntheticEvent, newValue: string) => {
    setMode(newValue)
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
    const body = { title, tags, content }
    if (articleId) {
      const response = await requestPatch(`/article/${articleId}`, body)
      if (response) {
        navigate(`/article?id=${encryptAES(`${articleId}`)}`)
      }
    } else {
      const response = await requestPost('/article', body)
      if (response) {
        navigate(`/`)
      }
    }
  }

  const onCreated = async (article_id: number) => {
    const response: ArticleDetail = await requestGet(`/article/${article_id}`)
    if (!response || response.account_id !== id) {
      toast.error('권한이 없습니다.')
      return navigate('/')
    }
    setTitle(response.title)
    setTags(response.tags)
    setContent(response.content)
    setArticleId(response.id)
  }

  useEffect(() => {
    if (!role || role !== 'admin') {
      toast.error('권한이 없습니다.')
      return navigate('/')
    }
    if (encrypted_article_id) {
      const article_id = decryptAES(encrypted_article_id)
      onCreated(+article_id)
    }
  }, [])

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
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Tabs value={mode} onChange={handlePreview}>
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
        fn={() => navigate('/')}
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
