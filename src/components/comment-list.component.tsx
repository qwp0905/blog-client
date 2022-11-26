import { Box, Button, Divider, Stack } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from '../common/utils/popup'
import { requestGet, requestPost } from '../services/request'
import { AuthState } from '../store/slices/auth.slice'
import Comment, { IComment } from './comment.component'
import InfinityScrollList from './infinity-scroll-list.component'
import MarkdownInput from './markdown-input.component'
import ConfirmModal from './modals/confirm.modal'

interface Props {
  article_id: number
}

const CommentList = ({ article_id }: Props) => {
  const navigate = useNavigate()

  const { id } = useSelector(AuthState)

  const [comments, setComments] = useState<IComment[]>([])
  const [commentTemp, setCommentTemp] = useState('')
  const [checkLoginModal, setCheckLoginModal] = useState(false)
  const [onlyOneUpdate, setOnlyOneUpdate] = useState(false)

  const getComments = useCallback(
    async (page: number) => {
      return await requestGet(`/comment?article_id=${article_id}&page=${page}`)
    },
    [article_id]
  )

  const submitComment = async () => {
    if (!id) {
      return setCheckLoginModal(true)
    }

    if (!commentTemp) {
      return toast.error('댓글을 입력해주세요.')
    }

    const response = await requestPost('/comment', { article_id, content: commentTemp })
    if (response) {
      toast.success('댓글이 작성되었습니다.')
      return window.location.reload()
    }
  }

  return (
    <Stack id="comment-list">
      <Box padding={2} border="1px solid" borderColor="ButtonHighlight" borderRadius={1}>
        <MarkdownInput
          state={commentTemp}
          setState={setCommentTemp}
          placeholder="댓글을 입력하세요."
          multiline
          rows={2}
          fullWidth
        />
        <Box display="flex" flexDirection="row-reverse">
          <Button onClick={submitComment} variant="contained">
            제출
          </Button>
        </Box>
      </Box>
      <InfinityScrollList
        setList={setComments}
        getItems={getComments}
        sx={{ mt: 1 }}
        children={comments.map((comment, i) => {
          return (
            <Box key={i}>
              <Comment
                onlyOneUpdate={onlyOneUpdate}
                setOnlyOneUpdate={setOnlyOneUpdate}
                comment={comment}
              />
              <Divider />
            </Box>
          )
        })}
      />

      <ConfirmModal
        open={checkLoginModal}
        onClose={() => setCheckLoginModal(false)}
        message="로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        fn={() => navigate('/login')}
      />
    </Stack>
  )
}
export default CommentList
