import { Box, Button, Divider, InputBase, Stack } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PAGE_LIMIT } from '../common/constants/page'
import { toast } from '../common/utils/popup'
import { requestGet, requestPost } from '../services/request'
import { AuthState } from '../store/slices/auth.slice'
import Comment, { IComment } from './comment.component'
import Confirm from './modals/confirm.modal'

interface Props {
  article_id: number
}

const CommentList = ({ article_id }: Props) => {
  const navigate = useNavigate()

  const { id } = useSelector(AuthState)

  const [comments, setComments] = useState<IComment[]>([])
  const [page, setPage] = useState(1)
  const [scrollEnd, setScrollEnd] = useState(false)
  const [commentTemp, setCommentTemp] = useState('')
  const [checkLoginModal, setCheckLoginModal] = useState(false)
  const [onlyOneUpdate, setOnlyOneUpdate] = useState(false)

  const getComments = useCallback(
    async (page: number) => {
      const response: IComment[] = await requestGet(
        `/comment?article_id=${article_id}&page=${page}`
      )
      if (response) {
        setComments([...comments, ...response.slice(0, PAGE_LIMIT)])
        if (response.length < PAGE_LIMIT) {
          setScrollEnd(true)
        }
      }
    },
    [article_id, comments]
  )

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!id) {
      return setCheckLoginModal(true)
    }
    setCommentTemp(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing) {
      if (e.code === 'Tab') {
        e.preventDefault()
        const start = e.currentTarget.selectionStart as number
        const end = e.currentTarget.selectionEnd as number

        setCommentTemp(
          commentTemp.slice(0, start) +
            '    ' +
            commentTemp.slice(end, commentTemp.length)
        )

        e.currentTarget.setRangeText('    ')
        e.currentTarget.setSelectionRange(start + 4, start + 4)
      }
    }
  }

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

  const handleScroll = useCallback(() => {
    const { clientHeight, scrollHeight, scrollTop } = document.getElementById(
      'comment-list'
    ) as HTMLElement

    if (Math.round(scrollTop + clientHeight) >= scrollHeight) {
      setPage(page + 1)
    }
  }, [page])

  useEffect(() => {
    if (!scrollEnd) {
      window.addEventListener('scroll', handleScroll, true)
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [handleScroll, scrollEnd])

  useEffect(() => {
    if (!scrollEnd) {
      getComments(page)
    }
  }, [getComments, page, scrollEnd])

  return (
    <Stack id="comment-list">
      <Box padding={2} border="1px solid" borderColor="ButtonHighlight" borderRadius={1}>
        <InputBase
          value={commentTemp}
          onChange={handleComment}
          placeholder="댓글을 입력하세요."
          multiline
          rows={2}
          onKeyDown={handleKeyDown}
          fullWidth
        />
        <Box display="flex" flexDirection="row-reverse">
          <Button onClick={submitComment} variant="contained">
            제출
          </Button>
        </Box>
      </Box>
      <Box mt={1}>
        {comments.map((comment, i) => {
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
      </Box>
      <Confirm
        open={checkLoginModal}
        onClose={() => setCheckLoginModal(false)}
        message="로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        fn={() => navigate('/login')}
      />
    </Stack>
  )
}
export default CommentList
