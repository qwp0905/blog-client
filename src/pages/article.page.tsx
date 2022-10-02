import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { decryptAES, encryptAES } from '../common/utils/aes'
import { calculateDate } from '../common/utils/moment'
import { toast } from '../common/utils/popup'
import CommentList from '../components/comment-list.component'
import Heart from '../components/heart.component'
import Markdown from '../components/markdown.component'
import Confirm from '../components/modals/confirm.modal'
import Nickname from '../components/nickname.component'
import Tag from '../components/tag.component'
import View from '../components/view.component'
import { deleteJson, getJson } from '../services/request'
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

  const onCreated = async (article_id: number) => {
    const response: ArticleDetail = await getJson(`article/${article_id}`)
    if (!response) navigate('/')
    setDetail(response)
  }

  const handleDeleteModal = () => {
    if (detail?.account_id !== id) {
      return toast.error('권한이 없습니다.')
    }
    setDeleteModal(true)
  }

  const handleDelete = (encrypted: string) => async () => {
    const article_id = decryptAES(encrypted)
    const response = await deleteJson(`article/${article_id}`)
    if (response) {
      toast.success('삭제되었습니다.')
      return navigate('/')
    }
  }

  useEffect(() => {
    const article_id = decryptAES(encrypted_article_id)
    onCreated(+article_id)
  }, [])

  return (
    <Box pt={5} display="flex" justifyContent="center">
      <Grid container>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          {(detail && (
            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography fontSize={50}>{detail.title}</Typography>
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
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <Box mr={1} display="flex" alignItems="center">
                    <Nickname account_id={detail.account_id} nickname={detail.nickname} />
                  </Box>
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
                {id === detail.account_id ? (
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
                ) : (
                  <Box />
                )}
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
              <Box pt={5} pb={5}>
                <Markdown content={detail.content} />
              </Box>
              <Divider />
              <CommentList article_id={detail.id} />
            </Stack>
          )) || <Box></Box>}
        </Grid>
        <Grid item md={3} />
      </Grid>
      <Confirm
        open={deleteModal}
        message="삭제하시겠습니까?"
        onClose={() => setDeleteModal(false)}
        fn={handleDelete(encrypted_article_id)}
      />
    </Box>
  )
}
export default ArticlePage
