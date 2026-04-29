import Logo from "./Logo"

const Navbar = () => {
  return (
    <nav>
      
      <div className="links">
        <div>
            <Logo/>
        </div>
<div className="praveen">
            <a href="/">Home</a>/
        <a href="/about">About</a>/
        <a href="/contact">Contact</a>/
        <a href="/Login">Login</a>
</div>


      </div>
    </nav>
  )
}

export default Navbar