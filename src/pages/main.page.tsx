import React, { useCallback, useEffect, useState } from 'react'
import { Box, Divider, Grid, List, ListItem, useMediaQuery } from '@mui/material'
import Article, { IArticle } from '../components/article.component'
import { getJson } from '../services/request'
import SideBar from '../components/sidebar.component'
import { PAGE_LIMIT } from '../common/constants/page'

const MainPage = () => {
  const url = new URL(window.location.href)
  const account_id = url.searchParams.get('id') as string
  const tag = url.searchParams.get('tag') as string

  const [articles, setArticles] = useState<IArticle[]>([])
  const [page, setPage] = useState(1)
  const [scrollEnd, setScrollEnd] = useState(false)

  const is_pc = useMediaQuery('(min-width: 900px)')

  const getArticles = async (page: number, tag?: string) => {
    const response: IArticle[] = await getJson(
      `/article?page=${page}` +
        ((tag && `&tag=${tag}`) || '') +
        ((account_id && `&id=${account_id}`) || '')
    )
    if (response) {
      setArticles([...articles, ...response.slice(0, PAGE_LIMIT)])
      if (response.length < PAGE_LIMIT) {
        setScrollEnd(true)
      }
    }
  }

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window
    const { scrollHeight, scrollTop } = document.documentElement

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
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
      getArticles(page, tag || undefined)
    }
  }, [page])

  return (
    <Box>
      <Grid container>
        <Grid item md={2}>
          {is_pc ? <SideBar account_id={account_id} /> : null}
        </Grid>
        <Grid item xs={12} md={8}>
          <List>
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
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Box>
  )
}

export default MainPage
