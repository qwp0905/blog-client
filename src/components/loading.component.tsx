import React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { LoadingState } from '../store/slices/loading.slice'
import CircularProgress from '@mui/material/CircularProgress'

export const Loading = () => {
  const { is_loading } = useSelector(LoadingState)
  return is_loading ? (
    <Box
      display="flex"
      justifyContent="center"
      position="fixed"
      width="100%"
      height="100%"
      bgcolor="ButtonHighlight"
      alignItems="center"
      zIndex={4}
      sx={{ opacity: 0.6 }}
    >
      <CircularProgress />
    </Box>
  ) : null
}
export default Loading
