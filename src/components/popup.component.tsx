import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { closePopup, PopupState } from '../store/slices/popup.slice'

const Popup = () => {
  const dispatch = useDispatch()
  const { open, type, message } = useSelector(PopupState)

  const handleClose = () => {
    dispatch(closePopup())
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert variant="outlined" severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Popup
