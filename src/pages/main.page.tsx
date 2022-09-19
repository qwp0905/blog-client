import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, List, ListItem, useMediaQuery } from '@mui/material'
import Article, { IArticle } from '../components/article.component'
import { getJson } from '../services/request'
import SideBar from '../components/sidebar.component'

const MainPage = () => {
  const url = new URL(window.location.href)
  const user_id = url.searchParams.get('id') as string

  const [articles, setArticles] = useState<IArticle[]>([])
  const [target, setTarget] = useState<string | null>(null)

  const is_pc = useMediaQuery('(min-width: 900px)')

  const getArticles = async (page: number, tag?: string) => {
    const response: IArticle[] = await getJson(
      `/article?page=${page}` +
        ((tag && `&tag=${tag}`) || '') +
        ((user_id && `&id=${user_id}`) || '')
    )
    if (response) {
      setArticles([...response])
    }
  }

  useEffect(() => {
    getArticles(1, target || undefined)
  }, [target])

  return (
    <Box pt={10}>
      <Grid container>
        <Grid item md={2}>
          {is_pc ? <SideBar target={setTarget} user_id={user_id} /> : null}
        </Grid>
        <Grid item xs={12} md={8}>
          <List>
            {articles.map((e, i) => {
              return (
                <Box key={`${i}`}>
                  <ListItem>
                    <Article article={e} />
                  </ListItem>
                  <Divider />
                </Box>
              )
            })}
          </List>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </Box>
  )
}

export default MainPage
