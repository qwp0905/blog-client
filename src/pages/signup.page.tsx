import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from '../common/utils/popup'
import Password from '../components/password.component'
import { requestPost } from '../services/request'
import { AuthState } from '../store/slices/auth.slice'

const email_list = ['gmail.com', 'naver.com', 'hanmail.net']

const SignUpPage = () => {
  const navigate = useNavigate()
  const { access_token } = useSelector(AuthState)

  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [domain, setDomain] = useState('')

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isSamePassword, setIsSamePassword] = useState(true)

  const [nickname, setNickname] = useState('')
  const [isValidNickname, setIsValidNickname] = useState(true)

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleDomain = (e: SelectChangeEvent) => {
    setDomain(e.target.value)
  }

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }

  const handleSignUp = async () => {
    if (!email) {
      return toast.error('이메일을 입력해주세요.')
    }

    if (!domain) {
      return toast.error('이메일 주소를 선택해주세요.')
    }

    if (!nickname) {
      return toast.error('닉네임을 입력해주세요.')
    }

    if (!password || !passwordConfirm) {
      return toast.error('비밀번호를 입력해주세요.')
    }

    if (validateEmail(email)) {
      return toast.error('이메일을 확인해주세요.')
    }

    if (validateNickname(nickname)) {
      return toast.error('이메일을 확인해주세요.')
    }

    if (validatePassword(password)) {
      return toast.error('비밀번호는 8자 이상으로 입력해주세요.')
    }

    if (password !== passwordConfirm) {
      return toast.error('비밀번호가 일치하지 않습니다.')
    }
    const new_email = email + '@' + domain

    const response = await requestPost('/account', {
      email: new_email,
      password,
      nickname
    })

    if (response) {
      navigate('/login')
      return toast.success('회원 가입에 성공했습니다.')
    }
  }

  const validateEmail = (email: string) => {
    return !email.match(/^[0-9a-zA-Z]*$/)
  }

  const validateNickname = (nickname: string) => {
    return !nickname.match(/^[0-9a-zA-Zㄱ-힣]*$/)
  }

  const validatePassword = (password: string) => {
    return (
      !~password.search(/[a-zA-Z]/) ||
      !~password.search(/[0-9]/) ||
      !~password.search(/[`~!@#$%^&*()-_=+]/) ||
      password.length < 8 ||
      password.length > 24
    )
  }

  useEffect(() => {
    setIsValidEmail(validateEmail(email))
  }, [email])

  useEffect(() => {
    setIsValidPassword(validatePassword(password))
  }, [password])

  useEffect(() => {
    setIsValidNickname(validateNickname(nickname))
  }, [nickname])

  useEffect(() => {
    setIsSamePassword(password !== passwordConfirm)
  }, [passwordConfirm])

  useEffect(() => {
    if (access_token) {
      navigate('/')
    }
  }, [access_token])

  return (
    <Box display="flex" justifyContent="center" pt={12}>
      <Stack spacing={2} minWidth={350}>
        <Box display="flex" justifyContent="center" mb={5}>
          <Typography variant="h6">회원가입</Typography>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              value={email}
              onChange={handleEmail}
              label="Email"
              variant="outlined"
              error={isValidEmail}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="email-selection">select</InputLabel>
              <Select
                label="select"
                labelId="email-selection"
                value={domain}
                onChange={handleDomain}
              >
                {email_list.map((e, i) => {
                  return (
                    <MenuItem value={e} key={i}>
                      {e}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box>
          <TextField
            fullWidth
            label="Nickname"
            variant="outlined"
            value={nickname}
            onChange={handleNickname}
            error={isValidNickname}
          />
        </Box>
        <Box>
          <Password
            state={password}
            set={setPassword}
            error={isValidPassword && password !== ''}
          />
        </Box>
        <Box>
          <Password
            state={passwordConfirm}
            set={setPasswordConfirm}
            label="Password Confirm"
            error={isSamePassword}
          />
        </Box>
        <Box pt={4}>
          <Button fullWidth onClick={handleSignUp} variant="contained" size="large">
            회원가입
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
export default SignUpPage
