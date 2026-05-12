import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

const initialForm = {
  passengerName: '',
  phone: '',
  pnr: '',
  trainNumber: '',
  coach: '',
  seat: '',
  station: '',
}

function CheckoutPage({ cart, onPlaceOrder, onCancel }) {
  const [formData, setFormData] = useState(initialForm)
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const orderId = onPlaceOrder(formData)
    alert(`Order ${orderId} placed successfully.`)
    navigate('/orders')
  }

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Nothing to checkout"
        subtitle="Your cart is empty. Add items first."
      />
    )
  }

  return (
    <section className="page">
      <div className="page-title">
        <h2>Checkout</h2>
        <p>Share your journey details for coach delivery.</p>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          required
          name="passengerName"
          value={formData.passengerName}
          onChange={handleChange}
          placeholder="Passenger name"
        />
        <input
          required
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
        />
        <input
          required
          name="pnr"
          value={formData.pnr}
          onChange={handleChange}
          placeholder="PNR number"
        />
        <input
          required
          name="trainNumber"
          value={formData.trainNumber}
          onChange={handleChange}
          placeholder="Train number"
        />
        <input
          required
          name="coach"
          value={formData.coach}
          onChange={handleChange}
          placeholder="Coach (e.g., B2)"
        />
        <input
          required
          name="seat"
          value={formData.seat}
          onChange={handleChange}
          placeholder="Seat number"
        />
        <input
          required
          name="station"
          value={formData.station}
          onChange={handleChange}
          placeholder="Delivery station"
        />

        <div className="checkout-actions">
          <strong>Payable amount: Rs {total}</strong>
          <div className="action-buttons">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Clear cart
            </button>
            <button type="submit" className="btn-primary">
              Place order
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default CheckoutPage
