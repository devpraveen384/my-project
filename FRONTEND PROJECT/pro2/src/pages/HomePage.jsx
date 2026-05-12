import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="page">
      <div className="hero-panel">
        <p className="badge">PNR based delivery</p>
        <h2>Fresh meals delivered to your train seat</h2>
        <p>
          Select your journey details, browse station-wise menus and place orders
          from local vendors.
        </p>
        <div className="hero-actions">
          <Link to="/menu" className="btn-primary">
            Explore menu
          </Link>
          <Link to="/orders" className="btn-secondary">
            Track previous orders
          </Link>
        </div>
      </div>

      <div className="grid three-cols">
        <article className="info-card">
          <h3>Step 1: Choose food</h3>
          <p>Pick dishes available at your upcoming station.</p>
        </article>
        <article className="info-card">
          <h3>Step 2: Add coach details</h3>
          <p>Provide coach and seat number at checkout.</p>
        </article>
        <article className="info-card">
          <h3>Step 3: Receive delivery</h3>
          <p>Collect your meal directly at your seat.</p>
        </article>
      </div>
    </section>
  )
}

export default HomePage
