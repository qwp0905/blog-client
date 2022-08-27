import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = () => {
    console.log(123123)
  }

  return (
    <Box display="flex" justifyContent="center" pt={30}>
      <Stack spacing={2}>
        <Box>
          <TextField label="Email" variant="outlined" />
        </Box>
        <Box>
          <TextField label="Password" variant="outlined" />
        </Box>
        <Box pt={4}>
          <Button
            fullWidth={true}
            variant="contained"
            size="large"
            onClick={handleLogin}
          >
            로그인
          </Button>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center">
              <Button size="small" color="inherit">
                비밀번호 찾기
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center">
              <Button
                size="small"
                color="inherit"
                onClick={() => navigate('/signup')}
              >
                회원가입
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}

export default LoginPage
