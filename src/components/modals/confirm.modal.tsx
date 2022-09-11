import React from 'react'
import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material'

interface Props {
  open: boolean
  onClose: () => unknown
  message: string
  fn: () => unknown
}

const Confirm = ({ open, message, onClose, fn }: Props) => {
  const handleConfirm = () => {
    fn()
    return onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        position="absolute"
        bgcolor="background.paper"
        top="50%"
        left="50%"
        width="20rem"
        sx={{ transform: 'translate(-50%, -50%)' }}
        display="flex"
        justifyContent="center"
        pt={3}
        pb={3}
      >
        <Stack spacing={3} width="100%">
          <Box display="flex" justifyContent="center">
            <Typography>{message}</Typography>
          </Box>
          <Grid container columns={24}>
            <Grid item xs={5}></Grid>
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleConfirm} fullWidth>
                예
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              <Button onClick={onClose} variant="outlined" fullWidth>
                아니오
              </Button>
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
        </Stack>
      </Box>
    </Modal>
  )
}
export default Confirm
