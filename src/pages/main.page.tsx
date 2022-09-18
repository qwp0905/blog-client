import React, { useEffect, useState } from 'react'
import { Box, Container, Divider, List, ListItem } from '@mui/material'
import Article, { IArticle } from '../components/article.component'
import { getJson } from '../services/request'

const MainPage = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const onCreated = async () => {
    const result: IArticle[] = await getJson('/article')
    if (result) {
      setArticles([...articles, ...result])
    }
  }

  useEffect(() => {
    onCreated()
  }, [])

  return (
    <Container maxWidth="md">
      <Box pt={10}>
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
      </Box>
    </Container>
  )
}

export default MainPage
