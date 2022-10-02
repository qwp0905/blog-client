import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import { encryptAES } from '../common/utils/aes'
import { calculateDate } from '../common/utils/moment'
import Nickname from './nickname.component'
import Tag from './tag.component'
import View from './view.component'
import Heart from './heart.component'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import { computeCount } from '../common/utils/count'

interface Props {
  article: IArticle
}

export interface IArticle {
  id: number
  account_id: number
  nickname: string
  title: string
  views: number
  heart: number
  comments: number
  created_at: Date
  updated_at: Date
  tags: string[]
}

const Article = ({ article }: Props) => {
  return (
    <Box width="100%" padding={2}>
      <Stack>
        <Box
          component="a"
          href={`/article?id=${encryptAES(`${article.id}`)}`}
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
        <Grid container mt={2}>
          {article.tags.map((tag, i) => {
            return (
              <Grid item key={i} mr={1} mb={1}>
                <Tag tag={tag} clickable />
              </Grid>
            )
          })}
        </Grid>
        <Box display="flex" mt={1}>
          <Box display="flex" alignItems="center">
            <Typography sx={{ mr: 2 }}>{calculateDate(article.created_at)}</Typography>
          </Box>
          <Box sx={{ mr: 2 }} display="flex" alignItems="center">
            <Nickname account_id={article.account_id} nickname={article.nickname} />
          </Box>
          <View count={article.views} />
          <Heart count={article.heart} article_id={article.id} />
          <Box display="flex" alignItems="center">
            <IconButton disabled sx={{ mr: -0.7 }}>
              <CommentOutlinedIcon color="inherit" fontSize="small" />
            </IconButton>
            <Typography color="GrayText" fontSize="small">
              {computeCount(article.comments)}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default Article
