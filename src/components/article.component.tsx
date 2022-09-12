import { Image } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {
  article: IArticle
}

export interface IArticle {
  id: number
  user_id: number
  nickname: string
  title: string
  created_at: string
}

const Article = ({ article }: Props) => {
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ width: 250, height: 260, border: '1px solid black' }}
    >
      <Stack spacing={1}>
        <Box
          component="a"
          href={`/article/${article.id}`}
          sx={{
            width: 230,
            height: 180,
            border: '1px solid black',
            mt: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <Image></Image>
        </Box>
        <Box>
          <Typography
            component="a"
            href={`/article/${article.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {article.title}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={7} display="flex" flexDirection="column" justifyContent="center">
            <Typography fontSize={13}>{article.nickname}</Typography>
          </Grid>
          <Grid
            item
            xs={5}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Typography fontSize={1}>{article.created_at}</Typography>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}

export default Article
