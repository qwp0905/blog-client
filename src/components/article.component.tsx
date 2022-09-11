import { Box, Grid, Stack } from '@mui/material'

const Article = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ width: 250, height: 300, border: '1px solid black' }}
    >
      <Stack>
        <Box sx={{ width: 230, height: 180, border: '1px solid black', mt: 2 }}>123</Box>
        <Box>
          <Grid container>
            <Grid item xs={6}>
              제목
            </Grid>
            <Grid item xs={6}>
              뭐하지
            </Grid>
            <Grid item xs={6}>
              시간?
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  )
}

export default Article
