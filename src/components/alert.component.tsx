import { Alert, Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { closeToast, ToastState } from '../store/slices/toast.slice'

const Toast = () => {
  const dispatch = useDispatch()
  const { open, type, message } = useSelector(ToastState)

  const handleClose = () => {
    dispatch(closeToast())
  }

  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  )
}

export default Toast
