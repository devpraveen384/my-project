import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'





const App = () => {
  return ( <>
    <Navbar/>

 <Routes>

       <Route path ="/" element={<Home/>}/>
        <Route path ="/anbout" element={<About/>}/>
         <Route path ="/element" element={<Contact/>}/>

    </Routes>  
  </>)
}

export default App