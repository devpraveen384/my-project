import React, { useState } from 'react'

const Rendering = () => {


    const [count,setCount] = useState(0) 

    const increase=()=>{

        setCount (count+1)
    }

  return (
    <>
    <div>
    <p>{count}</p>
    <button onClick={increase}>click</button>
    
    </div>
    
    </>
    
    
  ) 
}

export default Rendering