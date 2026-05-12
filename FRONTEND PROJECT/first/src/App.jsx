import { useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import './App.css'

const trains = [
  '12623 Chennai Mail',
  '12657 Bengaluru Express',
  '22671 Tejas Express',
  '12007 Shatabdi Express',
]

const stations = ['Chennai', 'Katpadi', 'Salem', 'Erode', 'Coimbatore']

const foodItems = [
  {
    id: 1,
    name: 'Idli',
    category: 'Breakfast',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Dosa',
    category: 'Breakfast',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1694849789325-914b71ab4075?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Meals',
    category: 'Lunch',
    price: 130,
    image:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Briyani',
    category: 'Lunch',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1563379091339-03246963d29a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Snacks',
    category: 'Snacks',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Juice',
    category: 'Drinks',
    price: 50,
    image:
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=80',
  },
]

const categories = ['All', ...new Set(foodItems.map((item) => item.category))]

function getSavedCart() {
  try {
    return JSON.parse(localStorage.getItem('railmeal-cart')) ?? []
  } catch {
    return []
  }
}

function AppShell() {
  const [cart, setCart] = useState(getSavedCart)
  const [darkMode, setDarkMode] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    localStorage.setItem('railmeal-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(timer)
  }, [toast])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const addToCart = (food) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === food.id)
      if (existing) {
        return current.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { ...food, quantity: 1 }]
    })
    setToast(`${food.name} added to cart`)
  }

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id))
    setToast('Item removed from cart')
  }

  const clearCart = () => setCart([])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3 font-black tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-600 text-white">
              TM
            </span>
            <span className="text-xl">Train Meals</span>
          </Link>
          <div className="flex items-center gap-2">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/menu" className="nav-link">
              Menu
            </NavLink>
            <NavLink to="/cart" className="nav-link">
              Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
            <NavLink to="/feedback" className="nav-link">
              Feedback
            </NavLink>
            <button
              type="button"
              className="icon-button"
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode((value) => !value)}
              title="Toggle dark mode"
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              clearCart={clearCart}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/signup" element={<SignupPage setToast={setToast} />} />
        <Route path="/feedback" element={<FeedbackPage setToast={setToast} />} />
      </Routes>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function HomePage({ addToCart }) {
  const [train, setTrain] = useState('')
  const [station, setStation] = useState('Chennai')
  const [seat, setSeat] = useState('')
  const navigate = useNavigate()

  const popularItems = foodItems.slice(0, 3)

  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem(
      'railmeal-trip',
      JSON.stringify({ train: train || trains[0], station, seat }),
    )
    navigate('/menu')
  }

  return (
    <main>
      <section className="hero-section">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="eyebrow"> Food Ordering</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
              Hot meals delivered to your seat before the next station.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
              Select a train, choose a station, browse food, and place a mock
              order using React state and localStorage.
            </p>
            <div className="train-track mt-10" aria-hidden="true">
              <div className="train">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <form className="booking-panel" onSubmit={handleSubmit}>
            <label>
              <span>Train</span>
              <input
                list="train-list"
                placeholder="Search train number or name"
                value={train}
                onChange={(event) => setTrain(event.target.value)}
              />
              <datalist id="train-list">
                {trains.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </label>
            <label>
              <span>Delivery station</span>
              <select value={station} onChange={(event) => setStation(event.target.value)}>
                {stations.map((item) => (
                  <option key={item} value={item}>
                    {item} Station
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Seat number</span>
              <input
                placeholder="B2 - 34"
                value={seat}
                onChange={(event) => setSeat(event.target.value)}
              />
            </label>
            <button className="primary-button" type="submit">
              Browse Menu
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="section-heading">
          <p className="eyebrow">Popular categories</p>
          <h2>Fresh choices for the journey</h2>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularItems.map((item) => (
            <FoodCard key={item.id} food={item} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </main>
  )
}

function MenuPage({ addToCart }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(timer)
  }, [])

  const visibleItems = useMemo(() => {
    return foodItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || item.category === category
      return matchesSearch && matchesCategory
    })
  }, [category, search])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="section-heading">
        <p className="eyebrow">Food menu</p>
        <h1>Order for your train ride</h1>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <input
          className="search-input"
          placeholder="Search food"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="category-tabs">
          {categories.map((item) => (
            <button
              className={category === item ? 'active' : ''}
              key={item}
              type="button"
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loader-wrap">
          <div className="loader"></div>
          <p>Loading kitchen menu...</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <FoodCard key={item.id} food={item} onAdd={addToCart} />
          ))}
          {visibleItems.length === 0 && (
            <p className="empty-state">No dishes match your search.</p>
          )}
        </div>
      )}
    </main>
  )
}

