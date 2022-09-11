import React from 'react'
import { Box, Container, Grid, Stack } from '@mui/material'
import Article from '../components/article.component'

const MainPage = () => {
  const arr = new Array(10).fill('')
  return (
    <Container maxWidth="md">
      <Box pt={10}>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            {arr.map((e, i) => {
              return (
                <Grid key={i} xs={12} md={4} display="flex" justifyContent="center" item>
                  <Article />
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
