import { Container } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Popup from './components/popup.component'
import Navigator from './components/navigator.component'
import LoginPage from './pages/login.page'
import MainPage from './pages/main.page'
import SignUpPage from './pages/signup.page'
import ArticlePage from './pages/article.page'
import WritePage from './pages/write.page'
import ProfilePage from './pages/profile.page'
import IntroPage from './pages/intro.page'
import NotFoundPage from './pages/404.page'

function App() {
  return (
    <Container maxWidth={false}>
      <BrowserRouter>
        <Navigator />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Popup />
    </Container>
  )
}

export default App
