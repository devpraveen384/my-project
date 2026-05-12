import FoodCard from '../components/FoodCard'
import { menuItems } from '../data/menuItems'

function MenuPage({ onAddToCart }) {
  return (
    <section className="page">
      <div className="page-title">
        <h2>Station Food Menu</h2>
        <p>Order from trusted kitchens at major stations on your route.</p>
      </div>
      <div className="grid three-cols">
        {menuItems.map((item) => (
          <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}

export default MenuPage
