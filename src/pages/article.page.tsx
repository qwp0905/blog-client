import { Box, Container, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Markdown from '../components/markdown.component'
import Tag from '../components/tag.component'
import { getJson } from '../services/request'

interface ArticleDetail {
  id: number
  account_id: number
  nickname: string
  title: string
  content: string
  updated_at: string
  tags: string[]
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
            <Box>{detail.updated_at}</Box>
            <Markdown content={detail.content} />
            <Box>{detail.nickname}</Box>
            <Grid container>
              {detail.tags.map((tag, i) => {
                return (
                  <Grid item mr={1} key={i}>
                    <Tag tag={tag} size="mn" />
                  </Grid>
                )
              })}
            </Grid>
          </Stack>
        )) || <Box></Box>}
      </Container>
    </Box>
  )
}
export default ArticlePage
