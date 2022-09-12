import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Stack } from '@mui/material'
import Article, { IArticle } from '../components/article.component'
import { getJson } from '../services/request'

const MainPage = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const onCreated = async () => {
    const result: IArticle[] = await getJson('/article')
    if (result) {
      setArticles([...result])
    }
  }

  useEffect(() => {
    onCreated()
  }, [])

  return (
    <Container maxWidth="md">
      <Box pt={10}>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            {articles.map((e, i) => {
              return (
                <Grid key={i} xs={12} md={4} display="flex" justifyContent="center" item>
                  <Article article={e} />
                </Grid>
              )
            })}
          </Grid>
        </Stack>
      </Box>
    </Container>
  )
}

export default MainPage
