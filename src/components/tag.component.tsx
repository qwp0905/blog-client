import { Box, Typography } from '@mui/material'

interface Props {
  tag: string
  size?: 'lg' | 'xs' | 'mn'
}

const Tag = ({ tag, size = 'mn' }: Props) => {
  let font_size: number
  let padding_top_bottom: number
  let padding_left_right: number

  switch (size) {
    case 'xs':
      font_size = 12
      padding_top_bottom = 0.1
      padding_left_right = 0.5
      break
    case 'mn':
      font_size = 15
      padding_top_bottom = 0.3
      padding_left_right = 0.9
      break
    case 'lg':
      font_size = 18
      padding_top_bottom = 0.5
      padding_left_right = 1.2
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
      pt={padding_top_bottom}
      pb={padding_top_bottom}
      sx={{
        ':hover': { cursor: 'pointer', opacity: 0.8 },
        textDecoration: 'none',
        color: 'inherit'
      }}
      component="a"
      href={`/?tag=${tag}`}
    >
      <Typography color="primary" fontSize={font_size}>
        {tag}
      </Typography>
    </Box>
  )
}
export default Tag