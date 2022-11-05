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
import { requestPost } from '../services/request'
import { AuthState, deleteInfo } from '../store/slices/auth.slice'
import Confirm from './modals/confirm.modal'
import { toast } from '../common/utils/popup'

const Navigator = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { role } = useSelector(AuthState)

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
    await requestPost('/account/logout')
    dispatch(deleteInfo())
    setAnchorEl(null)
    toast.success('로그아웃되었습니다.')
    return navigate('/')
  }

  return (
    <Box>
      <Box mt={8} />
      <AppBar position="fixed" color="inherit" sx={{ zIndex: 3 }}>
        <Box>
          <Toolbar>
            <Grid container>
              <Grid item xs={0} lg={2} />
              <Grid item xs={6} lg={8}>
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
                    Kwonjin's Blog
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} lg={2} display="flex" flexDirection="row-reverse">
                {!role ? (
                  <Button color="inherit" LinkComponent="a" href="/login">
                    Login
                  </Button>
                ) : (
                  <Grid container flexDirection="row-reverse">
                    <IconButton size="small" color="inherit" onClick={handleMenu}>
                      <AccountCircle />
                    </IconButton>
                    <Button
                      sx={{ mr: 0.8 }}
                      color="inherit"
                      LinkComponent="a"
                      href="/about"
                    >
                      About
                    </Button>
                    {role === 'admin' ? (
                      <IconButton
                        LinkComponent="a"
                        href="/write"
                        size="small"
                        color="inherit"
                        sx={{ mr: 0.8 }}
                      >
                        <CreateIcon />
                      </IconButton>
                    ) : null}
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
    </Box>
  )
}

export default Navigator
