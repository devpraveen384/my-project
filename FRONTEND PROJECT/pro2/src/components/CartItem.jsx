function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <article className="cart-item">
      <div>
        <h3>{item.name}</h3>
        <p>Rs {item.price} each</p>
      </div>
      <div className="cart-controls">
        <button type="button" onClick={() => onUpdateQuantity(item.id, -1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => onUpdateQuantity(item.id, 1)}>
          +
        </button>
      </div>
      <p className="line-total">Rs {item.price * item.quantity}</p>
      <button
        type="button"
        className="remove-btn"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </article>
  )
}

export default CartItem
