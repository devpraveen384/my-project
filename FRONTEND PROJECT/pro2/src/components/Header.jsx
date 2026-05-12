import { NavLink } from 'react-router-dom'

function Header({ cartCount }) {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/cart', label: `Cart (${cartCount})` },
    { to: '/checkout', label: 'Checkout' },
    { to: '/orders', label: 'Orders' },
  ]

  return (
    <header className="topbar">
      <div>
        <p className="brand-kicker">RailFood Express</p>
        <h1>Train Food Ordering</h1>
      </div>
      <nav className="topbar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
