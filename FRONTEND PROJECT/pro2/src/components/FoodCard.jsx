function FoodCard({ item, onAddToCart }) {
  return (
    <article className="card">
      <div className="card-meta">
        <span>{item.category}</span>
        <span>{item.prepTime}</span>
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p className="card-station">Delivery at: {item.station} station</p>
      <div className="card-footer">
        <strong>Rs {item.price}</strong>
        <button type="button" onClick={() => onAddToCart(item)}>
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default FoodCard
