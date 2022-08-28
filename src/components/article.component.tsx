import { Box } from '@mui/material'

const Article = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ width: 250, height: 300, border: '2px solid black' }}
    >
      <Box sx={{ width: 230, height: 180, border: '2px solid black', mt: 2 }}>
        123
      </Box>
    </Box>
  )
}

export default Article
