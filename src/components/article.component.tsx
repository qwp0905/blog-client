import { Box, Grid, Typography } from '@mui/material'
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
  const calculateDate = (date: string) => {
    const date_num = +new Date(date)
    const now = +new Date()
    return Math.floor((now - date_num) / (24 * 60 * 60 * 1000))
  }

  return (
    <Box width="100%" padding={1}>
      <Grid container spacing={1} columns={18}>
        <Grid xs={18} item>
          <Box
            component="a"
            href={`/article?id=${article.id}`}
            sx={{
              width: '100%',
              ':hover': {
                cursor: 'pointer',
                opacity: 0.7
              },
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Typography variant="h5">{article.title}</Typography>
          </Box>
        </Grid>
        <Grid xs={18} item>
          <Grid container>
            {article.tags.map((tag, i) => {
              return (
                <Grid item key={i} mr={1}>
                  <Tag tag={tag} size="mn" />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid xs={6} md={3} lg={1.5} item>
          <Typography>{`${calculateDate(article.updated_at)}일 전`}</Typography>
        </Grid>
        <Grid xs={6} md={3} lg={1.5} item>
          <Typography
            component="a"
            href={`/?id=${article.user_id}`}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              ':hover': { cursor: 'pointer', opacity: 0.7 }
            }}
          >
            {article.nickname}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Article
