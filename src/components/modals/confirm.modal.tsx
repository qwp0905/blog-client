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
        width="15rem"
        sx={{ transform: 'translate(-50%, -50%)' }}
        display="flex"
        justifyContent="center"
        pt={4}
        pb={4}
      >
        <Stack spacing={3} width="100%">
          <Box display="flex" justifyContent="center">
            <Typography>{message}</Typography>
          </Box>
          <Grid container columns={24}>
            <Grid item xs={3.5} />
            <Grid item xs={8}>
              <Button variant="contained" onClick={handleConfirm} fullWidth>
                예
              </Button>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={8}>
              <Button onClick={onClose} variant="outlined" fullWidth>
                아니오
              </Button>
            </Grid>
            <Grid item xs={3.5} />
          </Grid>
        </Stack>
      </Box>
    </Modal>
  )
}
export default Confirm
