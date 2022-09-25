import { Box, Grid, Stack, Typography } from '@mui/material'
import { calculateDate } from '../common/utils/moment'
import Nickname from './nickname.component'
import Tag from './tag.component'

interface Props {
  article: IArticle
}

export interface IArticle {
  id: number
  account_id: number
  nickname: string
  title: string
  created_at: Date
  updated_at: Date
  tags: string[]
}

const Article = ({ article }: Props) => {
  return (
    <Box width="100%" padding={2}>
      <Stack spacing={2}>
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
        <Grid container>
          {article.tags.map((tag, i) => {
            return (
              <Grid item key={i} mr={1}>
                <Tag tag={tag} clickable />
              </Grid>
            )
          })}
        </Grid>
        <Box display="flex">
          <Typography sx={{ mr: 2 }}>{calculateDate(article.updated_at)}</Typography>
          <Nickname account_id={article.account_id} nickname={article.nickname} />
        </Box>
      </Stack>
    </Box>
  )
}

export default Article
