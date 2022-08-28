import { Container } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Popup from './components/popup.component'
import Navigator from './components/navigator.component'
import LoginPage from './pages/login.page'
import MainPage from './pages/main.page'
import SignUpPage from './pages/signup.page'

function App() {
  return (
    <Container maxWidth={false}>
      <BrowserRouter>
        <Navigator />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      <Popup />
    </Container>
  )
}

export default App
