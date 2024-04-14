import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom'
import './App.css'
import DataContext  from "./DataContext"
import Main from './components/Main'
import Home from './components/Home'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Activate from './components/Activate'
import ChoreMateHome from './components/ChoreMateHome'
import rootReducer from './reducers'
import AddPerson from './components/AddPerson'
import PersonDetails from './components/PersonDetails'



function App() {

  return (
    <>
    
          
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route exact path='/login' element={<LogIn/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/choremate' element={<ChoreMateHome/>}/>
              <Route path='/api/create_person/' element={<AddPerson/>}/>
              <Route path='/people/:person_id' element={<PersonDetails/>}/>
              <Route path='/activate/:uid/:token' element={<Activate/>}/>
          </Routes>
    </>
  )
}

export default App
