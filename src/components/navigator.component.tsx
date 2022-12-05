import React, { MouseEvent, useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { requestPost } from '../services/request'
import { AuthState, deleteInfo } from '../store/slices/auth.slice'
import ConfirmModal from './modals/confirm.modal'
import { toast } from '../common/utils/popup'
import SideBar from './sidebar.component'

const Navigator = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { role } = useSelector(AuthState)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const [logoutModal, setLogoutModal] = useState(false)

  const [sideBarModal, setSideBarModal] = useState(false)

  const is_pc = useMediaQuery('(min-width: 900px)')

  const handleMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleLogoutModal = () => {
    setLogoutModal(true)
  }

  const handleProfile = () => {
    setAnchorEl(null)
    navigate('/profile')
  }

  const handleLogout = async () => {
    await requestPost('/account/logout')
    dispatch(deleteInfo())
    setAnchorEl(null)
    toast.success('로그아웃되었습니다.')
    return navigate('/')
  }

  const handleLogin = () => {
    setAnchorEl(null)
    return navigate('/login')
  }

  const handleWrite = () => {
    setAnchorEl(null)
    return navigate('/write')
  }

  const openSideBar = () => {
    setSideBarModal(true)
  }

  const closeSideBar = () => {
    setSideBarModal(false)
  }

  return (
    <Box>
      <Box mt={is_pc ? 8 : 6} />
      <AppBar position="fixed" color="inherit" sx={{ zIndex: 3 }}>
        <Box>
          <Toolbar>
            <Grid container>
              <Grid item xs={2} lg={2}>
                {is_pc ? null : (
                  <IconButton onClick={openSideBar}>
                    <MenuIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={5} lg={8}>
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
              <Grid item xs={5} lg={2} display="flex" flexDirection="row-reverse">
                <Grid container flexDirection="row-reverse">
                  <IconButton size="small" color="inherit" onClick={handleMenu}>
                    <AccountCircle />
                  </IconButton>
                  <Button
                    sx={{ mr: 0.3, textTransform: 'none' }}
                    color="inherit"
                    LinkComponent="a"
                    href="/intro"
                    size="small"
                  >
                    Intro
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Menu
              open={!!anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              onClose={() => setAnchorEl(null)}
            >
              {role === 'admin' ? (
                <MenuItem onClick={handleWrite}>글 작성</MenuItem>
              ) : null}
              {role ? <MenuItem onClick={handleProfile}>프로필</MenuItem> : null}
              {role ? (
                <MenuItem onClick={handleLogoutModal}>로그아웃</MenuItem>
              ) : (
                <MenuItem onClick={handleLogin}>로그인</MenuItem>
              )}
            </Menu>
          </Toolbar>
        </Box>
        <ConfirmModal
          open={logoutModal}
          onClose={() => setLogoutModal(false)}
          message="로그아웃 하시겠습니까?"
          fn={handleLogout}
        />
      </AppBar>

      <Dialog open={sideBarModal} onClose={closeSideBar} fullScreen>
        <Box display="flex" flexDirection="row-reverse" pr={1} pt={1}>
          <IconButton onClick={closeSideBar}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box pl={2} pr={2}>
          <SideBar />
        </Box>
      </Dialog>
    </Box>
  )
}

export default Navigator
