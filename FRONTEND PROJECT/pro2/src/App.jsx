import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [cart, setCart] = useLocalStorage('railFoodCart', [])
  const [orders, setOrders] = useLocalStorage('railFoodOrders', [])

  const addToCart = (item) => {
    setCart((currentCart) => {
      const exists = currentCart.find((cartItem) => cartItem.id === item.id)
      if (exists) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...currentCart, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  const placeOrder = (customerDetails) => {
    const createdAt = new Date().toISOString()
    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    const order = {
      id: `RF-${Date.now()}`,
      createdAt,
      customerDetails,
      items: cart,
      totalAmount,
      status: 'Preparing',
    }

    setOrders((currentOrders) => [order, ...currentOrders])
    clearCart()
    return order.id
  }

  return (
    <div className="app">
      <Header cartCount={cart.reduce((count, item) => count + item.quantity, 0)} />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage onAddToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage cart={cart} onPlaceOrder={placeOrder} onCancel={clearCart} />
            }
          />
          <Route path="/orders" element={<OrdersPage orders={orders} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
