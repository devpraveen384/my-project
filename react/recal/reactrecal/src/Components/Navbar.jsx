import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>

    <div className='bg-amber-200 flex justify-between p-3'>
        <div>
            logo
        </div>
        <div className='bg-amber-500 w-30 flex justify-between'>
            <Link to='/'>home</Link>
            <Link to='/task'>task</Link>
        </div>
    </div>
    
    </>
  )
}

export default Navbar