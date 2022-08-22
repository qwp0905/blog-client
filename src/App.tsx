import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toast from './components/toast.component'
import MainPage from './pages/main.page'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      <Toast />
    </div>
  )
}

export default App
