import { Box, Typography } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

interface Props {
  count: number
}

const View = ({ count }: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <VisibilityOutlinedIcon color="disabled" fontSize="small" />
      <Typography ml={0.3} color="GrayText" fontSize={15}>
        {count}
      </Typography>
    </Box>
  )
}

export default View
