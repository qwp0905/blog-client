import { Box, Container, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Markdown from '../components/markdown.component'
import { getJson } from '../services/request'

interface ArticleDetail {
  id: number
  user_id: number
  nickname: string
  title: string
  content: string
  updated_at: string
}

const ArticlePage = () => {
  const url = new URL(window.location.href)
  const article_id = url.searchParams.get('id') as string

  const [detail, setDetail] = useState<ArticleDetail | null>(null)

  const onCreated = async () => {
    const response: ArticleDetail = await getJson(`article/${article_id}`)
    setDetail(response)
  }

  useEffect(() => {
    onCreated()
  }, [])

  return (
    <Box pt={8} display="flex" justifyContent="center">
      <Container maxWidth="sm">
        {(detail && (
          <Stack spacing={1}>
            <Box>{detail.title}</Box>
            <Box>{detail.nickname}</Box>
            <Box>{detail.updated_at}</Box>
            <Markdown content={detail.content} />
          </Stack>
        )) || <Box></Box>}
      </Container>
    </Box>
  )
}
export default ArticlePage
