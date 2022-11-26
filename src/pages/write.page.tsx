import { Box, Button, Grid, InputBase, Stack } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from '../common/utils/popup'
import ConfirmModal from '../components/modals/confirm.modal'
import { useNavigate } from 'react-router-dom'
import { requestGet, requestPatch, requestPost } from '../services/request'
import Tag from '../components/tag.component'
import { useSelector } from 'react-redux'
import { AuthState } from '../store/slices/auth.slice'
import { ArticleDetail } from './article.page'
import { decryptAES, encryptAES } from '../common/utils/aes'
import PreviewInputSet from '../components/preview-input.component'

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
  const [articleId, setArticleId] = useState<number | null>(null)

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTag = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTagTemp(e.target.value)
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      if (e.code === 'Enter') {
        e.preventDefault()
        if (tag_temp) {
          setTags((tags) => Array.from(new Set([...tags, tag_temp])))
          setTagTemp('')
        }
      } else if (e.code === 'Backspace' && tag_temp === '') {
        e.preventDefault()
        setTags((tags) => [...tags.slice(0, tags.length - 1)])
      }
    }
  }

  const handleCancelModal = () => {
    setCancelModal(true)
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
        toast.success('수정이 완료되었습니다.')
        return navigate(`/article?id=${encryptAES(`${articleId}`)}`)
      }
    } else {
      const response = await requestPost('/article', body)
      if (response) {
        toast.success('작성이 완료되었습니다.')
        return navigate(`/`)
      }
    }
  }

  const onCreated = useCallback(
    async (article_id: number) => {
      const response: ArticleDetail = await requestGet(`/article/${article_id}`)
      if (!response || response.account_id !== id) {
        toast.error('권한이 없습니다.')
        return navigate('/')
      }
      setTitle(response.title)
      setTags(response.tags)
      setContent(response.content)
      setArticleId(response.id)
    },
    [id, navigate]
  )

  useEffect(() => {
    if (!role || role !== 'admin') {
      toast.error('권한이 없습니다.')
      return navigate('/')
    }
    if (encrypted_article_id) {
      const article_id = decryptAES(encrypted_article_id)
      onCreated(+article_id)
    }
  }, [encrypted_article_id, onCreated, navigate, role])

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
            <PreviewInputSet state={content} setState={setContent} />
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

      <ConfirmModal
        open={cancelModal}
        onClose={() => setCancelModal(false)}
        message="취소하시겠습니까?"
        fn={() => navigate('/')}
      />
    </Box>
  )
}

export default WritePage
