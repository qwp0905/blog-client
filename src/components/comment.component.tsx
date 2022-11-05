import { Box, Button, InputBase, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { calculateDate } from '../common/utils/moment'
import { toast } from '../common/utils/popup'
import { requestDelete, requestPatch } from '../services/request'
import { AuthState } from '../store/slices/auth.slice'
import Confirm from './modals/confirm.modal'

interface Props {
  comment: IComment
  onlyOneUpdate: boolean
  setOnlyOneUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IComment {
  id: number
  account_id: number
  nickname: string
  content: string
  created_at: Date
  updated_at: Date
}

const Comment = ({ comment, onlyOneUpdate, setOnlyOneUpdate }: Props) => {
  const { id } = useSelector(AuthState)

  const [deleteModal, setDeleteModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [content, setContent] = useState(comment.content)

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const handleUpdate = () => {
    if (!onlyOneUpdate) {
      setOnlyOneUpdate(true)
      setUpdate(true)
    }
  }

  const cancelUpdate = () => {
    setContent(comment.content)
    setOnlyOneUpdate(false)
    setUpdate(false)
  }

  const handleDelete = async () => {
    if (id !== comment.account_id) {
      return toast.error('권한이 없습니다.')
    }
    const response = await requestDelete(`/comment/${comment.id}`)
    if (response) {
      toast.success('댓글이 삭제되었습니다.')
      return window.location.reload()
    }
  }

  const submitUpdate = async () => {
    const response = await requestPatch(`/comment/${comment.id}`, { content })
    if (response) {
      toast.success('댓글이 수정되었습니다.')
      setUpdate(false)
      setOnlyOneUpdate(false)
      return window.location.reload()
    }
  }

  return (
    <Stack padding={2}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Box mr={1} display="flex" alignItems="center">
            <Typography>{comment.nickname}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography>{calculateDate(comment.created_at)}</Typography>
          </Box>
        </Box>
        {id === comment.account_id && !update ? (
          <Box display="flex">
            <Box
              sx={{ ':hover': { cursor: 'pointer', opacity: 0.8 } }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              component="label"
              htmlFor={`update-comment-${comment.id}`}
              mr={1}
            >
              수정
            </Box>
            <Box
              sx={{ ':hover': { cursor: 'pointer', opacity: 0.8 } }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              component="label"
              htmlFor={`delete-comment-${comment.id}`}
            >
              삭제
            </Box>
            <Button
              id={`update-comment-${comment.id}`}
              onClick={handleUpdate}
              sx={{ display: 'none' }}
            />
            <Button
              id={`delete-comment-${comment.id}`}
              onClick={() => setDeleteModal(true)}
              sx={{ display: 'none' }}
            />
          </Box>
        ) : null}
      </Box>
      <Box mt={3} mb={0.5} display="flex" alignItems="center">
        {update ? (
          <Box
            flexGrow={1}
            padding={1}
            border="1px solid"
            borderColor="ButtonHighlight"
            borderRadius={1}
          >
            <InputBase
              value={content}
              onChange={handleContent}
              multiline
              rows={2}
              fullWidth
            />
            <Box display="flex" flexDirection="row-reverse">
              <Button onClick={cancelUpdate} variant="outlined" sx={{ ml: 1 }}>
                취소
              </Button>
              <Button variant="contained" onClick={submitUpdate}>
                제출
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography>{content}</Typography>
        )}
      </Box>
      <Confirm
        open={deleteModal}
        message="정말 삭제하시겠습니까?"
        onClose={() => setDeleteModal(false)}
        fn={handleDelete}
      />
    </Stack>
  )
}
export default Comment
