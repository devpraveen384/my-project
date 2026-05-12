import EmptyState from '../components/EmptyState'

function OrdersPage({ orders }) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No previous orders"
        subtitle="Your placed orders will appear here."
      />
    )
  }

  return (
    <section className="page">
      <div className="page-title">
        <h2>Order History</h2>
        <p>Stored in browser localStorage for quick reference.</p>
      </div>

      <div className="order-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <div className="order-header">
              <h3>{order.id}</h3>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <p>
              Passenger: {order.customerDetails.passengerName} | Coach{' '}
              {order.customerDetails.coach} Seat {order.customerDetails.seat}
            </p>
            <p>Station: {order.customerDetails.station}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
            <div className="order-footer">
              <strong>Total Rs {order.totalAmount}</strong>
              <span className="status">{order.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default OrdersPage
