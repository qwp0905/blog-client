import React, { useCallback, useEffect, useState } from 'react'
import { Box, Divider, Grid, List, ListItem, Stack, useMediaQuery } from '@mui/material'
import Article, { IArticle } from '../components/article.component'
import { requestGet } from '../services/request'
import SideBar from '../components/sidebar.component'
import { PAGE_LIMIT } from '../common/constants/page'
import { decryptAES } from '../common/utils/aes'
import { toast } from '../common/utils/popup'
import { useNavigate } from 'react-router-dom'
import Profile from '../components/profile.component'

const MainPage = () => {
  const url = new URL(window.location.href)
  const encrypted_account_id = url.searchParams.get('id') as string
  const tag = url.searchParams.get('tag') as string

  const navigate = useNavigate()

  const [articles, setArticles] = useState<IArticle[]>([])
  const [page, setPage] = useState(1)
  const [scrollEnd, setScrollEnd] = useState(false)

  const is_pc = useMediaQuery('(min-width: 900px)')

  const getArticles = async (page: number) => {
    if (encrypted_account_id && !+decryptAES(encrypted_account_id)) {
      toast.error('존재하지 않는 유저입니다.')
      return navigate('/')
    }

    const response: IArticle[] = await requestGet(
      `/article?page=${page}` +
        ((tag && `&tag=${tag}`) || '') +
        ((encrypted_account_id && `&id=${decryptAES(encrypted_account_id)}`) || '')
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
      getArticles(page)
    }
  }, [page])

  return (
    <Stack>
      {encrypted_account_id && <Profile account_id={+decryptAES(encrypted_account_id)} />}
      <Grid container>
        <Grid item md={2}>
          {is_pc ? <SideBar account_id={encrypted_account_id} /> : null}
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
    </Stack>
  )
}

export default MainPage
