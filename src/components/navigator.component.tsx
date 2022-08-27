import { AccountCircle } from '@mui/icons-material'
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
import React, { MouseEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AuthState } from '../store/slices/auth.slice'

const Navigator = () => {
  const navigate = useNavigate()

  const { access_token } = useSelector(AuthState)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <AppBar position="fixed" color="inherit">
      <Box>
        <Toolbar>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
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
                  HomePage
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={1} display="flex" flexDirection="row-reverse">
              {!access_token ? (
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
              ) : (
                <IconButton size="small" color="inherit" onClick={handleMenu}>
                  <AccountCircle />
                </IconButton>
              )}
            </Grid>
          </Grid>
          <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
          </Menu>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default Navigator
