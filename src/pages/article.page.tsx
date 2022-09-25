import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
                    <Grid item mr={1} key={i}>
                      <Tag tag={tag} size="mn" />
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
