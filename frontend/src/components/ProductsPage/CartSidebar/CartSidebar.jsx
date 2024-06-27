import "./CartSidebar.css"
import CartItem from "../CartItem/CartItem"

const CartSidebar = ({isOpen, onClose}) => {
  const sandwiches = [
    {
      bread: "white",
      cheese: ["american"],
      condiments: ["mayo", "mustard"],
      hot: true,
      meat: ["pastrami"],
      toasted: true,
      totalPrice: 5.5,
      veggies: ["lettuce", "tomato", "onion"]
    },
    {
      bread: "bagel",
      cheese: ["cheddar"],
      condiments: [],
      hot: true,
      meat: ["pastrami"],
      toasted: true,
      totalPrice: 5,
      veggies: []
    },
    {
      bread: "bagel",
      cheese: ["cheddar"],
      condiments: [],
      hot: true,
      meat: ["pastrami"],
      toasted: true,
      totalPrice: 5,
      veggies: []
    }
  ]
  return (
    <div className="cart-sidebar-container">
      <button className="close-sidebar-btn" onClick={onClose}>x</button>
      <h2 className="cart-sidebar-header">Your Cart</h2>
      <ul className="cart-list">
        {sandwiches.map((sandwich) => (
          <CartItem sandwich={sandwich}/>
        ))}
      </ul>
    </div>
  )
}

export default CartSidebar;