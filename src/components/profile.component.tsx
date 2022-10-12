import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { calculateDate } from '../common/utils/moment'
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
      <Box mt={2}>
        <Grid container>
          <Grid item md={2} />
          <Grid item xs={12} md={8}>
            <Stack
              spacing={1}
              sx={{
                padding: 2,
                border: '1px solid',
                borderColor: 'ButtonHighlight',
                borderRadius: 1
              }}
            >
              <Box>
                <Typography variant="h4">{profile.nickname}</Typography>
              </Box>
              <Box pt={2}>작성한 글 {profile.articles}</Box>
              <Box>가입 {calculateDate(profile.created_at)}</Box>
            </Stack>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Box>
    )) ||
    null
  )
}
export default Profile
