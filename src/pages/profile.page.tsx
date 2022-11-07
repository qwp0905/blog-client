import { Button, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from '../common/utils/popup'
import Password from '../components/password.component'
import { requestPatch } from '../services/request'
import { AuthState, updateInfo } from '../store/slices/auth.slice'

const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { nickname, email, role } = useSelector(AuthState)

  const [newNickname, setNewNickname] = useState(nickname)
  const [isValidNickname, setIsValidNickname] = useState(true)

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isSamePassword, setIsSamePassword] = useState(true)

  const validatePassword = (password: string) => {
    return (
      !~password.search(/[a-zA-Z]/) ||
      !~password.search(/[0-9]/) ||
      !~password.search(/[`~!@#$%^&*\\-_=+]/) ||
      password.length < 8 ||
      password.length > 24
    )
  }

  const validateNickname = (nickname: string) => {
    return !nickname.match(/^[0-9a-zA-Zㄱ-힣]*$/)
  }

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value)
  }

  const submitProfile = async () => {
    if (nickname !== newNickname || password || passwordConfirm) {
      if (!newNickname) {
        return toast.error('닉네임은 비워들 수 없습니다.')
      }

      if (validateNickname(newNickname)) {
        return toast.error('닉네임을 확인해주세요.')
      }

      if (password && validatePassword(password)) {
        return toast.error(
          '비밀번호는 8자 이상 24자 이하로 영문, 숫자, 특수기호가 포함되어야 합니다.'
        )
      }

      if (password !== passwordConfirm) {
        return toast.error('비밀번호가 일치하지 않습니다.')
      }

      const response = await requestPatch('/account', {
        nickname: newNickname !== nickname ? newNickname : undefined,
        password: password ? password : undefined
      })

      if (response) {
        dispatch(updateInfo({ nickname: newNickname }))
        toast.success('변경되었습니다.')
        return navigate('/')
      }
    } else {
      return toast.error('변경사항이 없습니다.')
    }
  }

  useEffect(() => {
    setIsValidNickname(validateNickname(newNickname || ''))
  }, [newNickname])

  useEffect(() => {
    setIsValidPassword(validatePassword(password))
  }, [password])

  useEffect(() => {
    setIsSamePassword(password !== passwordConfirm)
  }, [passwordConfirm])

  useEffect(() => {
    if (!role) {
      navigate('/')
    }
  }, [role])

  return (
    <Box display="flex" justifyContent="center" pt={12}>
      <Stack spacing={2} minWidth={350}>
        <Box display="flex" justifyContent="center" mb={5}>
          <Typography variant="h6">회원정보 수정</Typography>
        </Box>
        <Box>
          <TextField value={email} label="Email" variant="outlined" disabled fullWidth />
        </Box>
        <Box>
          <TextField
            value={newNickname}
            onChange={handleNickname}
            fullWidth
            label="Nickname"
            variant="outlined"
            error={isValidNickname}
          />
        </Box>
        <Box>
          <Password
            state={password}
            set={setPassword}
            error={isValidPassword && password !== ''}
            label="New Password"
          />
        </Box>
        <Box>
          <Password
            state={passwordConfirm}
            set={setPasswordConfirm}
            label="New Password Confirm"
            error={isSamePassword}
          />
        </Box>
        <Box display="flex" pt={4}>
          <Button
            onClick={submitProfile}
            fullWidth
            variant="contained"
            size="large"
            sx={{ mr: 1 }}
          >
            변경
          </Button>
          <Button LinkComponent="a" href="/" fullWidth variant="outlined" size="large">
            취소
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
export default ProfilePage
