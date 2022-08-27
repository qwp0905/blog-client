import { AccountCircle } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigator = () => {
  const navigate = useNavigate()

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
              <IconButton
                size="small"
                color="inherit"
                onClick={() => navigate('/login')}
              >
                <AccountCircle />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default Navigator
