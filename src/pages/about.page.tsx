import { Box, Button, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { AuthState } from '../store/slices/auth.slice'

const AboutPage = () => {
  const { role } = useSelector(AuthState)

  return (
    <Box>
      <Grid container>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          {role === 'admin' ? (
            <Box padding={2} display="flex" flexDirection="row-reverse">
              <Button variant="contained">수정</Button>
            </Box>
          ) : null}
          <Box mt={1}>123123</Box>
        </Grid>
        <Grid item md={3} />
      </Grid>
    </Box>
  )
}

export default AboutPage
