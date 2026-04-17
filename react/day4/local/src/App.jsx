import Insta from "./Component.jsx/Insta"

const App = () => {
  const name = "React"
  const age = 5 
  const isLoggedIn = true
  return (
    <>
    <div>
      <h1>Hello, {name}{age}{isLoggedIn}!</h1>
      <p>{isLoggedIn?"this is true":"this is false"}</p>
    </div>
    <Insta /> 
    
    </>
  )
}

export default App