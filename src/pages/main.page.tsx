import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material'
import Article, { IArticle } from '../components/article.component'
import { requestGet } from '../services/request'
import SideBar from '../components/sidebar.component'
import { PAGE_LIMIT } from '../common/constants/page'

const MainPage = () => {
  const url = new URL(window.location.href)
  const tag = url.searchParams.get('tag') as string

  const [articles, setArticles] = useState<IArticle[]>([])
  const [page, setPage] = useState(1)
  const [scrollEnd, setScrollEnd] = useState(false)

  const is_pc = useMediaQuery('(min-width: 900px)')

  const getArticles = async (page: number) => {
    const response: IArticle[] = await requestGet(
      `/article?page=${page}` + ((tag && `&tag=${tag}`) || '')
    )
    if (response) {
      setArticles([...articles, ...response.slice(0, PAGE_LIMIT)])
      if (response.length < PAGE_LIMIT) {
        setScrollEnd(true)
      }
    }
  }

  const handleScroll = useCallback((): void => {
    const { clientHeight, scrollHeight, scrollTop } = document.getElementById(
      'article_list'
    ) as HTMLElement

    if (Math.round(scrollTop + clientHeight) >= scrollHeight) {
      setPage(page + 1)
    }
  }, [page])

  useEffect(() => {
    if (!scrollEnd) {
      window.addEventListener('scroll', handleScroll, true)
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [])

  useEffect(() => {
    if (!scrollEnd) {
      getArticles(page)
    }
  }, [page])

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
            <List id="article_list">
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
            </List>
          </Stack>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Stack>
  )
}

export default MainPage
