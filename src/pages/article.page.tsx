import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { decryptAES } from '../common/utils/aes'
import { calculateDate } from '../common/utils/moment'
import Markdown from '../components/markdown.component'
import Nickname from '../components/nickname.component'
import Tag from '../components/tag.component'
import { getJson } from '../services/request'

interface ArticleDetail {
  id: number
  account_id: number
  nickname: string
  title: string
  content: string
  updated_at: Date
  tags: string[]
}

const ArticlePage = () => {
  const url = new URL(window.location.href)
  const encrypted_article_id = url.searchParams.get('id') as string

  const navigate = useNavigate()

  const [detail, setDetail] = useState<ArticleDetail | null>(null)

  const onCreated = async (article_id: number) => {
    const response: ArticleDetail = await getJson(`article/${article_id}`)
    setDetail(response)
  }

  useEffect(() => {
    try {
      const article_id = decryptAES(encrypted_article_id)
      onCreated(+article_id)
    } catch {
      navigate('/')
    }
  }, [])

  return (
    <Box pt={5} display="flex" justifyContent="center">
      <Grid container>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          {(detail && (
            <Stack spacing={1}>
              <Typography fontSize={50}>{detail.title}</Typography>
              <Box display="flex">
                <Nickname account_id={detail.account_id} nickname={detail.nickname} />
                <Typography ml={1}>{calculateDate(detail.updated_at)}</Typography>
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
            </Stack>
          )) || <Box></Box>}
        </Grid>
        <Grid item md={3} />
      </Grid>
    </Box>
  )
}
export default ArticlePage
