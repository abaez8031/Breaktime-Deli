import "./CartSidebar.css"
import CartItem from "../CartItem/CartItem"
import { useDispatch } from "react-redux"
import { clearCart } from "../../../store/cart";

const CartSidebar = ({sandwiches, isOpen, onClose}) => {
  // clear cart button
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  // const sandwiches = [
  //   {
  //     bread: "white",
  //     cheese: ["american"],
  //     condiments: ["mayo", "mustard"],
  //     hot: true,
  //     meat: ["pastrami"],
  //     toasted: true,
  //     totalPrice: 5.5,
  //     veggies: ["lettuce", "tomato", "onion"]
  //   },
  //   {
  //     bread: "bagel",
  //     cheese: ["cheddar"],
  //     condiments: [],
  //     hot: true,
  //     meat: ["pastrami"],
  //     toasted: true,
  //     totalPrice: 5,
  //     veggies: []
  //   },
  //   {
  //     bread: "bagel",
  //     cheese: ["cheddar"],
  //     condiments: [],
  //     hot: true,
  //     meat: ["pastrami"],
  //     toasted: true,
  //     totalPrice: 5,
  //     veggies: []
  //   }
  // ]
  return (
    <div className={`cart-sidebar-container ${isOpen ? "open" : ""}`}>
      <button className="close-sidebar-btn" onClick={onClose}>x</button>
      <h2 className="cart-sidebar-header">Your Cart</h2>
      <ul className="cart-list">
        {sandwiches.map((sandwich) => (
          <CartItem sandwich={sandwich}/>
        ))}
      </ul>
      {sandwiches.length > 0 && <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>}
    </div>
  )
}

export default CartSidebar;