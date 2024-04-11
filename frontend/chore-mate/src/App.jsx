import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom'
import './App.css'
import DataContext  from "./DataContext"
import Main from './components/Main'
import Home from './components/Home'
import Layout from './components/Layout'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import rootReducer from './reducers'; // If the file is named reducers.js or index.js


function App() {

  return (
    <>
    
          
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route exact path='/login' element={<LogIn/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              {/* <Route exact path='/reset-password' component={<ResetPassword/>}/>
              <Route exact path='/password/reset/confirm/:uid/:token' component={<ResetPasswordConfirm/>}/>
              <Route exact path='/activate/:uid/:token' component={<Home/>}/> */}
              {/* <Route exact path='' component={}/> */}
            </Routes>
          
    
    
    </>
  )
}

export default App
