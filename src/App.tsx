import { Container } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigator from './components/navigator.component'
import Toast from './components/toast.component'
import LoginPage from './pages/login.page'
import MainPage from './pages/main.page'

function App() {
  return (
    <Container maxWidth={false}>
      <BrowserRouter>
        <Navigator />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <Toast />
    </Container>
  )
}

export default App
