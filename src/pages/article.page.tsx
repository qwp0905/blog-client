import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { decryptAES, encryptAES } from '../common/utils/aes'
import { calculateDate } from '../common/utils/moment'
import { toast } from '../common/utils/popup'
import CommentList from '../components/comment-list.component'
import Heart from '../components/heart.component'
import Markdown from '../components/markdown.component'
import ConfirmModal from '../components/modals/confirm.modal'
import Tag from '../components/tag.component'
import View from '../components/view.component'
import { requestDelete, requestGet, requestPatch } from '../services/request'
import { AuthState } from '../store/slices/auth.slice'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import { computeCount } from '../common/utils/count'

export interface ArticleDetail {
  id: number
  account_id: number
  nickname: string
  title: string
  views: number
  heart: number
  comments: number
  content: string
  created_at: Date
  updated_at: Date
  tags: string[]
}

const ArticlePage = () => {
  const url = new URL(window.location.href)
  const encrypted_article_id = url.searchParams.get('id') as string

  const navigate = useNavigate()

  const { id } = useSelector(AuthState)

  const [detail, setDetail] = useState<ArticleDetail | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)

  const onCreated = useCallback(
    async (article_id: number) => {
      const response: ArticleDetail = await requestGet(`/article/${article_id}`)
      if (!response) navigate('/')
      setDetail(response)
      if (id) {
        await requestPatch(`/article/lookup/${article_id}`)
      }
    },
    [id, navigate]
  )

  const handleDeleteModal = () => {
    if (detail?.account_id !== id) {
      return toast.error('권한이 없습니다.')
    }
    setDeleteModal(true)
  }

  const handleDelete = (encrypted: string) => async () => {
    const article_id = decryptAES(encrypted)
    const response = await requestDelete(`/article/${article_id}`)
    if (response) {
      toast.success('삭제되었습니다.')
      return navigate('/')
    }
  }

  useEffect(() => {
    const article_id = decryptAES(encrypted_article_id)
    if (!+article_id) {
      toast.error('존재하지 않는 게시물입니다.')
      return navigate('/')
    }
    onCreated(+article_id)
  }, [encrypted_article_id, navigate, onCreated])

  return (
    <Box pt={5} display="flex" justifyContent="center">
      <Grid container>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          {(detail && (
            <Stack spacing={1}>
              <Box>
                <Typography fontSize={32}>{detail.title}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <Box display="flex" alignItems="center">
                    <Typography mr={1}>{calculateDate(detail.created_at)}</Typography>
                  </Box>
                  <Heart
                    article_id={detail.id}
                    count={detail.heart}
                    clickable
                    size="medium"
                  />
                </Box>
                <Box display="flex">
                  <View count={detail.views} />
                  <Box display="flex" alignItems="center">
                    <IconButton disabled sx={{ mr: -0.7 }}>
                      <CommentOutlinedIcon color="inherit" fontSize="small" />
                    </IconButton>
                    <Typography color="GrayText" fontSize="small">
                      {computeCount(detail.comments)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Grid container pt={1} pb={1}>
                {detail.tags.map((tag, i) => {
                  return (
                    <Grid item mr={1} mb={1} key={i}>
                      <Tag tag={tag} clickable />
                    </Grid>
                  )
                })}
              </Grid>
              <Divider />
              {id === detail.account_id ? (
                <Box display="flex" flexDirection="row-reverse">
                  <Box display="flex">
                    <Box
                      component="a"
                      href={`/write?id=${encryptAES(decryptAES(encrypted_article_id))}`}
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        ':hover': { cursor: 'pointer', opacity: 0.8 }
                      }}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      mr={1}
                    >
                      수정
                    </Box>
                    <Box
                      sx={{ ':hover': { cursor: 'pointer', opacity: 0.8 } }}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      component="label"
                      htmlFor="delete-article"
                    >
                      삭제
                    </Box>
                    <Button
                      id="delete-article"
                      onClick={handleDeleteModal}
                      sx={{ display: 'none' }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box />
              )}
              <Box padding={2}>
                <Markdown content={detail.content} />
              </Box>
              <Divider />
              <CommentList article_id={detail.id} />
            </Stack>
          )) || <Box />}
        </Grid>
        <Grid item md={3} />
      </Grid>
      <ConfirmModal
        open={deleteModal}
        message="삭제하시겠습니까?"
        onClose={() => setDeleteModal(false)}
        fn={handleDelete(encrypted_article_id)}
      />
    </Box>
  )
}
export default ArticlePage
