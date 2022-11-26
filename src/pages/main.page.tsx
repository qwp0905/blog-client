import React, { useCallback, useState } from 'react'
import {
  Box,
  Divider,
  Grid,
  ListItem,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material'
import Article, { IArticle } from '../components/article.component'
import { requestGet } from '../services/request'
import SideBar from '../components/sidebar.component'
import InfinityScrollList from '../components/infinity-scroll-list.component'

const MainPage = () => {
  const url = new URL(window.location.href)
  const tag = url.searchParams.get('tag') as string

  const [articles, setArticles] = useState<IArticle[]>([])

  const is_pc = useMediaQuery('(min-width: 900px)')

  const getArticles = useCallback(
    async (page: number) => {
      return await requestGet(`/article?page=${page}` + ((tag && `&tag=${tag}`) || ''))
    },
    [tag]
  )

  return (
    <Stack>
      <Grid container>
        <Grid item md={2}>
          {is_pc ? (
            <Box mt={2}>
              <SideBar />
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack>
            <Box paddingX={3} pt={4} pb={2}>
              <Typography variant="h6"># {tag || '전체'}</Typography>
            </Box>
            <Divider />
            <InfinityScrollList setList={setArticles} getItems={getArticles}>
              {articles.map((e, i) => {
                return (
                  <Box key={i}>
                    <ListItem>
                      <Article article={e} />
                    </ListItem>
                    <Divider />
                  </Box>
                )
              })}
            </InfinityScrollList>
          </Stack>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Stack>
  )
}

export default MainPage
