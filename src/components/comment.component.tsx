import { Box } from '@mui/material'
import { Date } from '../common/utils/date'
import { calculateDate } from '../common/utils/moment'

interface Props {
  comment: IComment
}

export interface IComment {
  id: number
  account_id: number
  nickname: string
  content: string
  created_at: Date
  updated_at: Date
}

const Comment = ({ comment }: Props) => {
  return (
    <Box>
      <Box>{comment.content}</Box>
      <Box>{comment.nickname}</Box>
      <Box>{calculateDate(comment.created_at)}</Box>
    </Box>
  )
}
export default Comment
