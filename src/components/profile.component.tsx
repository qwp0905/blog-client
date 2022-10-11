import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { requestGet } from '../services/request'

interface Props {
  account_id: number
}

interface Account {
  id: number
  nickname: string
  articles: number
  created_at: Date
}

const Profile = ({ account_id }: Props) => {
  const [profile, setProfile] = useState<Account | null>()

  const onCreated = async () => {
    const response = await requestGet(`/account/${account_id}`)
    if (response) {
      setProfile(response)
    }
  }

  useEffect(() => {
    onCreated()
  }, [])
  return (
    (profile && (
      <Box mt={1}>
        <Stack>
          <Box>{profile.nickname}</Box>
          <Box>{profile.articles}</Box>
          <Box>{profile.created_at + ''}</Box>
        </Stack>
      </Box>
    )) ||
    null
  )
}
export default Profile
