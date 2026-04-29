import React, { useEffect } from 'react'

const ApiData = () => {
    const
    use useEffect (()=>{
    
        const fetchdata = async ()=>{
        
            const getdata =await fetch ("https://dummyjson.com/products")
            const changedata =await getdata.json()


            setdataget(changedata.products)
            
     }
     fetch()

 },[])

 return (
    <>
    {dataget.map((e)=>(



    ))}




    
        
    
    </>
  )
}

export default ApiData