import React from 'react'
import { ToastContainer } from 'react-toastify'

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
  )
}

export default Toast
