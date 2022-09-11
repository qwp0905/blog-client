import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from '../common/utils/popup'
import Password from '../components/password.component'
import { postJson } from '../services/request'
import { AuthState, login } from '../store/slices/auth.slice'

interface ILoginResponse {
  id: number
  email: string
  nickname: string
  created_at: string
  access_token: string
  refresh_token: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { access_token } = useSelector(AuthState)

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleLogin = async () => {
    if (!email) {
      return toast.error('이메일을 입력하세요.')
    }

    if (!password) {
      return toast.error('패스워드를 입력하세요')
    }
    const response: ILoginResponse = await postJson('/user/login', {
      email,
      password
    })
    if (response) {
      dispatch(login(response))
      return toast.success('로그인되었습니다.')
    }
  }

  useEffect(() => {
    if (access_token) {
      navigate('/')
    }
  }, [access_token])

  return (
    <Box display="flex" justifyContent="center" pt={20}>
      <Stack spacing={2} minWidth={350}>
        <Box display="flex" justifyContent="center" mb={5}>
          <Typography variant="h6">로그인</Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            value={email}
            label="Email"
            variant="outlined"
            onChange={handleEmail}
          />
        </Box>
        <Box>
          <Password state={password} set={setPassword} />
        </Box>
        <Box pt={4}>
          <Button fullWidth={true} variant="contained" size="large" onClick={handleLogin}>
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
              <Button size="small" color="inherit" onClick={() => navigate('/signup')}>
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
