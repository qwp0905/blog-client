import React, { MouseEvent, useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postJson } from '../services/request'
import { AuthState, deleteInfo } from '../store/slices/auth.slice'
import Confirm from './modals/confirm.modal'
import { toast } from '../common/utils/popup'

const Navigator = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { access_token } = useSelector(AuthState)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const [logoutModal, setLogoutModal] = useState(false)

  const handleMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleLogoutModal = () => {
    setLogoutModal(true)
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  const handleLogout = async () => {
    await postJson('/account/logout')
    dispatch(deleteInfo())
    setAnchorEl(null)
    toast.success('로그아웃되었습니다.')
    return navigate('/')
  }

  return (
    <Box>
      <AppBar position="fixed" color="inherit" sx={{ zIndex: 3 }}>
        <Box>
          <Toolbar sx={{}}>
            <Grid container>
              <Grid item xs={0} lg={1} />
              <Grid item xs={6} lg={10}>
                <Box display="flex" justifyContent="center">
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'monospace',
                      color: 'inherit',
                      letterSpacing: '.3rem',
                      textDecoration: 'none',
                      fontWeight: 700
                    }}
                    noWrap
                    component="a"
                    href="/"
                  >
                    블로그
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} lg={1} display="flex" flexDirection="row-reverse">
                {!access_token ? (
                  <Button color="inherit" LinkComponent="a" href="/login">
                    Login
                  </Button>
                ) : (
                  <Grid container flexDirection="row-reverse">
                    <IconButton size="small" color="inherit" onClick={handleMenu}>
                      <AccountCircle />
                    </IconButton>
                    <IconButton
                      LinkComponent="a"
                      href="/write"
                      size="small"
                      color="inherit"
                      sx={{ mr: 0.8 }}
                    >
                      <CreateIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Menu
              open={!!anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogoutModal}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </Box>
        <Confirm
          open={logoutModal}
          onClose={() => setLogoutModal(false)}
          message="로그아웃 하시겠습니까?"
          fn={handleLogout}
        />
      </AppBar>
      <Box mt={8} />
    </Box>
  )
}

export default Navigator
