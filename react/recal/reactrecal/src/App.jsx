import React from 'react'

import Task from './Components/Task'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'

const App = () => {
  return (<>
  
  <Navbar/>

  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/task' element={<Task/>} />

  </Routes>
  
  </>
    
  )
}

export default App