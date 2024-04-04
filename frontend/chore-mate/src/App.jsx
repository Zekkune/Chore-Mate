import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthLogin from './components/AuthLogin'
import AuthLogout from './components/AuthLogout'
import AuthProfile from './components/AuthProfile'

function App() {
  

  return (
    <>
      <AuthLogin></AuthLogin>
      <AuthProfile></AuthProfile>
      <AuthLogout></AuthLogout>

    </>
  )
}

export default App
