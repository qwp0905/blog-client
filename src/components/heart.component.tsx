import { Box, IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteJson, getJson, postJson } from '../services/request'
import { useSelector } from 'react-redux'
import { AuthState } from '../store/slices/auth.slice'

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

  const checkHeart = async () => {
    const response: boolean = await getJson(`/heart/${article_id}`)
    setIsHeart(response)
  }

  const handleCount = async () => {
    if (!access_token) {
      return navigate('/login')
    }
    if (!isHeart) {
      await postJson(`/heart/${article_id}`)
      setIsHeart(true)
      setHeartCount(heartCount + 1)
    } else {
      await deleteJson(`/heart/${article_id}`)
      setIsHeart(false)
      setHeartCount(heartCount - 1)
    }
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
          <FavoriteIcon color="disabled" fontSize={size} />
        ) : (
          <FavoriteBorderIcon color="disabled" fontSize={size} />
        )}
      </IconButton>
      <Typography color="GrayText" fontSize={size}>
        {heartCount}
      </Typography>
    </Box>
  )
}
export default Heart
