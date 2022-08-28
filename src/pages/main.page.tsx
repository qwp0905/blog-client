import { Box, Container, Grid, Stack } from '@mui/material'
import React from 'react'
import Article from '../components/article.component'

const MainPage = () => {
  return (
    <Container maxWidth="md">
      <Box pt={8}>
        <Stack spacing={2}>
          {/* <Grid container spacing={2}>
            <Grid xs={4} item></Grid>
            <Grid xs={4} item>
              123
            </Grid>
            <Grid xs={4} item>
              123
            </Grid>
          </Grid> */}
        </Stack>
      </Box>
      <Article />
    </Container>
  )
}

export default MainPage
