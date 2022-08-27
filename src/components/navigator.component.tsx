import { AccountCircle } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Navigator = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Box>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
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
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default Navigator
