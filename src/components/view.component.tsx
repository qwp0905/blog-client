import { Box, IconButton, Typography } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

interface Props {
  count: number
  size?: 'small' | 'inherit' | 'large' | 'medium'
}

const View = ({ count, size = 'small' }: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton disabled sx={{ mr: -0.7 }}>
        <VisibilityOutlinedIcon color="disabled" fontSize={size} />
      </IconButton>
      <Typography color="GrayText" fontSize={size}>
        {count}
      </Typography>
    </Box>
  )
}

export default View
