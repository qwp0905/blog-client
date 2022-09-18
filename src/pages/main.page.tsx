import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, List, ListItem, useMediaQuery } from '@mui/material'
import Article, { IArticle } from '../components/article.component'
import { getJson } from '../services/request'
import SideBar from '../components/sidebar.component'
import { useSelector } from 'react-redux'
import { AuthState } from '../store/slices/auth.slice'

const MainPage = () => {
  const { id: user_id } = useSelector(AuthState)

  const [articles, setArticles] = useState<IArticle[]>([])

  const is_pc = useMediaQuery('(min-width: 900px)')

  const onCreated = async () => {
    const response: IArticle[] = await getJson('/article')
    if (response) {
      setArticles([...articles, ...response])
    }
  }

  useEffect(() => {
    onCreated()
  }, [])

  return (
    <Box pt={10}>
      <Grid container>
        <Grid item md={2}>
          {user_id && is_pc ? <SideBar user_id={user_id} /> : null}
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
