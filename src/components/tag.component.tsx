import { Box, Typography } from '@mui/material'

interface Props {
  tag: string
  size?: 'lg' | 'xs' | 'mn'
  clickable?: boolean
}

const Tag = ({ tag, size = 'mn', clickable = false }: Props) => {
  let font_size: number
  let padding_left_right: number
  let height: number

  switch (size) {
    case 'xs':
      font_size = 12
      padding_left_right = 0.5
      height = 22
      break
    case 'lg':
      font_size = 18
      padding_left_right = 1.2
      height = 22
      break
    default:
      font_size = 15
      padding_left_right = 0.9
      height = 25
      break
  }

  return (
    <Box
      borderRadius={1}
      display="flex"
      bgcolor="ButtonHighlight"
      justifyContent="center"
      pr={padding_left_right}
      pl={padding_left_right}
      height={height}
      sx={
        clickable
          ? {
              ':hover': { cursor: 'pointer', opacity: 0.8 },
              textDecoration: 'none',
              color: 'inherit'
            }
          : {}
      }
      {...(clickable ? { component: 'a', href: `/?tag=${tag}` } : {})}
    >
      <Typography color="primary" fontSize={font_size}>
        {tag}
      </Typography>
    </Box>
  )
}
export default Tag
