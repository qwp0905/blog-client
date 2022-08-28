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
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ResponseBase } from '../common/interfaces/http.interface'
import Password from '../components/password.component'
import { postJson } from '../services/request'
import { error, success } from '../store/slices/popup.slice'

const email_list = ['gmail.com', 'naver.com', 'hanmail.net']

const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [domain, setDomain] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isSamePassword, setIsSamePassword] = useState(true)

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleDomain = (e: SelectChangeEvent) => {
    setDomain(e.target.value)
  }

  const handleSignUp = async () => {
    if (!email) {
      return dispatch(error('이메일을 입력해주세요.'))
    }

    if (!domain) {
      return dispatch(error('이메일 주소를 선택해주세요.'))
    }

    if (!password || !passwordConfirm) {
      return dispatch(error('비밀번호를 입력해주세요.'))
    }

    if (validateEmail(email)) {
      return dispatch(error('이메일을 확인해주세요.'))
    }

    if (validatePassword(password)) {
      return dispatch(error('비밀번호는 8자 이상으로 입력해주세요.'))
    }

    if (password !== passwordConfirm) {
      return dispatch(error('비밀번호가 일치하지 않습니다.'))
    }
    const new_email = email + '@' + domain

    const response: ResponseBase<any> = await postJson('/user/sign', {
      email: new_email,
      password
    })

    if (response.result) {
      dispatch(success('회원 가입에 성공했습니다.'))
      return navigate('/')
    } else {
      dispatch(error(response.message))
    }
  }

  const validateEmail = (email: string) => {
    return !email.match(/^[0-9a-zA-Z]*$/)
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
  })

  useEffect(() => {
    setIsSamePassword(password !== passwordConfirm)
  }, [passwordConfirm])

  return (
    <Box display="flex" justifyContent="center" pt={20}>
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
          <Password
            state={password}
            set={setPassword}
            error={isValidPassword}
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
          <Button
            fullWidth
            onClick={handleSignUp}
            variant="contained"
            size="large"
          >
            회원가입
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
export default SignUpPage
