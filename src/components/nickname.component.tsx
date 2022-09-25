import { Typography } from '@mui/material'

interface Props {
  account_id: number
  nickname: string
}

const Nickname = ({ account_id, nickname }: Props) => {
  return (
    <Typography
      component="a"
      href={`/?id=${account_id}`}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        ':hover': { cursor: 'pointer', textDecorationLine: 'underline' }
      }}
    >
      {nickname}
    </Typography>
  )
}

export default Nickname
