import { Box, IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteJson, getJson, postJson } from '../services/request'
import { useSelector } from 'react-redux'
import { AuthState } from '../store/slices/auth.slice'
import Confirm from './modals/confirm.modal'
import { computeCount } from '../common/utils/count'

interface Props {
  article_id: number
  clickable?: boolean
  count: number
  distinct?: boolean
  size?: 'small' | 'inherit' | 'large' | 'medium'
}

const Heart = ({ article_id, clickable = false, count, size = 'small' }: Props) => {
  const navigate = useNavigate()

  const { access_token } = useSelector(AuthState)

  const [isHeart, setIsHeart] = useState(false)
  const [heartCount, setHeartCount] = useState(count)
  const [checkLoginModal, setCheckLoginModal] = useState(false)

  const checkHeart = async () => {
    const response: boolean = await getJson(`/heart/${article_id}`)
    setIsHeart(response)
  }

  const handleCount = async () => {
    if (!access_token) {
      return setCheckLoginModal(true)
    }
    if (!isHeart) {
      await postJson(`/heart/${article_id}`)
    } else {
      await deleteJson(`/heart/${article_id}`)
    }
    setIsHeart(!isHeart)
    setHeartCount(heartCount + (isHeart ? -1 : +1))
  }

  useEffect(() => {
    if (clickable && access_token) {
      checkHeart()
    }
  }, [])

  return (
    <Box display="flex" alignItems="center">
      <IconButton disabled={!clickable} sx={{ mr: -0.7 }} onClick={handleCount}>
        {isHeart && clickable ? (
          <FavoriteIcon color="error" fontSize={size} />
        ) : (
          <FavoriteBorderIcon color="inherit" fontSize={size} />
        )}
      </IconButton>
      <Typography color="GrayText" fontSize={size}>
        {computeCount(heartCount)}
      </Typography>
      <Confirm
        open={checkLoginModal}
        onClose={() => setCheckLoginModal(false)}
        message="로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        fn={() => navigate('/login')}
      />
    </Box>
  )
}
export default Heart
