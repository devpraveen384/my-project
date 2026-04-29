import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Rendering from './Components/Rendering'
import NavBar from './Components/NavBar'

const App = () => {
  return (
    <>
    <NavBar/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/rendering' element={<Rendering/>}/>

    </Routes>
    
    
    </>
  )
}

export default App