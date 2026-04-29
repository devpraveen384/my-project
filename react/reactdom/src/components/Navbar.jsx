
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-amber-400 p-5 flex items-center">
     
     <div>
        <h1>Logo</h1>   
     </div>
     <div>
       <Link to ="/">Home</Link>  
       <Link to ="/about">About</Link> 
       <Link to ="/contact">Contact</Link>      
     </div>
    

    </div>

  )
}

export default Navbar