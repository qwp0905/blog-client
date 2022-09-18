import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

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
            component="label"
            htmlFor={`${article.id}`}
            sx={{ width: '100%', ':hover': { cursor: 'pointer', opacity: 0.7 } }}
          >
            <Typography variant="h5">{article.title}</Typography>
          </Box>
          <Button
            sx={{ display: 'none' }}
            id={`${article.id}`}
            onClick={() => navigate(`/article?id=${article.id}`)}
          />
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
        <Grid xs={1.5} item>
          {`${calculateDate(article.updated_at)}일 전`}
        </Grid>
        <Grid xs={1.5} item>
          {article.nickname}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Article
