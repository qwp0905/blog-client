import { Box, Button, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={30}>
      <Box>
        <Box mt={2}>
          <TextField label="Email" variant="outlined" />
        </Box>
        <Box mt={2}>
          <TextField label="Password" variant="outlined" />
        </Box>
        <Box mt={10}>
          <Button fullWidth={true} variant="contained" size="large">
            로그인
          </Button>
        </Box>
        <Grid mt={2} container>
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
      </Box>
    </Box>
  )
}

export default LoginPage
