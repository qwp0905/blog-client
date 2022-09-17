import { Image } from '@mui/icons-material'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Tag from './tag.component'

interface Props {
  article: IArticle
}

export interface IArticle {
  id: number
  user_id: number
  nickname: string
  title: string
  created_at: string
  updated_at: string
  tags: string[]
}

const Article = ({ article }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ width: 250, height: 280, border: '1px solid black' }}
    >
      <Stack spacing={1}>
        <Box
          component="a"
          href={`/article?id=${article.id}`}
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
            href={`/article?id=${article.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {article.title}
          </Typography>
        </Box>
        <Grid container>
          {article.tags.map((tag) => {
            return (
              <Grid item mr={1}>
                <Tag tag={tag} size="xs" />
              </Grid>
            )
          })}
        </Grid>
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
