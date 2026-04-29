import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
   <>
   <div>
    
    <div>
    Logo
    </div>
    <div>
       <Link  to='/'>Home</Link>
       <Link to='/rendering'>Rendering process</Link>


    </div>
   
   </div>

   
   
   </>
  )
}

export default NavBar