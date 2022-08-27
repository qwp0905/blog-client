import { Container } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toast from './components/alert.component'
import Navigator from './components/navigator.component'
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