function FoodCard({ food, onAdd }) {
  return (
    <article className="food-card">
      <img src={food.image} alt={food.name} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              {food.category}
            </p>
            <h3>{food.name}</h3>
          </div>
          <p className="price">Rs {food.price}</p>
        </div>
        <button className="secondary-button mt-4 w-full" type="button" onClick={() => onAdd(food)}>
          Add to Cart
        </button>
      </div>
    </article>
  )
}

function CartPage({ cart, clearCart, removeItem, updateQuantity }) {
  const [trip, setTrip] = useState(() =>
    JSON.parse(localStorage.getItem('railmeal-trip') || '{"station":"Chennai","seat":""}'),
  )
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const placeOrder = () => {
    localStorage.setItem('railmeal-order', JSON.stringify({ ...trip, total }))
    clearCart()
    navigate('/success')
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="section-heading">
        <p className="eyebrow">Cart</p>
        <h1>Your selected items</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add food from the menu and it will stay saved in localStorage.</p>
          <Link className="primary-button mt-5 inline-flex" to="/menu">
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Rs {item.price} each</p>
                </div>
                <div className="quantity-control">
                  <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
                <button className="remove-button" type="button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </article>
            ))}
          </div>

          <aside className="summary-panel">
            <label>
              <span>Station</span>
              <select
                value={trip.station || 'Chennai'}
                onChange={(event) =>
                  setTrip((current) => ({ ...current, station: event.target.value }))
                }
              >
                {stations.map((item) => (
                  <option key={item} value={item}>
                    {item} Station
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Seat</span>
              <input
                placeholder="B2 - 34"
                value={trip.seat || ''}
                onChange={(event) =>
                  setTrip((current) => ({ ...current, seat: event.target.value }))
                }
              />
            </label>
            <div className="total-row">
              <span>Total</span>
              <strong>Rs {total}</strong>
            </div>
            <button className="primary-button w-full" type="button" onClick={placeOrder}>
              Place Mock Order
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}

function SuccessPage() {
  const [seconds, setSeconds] = useState(20 * 60)
  const [order] = useState(() =>
    JSON.parse(localStorage.getItem('railmeal-order') || '{"station":"Chennai"}'),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')

  return (
    <main className="success-page">
      <div className="success-panel">
        <p className="eyebrow">Order confirmed</p>
        <h1>Your food will arrive at Chennai Station in 20 minutes.</h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300">
          Current delivery point: {order.station || 'Chennai'} Station
        </p>
        <div className="timer-box">{minutes}:{secs}</div>
        <Link className="secondary-button mt-6 inline-flex" to="/menu">
          Order More Food
        </Link>
      </div>
    </main>
  )
}

function SignupPage({ setToast }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('railmeal-customer', JSON.stringify(form))
    localStorage.setItem('railmeal-user-session', JSON.stringify({ email: form.email }))
    setToast('Signup complete')
    navigate('/')
  }

  return (
    <AuthLayout
      eyebrow="Join RailMeal"
      title="Create your passenger account"
      text="Save your details locally and start a mock food order in seconds."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span>Full name</span>
          <input
            name="name"
            placeholder="Passenger name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="passenger@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Phone</span>
          <input
            name="phone"
            type="tel"
            placeholder="98765 43210"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            name="password"
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="primary-button w-full" type="submit">
          Sign Up
        </button>
        <p className="auth-switch">
          Already registered? <Link to="/">Continue to home</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

function FeedbackPage({ setToast }) {
  const [form, setForm] = useState({
    name: '',
    train: '',
    rating: '5',
    message: '',
  })

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const savedFeedback = JSON.parse(localStorage.getItem('railmeal-feedback') || '[]')
    localStorage.setItem(
      'railmeal-feedback',
      JSON.stringify([{ ...form, createdAt: new Date().toISOString() }, ...savedFeedback]),
    )
    setForm({ name: '', train: '', rating: '5', message: '' })
    setToast('Feedback submitted')
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="feedback-grid">
        <div>
          <p className="eyebrow">Customer feedback</p>
          <h1>Tell us about your RailMeal experience</h1>
          <p>
            This frontend-only form stores sample feedback in localStorage, so it
            is perfect for practicing controlled inputs and submit events.
          </p>
        </div>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Train</span>
            <input
              list="feedback-train-list"
              name="train"
              placeholder="Train number or name"
              value={form.train}
              onChange={handleChange}
              required
            />
            <datalist id="feedback-train-list">
              {trains.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </label>
          <label>
            <span>Rating</span>
            <select name="rating" value={form.rating} onChange={handleChange}>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Needs work</option>
              <option value="1">1 - Poor</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              placeholder="Share food quality, delivery timing, or service feedback"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <button className="primary-button w-full" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>
    </main>
  )
}

function AuthLayout({ children, eyebrow, text, title }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        {children}
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
