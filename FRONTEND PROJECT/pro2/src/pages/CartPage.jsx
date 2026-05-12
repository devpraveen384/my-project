import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import EmptyState from '../components/EmptyState'

function CartPage({ cart, onUpdateQuantity, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        subtitle="Add your favorite dishes from the menu to continue."
      />
    )
  }

  return (
    <section className="page">
      <div className="page-title">
        <h2>Your Cart</h2>
        <p>Review quantities before placing your train order.</p>
      </div>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: Rs {total}</h3>
        <Link to="/checkout" className="btn-primary">
          Continue to checkout
        </Link>
      </div>
    </section>
  )
}

export default CartPage
